#!/usr/bin/env node
// Fetches Hugging Face metadata for each seed repo, parses GGUF quant files,
// computes hardware-fit estimates with REAL KV-cache math (not a flat pad),
// also indexes MLX-community variants for macOS, and writes
// src/data/local-models.generated.json.
//
// Run: pnpm fetch:models
// Network failure is non-fatal — keeps the previous generated file so builds
// still ship. CI can re-run on a cron.

import { readFile, writeFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SEED = join(ROOT, "src/data/local-models-seed.json");
const OUT = join(ROOT, "src/data/local-models.generated.json");

const HF = "https://huggingface.co";
const QUANT_RE = /-((?:UD-)?(?:I?Q\d[A-Z0-9_]*|MXFP4_MOE))\.gguf$/i;

// Bytes per element for each KV-cache type.
// llama.cpp's -ctk/-ctv accepts: f32, f16, bf16, q8_0, q4_0, q5_0, etc.
const CACHE_BYTES = { f32: 4, f16: 2, bf16: 2, q8_0: 1, q5_0: 0.625, q4_0: 0.5 };

const SCRATCH_GB = 0.5;
const MLX_SCRATCH_GB = 1.0; // MLX is heavier on shared RAM

async function getJson(url) {
  const r = await fetch(url, { headers: { "User-Agent": "techrex-website-fetch/1.1" } });
  if (!r.ok) throw new Error(`${url} -> HTTP ${r.status}`);
  return r.json();
}

function parseQuant(filename) {
  const m = filename.match(QUANT_RE);
  return m ? m[1] : null;
}

function gb(bytes) {
  return Math.round((bytes / 1e9) * 100) / 100;
}

// Real KV-cache math: 2 (K+V) × layers × kv_heads × head_dim × ctx × bytes_per_element.
function kvCacheGB(arch, cacheType, ctx) {
  const bytes = CACHE_BYTES[cacheType] ?? CACHE_BYTES.f16;
  const totalBytes = 2 * arch.numLayers * arch.kvHeads * arch.headDim * ctx * bytes;
  return totalBytes / 1e9;
}

function fitEstimateGguf(sizeGB, arch, flags, hasVision, mmprojGB) {
  const kv = kvCacheGB(arch, flags.ctk, flags.ctx);
  const visionGB = hasVision ? mmprojGB : 0;
  const total = sizeGB + kv + visionGB + SCRATCH_GB;
  const minVramGB = Math.ceil(total * 10) / 10;
  // Partial-offload assumes weights spill to RAM but KV stays on GPU.
  const partialOffloadRamGB = Math.ceil(sizeGB * 1.2);
  const macUnifiedMinGB = Math.ceil((total / 0.7) * 10) / 10;
  return {
    kvGB: Math.round(kv * 100) / 100,
    visionGB: Math.round(visionGB * 100) / 100,
    scratchGB: SCRATCH_GB,
    totalFitGB: Math.round(total * 100) / 100,
    minVramGB,
    partialOffloadRamGB,
    macUnifiedMinGB
  };
}

function fitEstimateMlx(sizeGB, arch, ctx) {
  // MLX uses fp16 KV by default and shares unified memory.
  const kv = kvCacheGB(arch, "f16", ctx);
  const total = sizeGB + kv + MLX_SCRATCH_GB;
  const minUnifiedGB = Math.ceil((total / 0.7) * 10) / 10;
  return {
    kvGB: Math.round(kv * 100) / 100,
    scratchGB: MLX_SCRATCH_GB,
    totalFitGB: Math.round(total * 100) / 100,
    minUnifiedGB
  };
}

async function fetchGgufRepo(seed) {
  const meta = await getJson(`${HF}/api/models/${seed.ggufRepo}`);
  const tree = await getJson(`${HF}/api/models/${seed.ggufRepo}/tree/main?recursive=true`);

  const quantFiles = tree
    .filter((e) => e.type === "file" && e.path.endsWith(".gguf"))
    .filter((e) => !e.path.startsWith("BF16/"))
    .filter((e) => !e.path.startsWith("mmproj"));

  const quants = [];
  for (const file of quantFiles) {
    const quant = parseQuant(file.path);
    if (!quant) continue;
    const sizeGB = gb(file.size);
    const fit = fitEstimateGguf(
      sizeGB,
      seed.arch,
      seed.defaultLaunchFlags,
      seed.arch.hasVision,
      seed.mmprojBytesEstimateGB || 0
    );
    quants.push({
      name: quant,
      file: file.path,
      sizeGB,
      ...fit,
      preferred: seed.preferredQuants?.includes(quant) ?? false,
      recommended: quant === seed.recommendedQuant,
      downloadUrl: `${HF}/${seed.ggufRepo}/resolve/main/${file.path}`
    });
  }

  quants.sort((a, b) => a.sizeGB - b.sizeGB);

  const mmprojUrl = seed.mmprojFile
    ? `${HF}/${seed.ggufRepo}/resolve/main/${seed.mmprojFile}`
    : null;

  return {
    repoUrl: `${HF}/${seed.ggufRepo}`,
    repoLastModified: meta.lastModified,
    repoDownloads: meta.downloads,
    license: meta.cardData?.license || seed.license,
    mmprojUrl,
    quants
  };
}

async function fetchMlxRepo(repo) {
  const meta = await getJson(`${HF}/api/models/${repo}`);
  const tree = await getJson(`${HF}/api/models/${repo}/tree/main?recursive=true`);
  const safetensors = tree.filter((e) => e.type === "file" && e.path.endsWith(".safetensors"));
  const totalBytes = safetensors.reduce((s, f) => s + (f.size || 0), 0);
  const sizeGB = gb(totalBytes);
  return {
    repo,
    repoUrl: `${HF}/${repo}`,
    repoLastModified: meta.lastModified,
    repoDownloads: meta.downloads,
    sizeGB
  };
}

async function fetchMlxQuants(seed) {
  if (!seed.mlx?.repos) return [];
  const out = [];
  const ctx = seed.mlx.defaultLaunchFlags?.ctx ?? seed.defaultLaunchContext;
  for (const [quantName, repo] of Object.entries(seed.mlx.repos)) {
    try {
      const info = await fetchMlxRepo(repo);
      const fit = fitEstimateMlx(info.sizeGB, seed.arch, ctx);
      const recommendedFor = Object.entries(seed.mlx.recommendedQuants || {})
        .filter(([, q]) => q === quantName)
        .map(([tier]) => tier);
      out.push({
        quant: quantName,
        ...info,
        ...fit,
        recommendedFor
      });
    } catch (err) {
      console.error(`   MLX ${repo}: ${err.message}`);
    }
  }
  out.sort((a, b) => a.sizeGB - b.sizeGB);
  return out;
}

async function loadPrevious() {
  try {
    await access(OUT);
    return JSON.parse(await readFile(OUT, "utf8"));
  } catch {
    return null;
  }
}

async function main() {
  const seedDoc = JSON.parse(await readFile(SEED, "utf8"));
  const seedModels = seedDoc.models || [];
  const enriched = [];
  const errors = [];

  for (const seed of seedModels) {
    try {
      console.log(`-> ${seed.ggufRepo}`);
      const ggufData = await fetchGgufRepo(seed);
      console.log(
        `   ${ggufData.quants.length} GGUF quants, ${ggufData.quants[0]?.sizeGB} GB - ${ggufData.quants.at(-1)?.sizeGB} GB`
      );
      console.log(`   indexing MLX variants...`);
      const mlxQuants = await fetchMlxQuants(seed);
      console.log(`   ${mlxQuants.length} MLX quants`);

      enriched.push({
        ...seed,
        ...ggufData,
        mlxQuants
      });
    } catch (err) {
      errors.push({ id: seed.id, repo: seed.ggufRepo, error: err.message });
      console.error(`   FAILED: ${err.message}`);
    }
  }

  if (errors.length === seedModels.length) {
    const prev = await loadPrevious();
    if (prev) {
      console.error("\nAll fetches failed. Keeping previous generated file unchanged.");
      process.exit(0);
    }
    console.error("\nAll fetches failed and no previous file exists.");
    process.exit(1);
  }

  const output = {
    schemaVersion: 2,
    generatedAt: new Date().toISOString(),
    source: "huggingface",
    errors,
    models: enriched
  };

  await writeFile(OUT, JSON.stringify(output, null, 2) + "\n");
  console.log(`\nWrote ${OUT}`);
  console.log(`${enriched.length}/${seedModels.length} models indexed`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
