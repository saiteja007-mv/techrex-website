# Plan — "Run Coding Models Locally" Section

Goal: interactive advisor on `resources.astro`. User enters RAM + VRAM (Windows/Linux) or Unified Memory (macOS). Site returns:

1. Model + quant recommendations sized to their hardware
2. Copy-pasteable server-launch commands (llama.cpp, LM Studio, Ollama, MLX)
3. API base URL + ready-made config snippets for popular local coding agents

Source of truth for the reference build = the four desktop bat files:

- `Start Qwen3.6 MoE (Fast Agentic).bat` → `start-qwen-moe.ps1`
- `Start Qwen3.6-27B.bat` → `start-qwen27.ps1`
- `OpenClaude + Qwen MoE.bat` → `start-openclaude-qwen.ps1`
- `Start Hyperspace Agent.bat` → P2P agent on same port

Common pattern extracted: llama.cpp `llama-server` from `~/.unsloth/llama.cpp/build/bin/Release/llama-server.exe`, Unsloth GGUFs from HF cache, OpenAI-compat at `http://127.0.0.1:8080/v1`, alias `qwen3.6-moe` / `qwen3.6-27b`, key `sk-local`, flags `-ngl 99 --flash-attn on --jinja --reasoning-format deepseek --host 0.0.0.0 --port 8080`. Reference rig: RTX 5070 Ti Laptop 12 GB VRAM.

---

## 1. Where it lives

New section on `src/pages/resources.astro` with `id="local-models"`, inserted between `#cli-tools` (ends ~line 1357) and the external-resources block (~line 1360).

Add a fourth pill to the hero section nav (line 449–460):

```
🦙 Run Models Locally → #local-models
```

Match existing style: `inline-flex … bg-[var(--color-card)] border-2 border-[var(--color-border)] shadow-hard-sm`.

---

## 2. Data model — `src/data/local-models.json`

```jsonc
{
  "models": [
    {
      "id": "qwen3.6-moe",
      "name": "Qwen3.6-35B-A3B (MoE)",
      "family": "Qwen3.6",
      "params": "35B (3B active)",
      "kind": "moe",
      "strengths": ["agentic-coding", "tool-use", "vision"],
      "context": 262144,
      "license": "Apache-2.0",
      "ggufRepo": "unsloth/Qwen3.6-35B-A3B-GGUF",
      "quants": [
        { "name": "UD-IQ2_M", "sizeGB": 10.9, "minVramGB": 12, "minRamGB": 16, "recommended": true },
        { "name": "Q4_K_M",   "sizeGB": 21.5, "minVramGB": 24, "minRamGB": 32 },
        { "name": "Q8_0",     "sizeGB": 38,   "minVramGB": 48, "minRamGB": 64 }
      ],
      "alias": "qwen3.6-moe"
    },
    {
      "id": "qwen3.6-27b",
      "name": "Qwen3.6-27B (Dense)",
      // …
    },
    // also: Qwen2.5-Coder-7B/14B/32B, DeepSeek-Coder-V2-Lite, GLM-4-32B, Llama-3.3-70B,
    // Codestral-22B, DeepSeek-R1-Distill-Qwen-32B
  ],

  "serverPresets": [
    {
      "id": "llama-cpp",
      "name": "llama.cpp (llama-server)",
      "platforms": ["windows", "linux", "macos"],
      "endpoint": "http://127.0.0.1:8080/v1",
      "apiKey": "sk-local",
      "templates": {
        "windows": "powershell snippet derived from start-qwen-moe.ps1",
        "linux":   "bash version using same flags",
        "macos":   "bash + Metal flags (-ngl 99 still works on Apple GPU)"
      },
      "flags": ["-ngl {ngl}", "--flash-attn on", "--jinja",
                "--reasoning-format deepseek",
                "--host 0.0.0.0 --port {port}",
                "--alias {alias}", "-c {ctx}", "--cache-type-k q4_0 --cache-type-v q4_0"]
    },
    { "id": "lm-studio", "name": "LM Studio",   "endpoint": "http://127.0.0.1:1234/v1" },
    { "id": "ollama",    "name": "Ollama",      "endpoint": "http://127.0.0.1:11434/v1" },
    { "id": "mlx",       "name": "MLX (Apple)", "platforms": ["macos"] },
    { "id": "vllm",      "name": "vLLM",        "platforms": ["linux"] }
  ],

  "agentClients": [
    {
      "name": "Cline / Roo Code (VS Code)",
      "configKind": "json",
      "snippet": "{ \"apiProvider\": \"openai\", \"openAiBaseUrl\": \"{endpoint}\", \"openAiApiKey\": \"{key}\", \"openAiModelId\": \"{alias}\" }"
    },
    { "name": "Continue.dev",        "configKind": "json", "snippet": "…" },
    { "name": "Aider",               "configKind": "env",  "snippet": "OPENAI_API_BASE={endpoint}\nOPENAI_API_KEY={key}\naider --model openai/{alias}" },
    { "name": "OpenCode",            "configKind": "yaml", "snippet": "…" },
    { "name": "Claude Code (proxy)", "configKind": "shell","snippet": "claude-code via OpenClaude or claude-code-proxy → {endpoint}" },
    { "name": "Zed",                 "configKind": "json", "snippet": "…" }
  ]
}
```

---

## 3. Sizing logic (vanilla TS in the section's `<script>`)

Inputs:

- `os`: `windows-linux` | `macos`
- `vramGB` (windows/linux only)
- `ramGB` (windows/linux only)
- `unifiedGB` (macos only)
- `useCases`: multi-select chips (`coding`, `agentic`, `long-context`, `vision`)

Memory budget rules:

```
fullGpuOffload (windows/linux) = vramGB - kvReserveGB
partialOffload (windows/linux) = vramGB + 0.6 * ramGB - kvReserveGB
unifiedBudget   (macos)        = 0.7 * unifiedGB - kvReserveGB
kvReserveGB ≈ ctx/32768 * 0.6  (halved if cache-type q4_0)
```

For each model × quant, label as:

- ✅ **Fits on GPU** if `quant.sizeGB ≤ fullGpuOffload`
- ⚠️ **Partial offload** if `quant.sizeGB ≤ partialOffload`
- ❌ **Won't fit** otherwise

Sort by: useCase match score, then biggest quant that still fits, MoE before dense at same VRAM tier.

Reference recommendations (sanity-check table):

| Hardware                     | Top pick                              | Backup                  |
|------------------------------|---------------------------------------|-------------------------|
| 8 GB VRAM                    | Qwen2.5-Coder-7B Q5_K_M               | DeepSeek-Coder-V2-Lite  |
| 12 GB VRAM (reference rig)   | Qwen3.6-35B-A3B UD-IQ2_M (10.9 GB)    | Qwen2.5-Coder-14B Q4    |
| 16 GB VRAM                   | Qwen2.5-Coder-32B IQ3_XS              | Codestral-22B Q4        |
| 24 GB VRAM                   | Qwen3.6-27B Q4_K_M                    | Qwen2.5-Coder-32B Q4    |
| Mac 16 GB unified            | Qwen2.5-Coder-7B Q5 (MLX)             | Phi-4 Q4                |
| Mac 32 GB unified            | Qwen2.5-Coder-14B Q5 (MLX)            | Codestral-22B Q4        |
| Mac 64 GB unified            | Qwen3.6-35B-A3B Q4_K_M                | Qwen2.5-Coder-32B Q5    |
| Mac 128 GB unified           | Llama-3.3-70B Q4 / GLM-4.5-Air        | Qwen2.5-72B IQ4         |

---

## 4. UI structure

```
<section id="local-models">
  Hero block:
    h2  "Run Coding Models Locally"
    sub "Tell us your hardware, we hand you the server command + agent config."

  Step 1 — Hardware (card with neobrutalist border, matches existing cards)
    [Windows/Linux] [macOS] toggle
    if windows-linux:  RAM slider (8–256 GB) + VRAM slider (4–96 GB)
    if macos:          Unified memory slider (8–192 GB)

  Step 2 — Use case chips: Coding / Agentic / Long context / Vision

  Step 3 — Recommended models (auto-updates)
    grid of cards; each card:
      model name, params, context, license badge
      best quant for this rig (sizeGB, fits/partial label)
      strengths tags

  Step 4 — Server setup (tabs)
    [llama.cpp] [LM Studio] [Ollama] [MLX]   (filtered by OS)
    code block: full ps1/bash/zsh launch command, prefilled with chosen model + quant + ctx
    "Copy" button (reuse existing copy pattern from setup bundle)

  Step 5 — API endpoint card
    URL:   http://127.0.0.1:8080/v1     [copy]
    Key:   sk-local                     [copy]
    Model: qwen3.6-moe                  [copy]

  Step 6 — Plug into your coding agent (accordion or tabs)
    Cline · Roo · Continue · Aider · OpenCode · Claude Code (proxy) · Zed
    each: short blurb + copyable JSON / env / yaml snippet, prefilled
```

All interactivity is plain `<script>` + DOM events — no framework, matches what `resources.astro` already does for the Agent Prompt modal and bundle modal.

---

## 5. Copy in the launch snippet (mirrors the actual bat/ps1)

Default pre-fill for the reference rig (12 GB VRAM, llama.cpp, qwen3.6-moe):

```powershell
& "$env:USERPROFILE\.unsloth\llama.cpp\build\bin\Release\llama-server.exe" `
  -m  "$model.gguf" `
  --mmproj "$mmproj-BF16.gguf" `
  --alias qwen3.6-moe `
  -ngl 99 --flash-attn on --jinja --reasoning-format deepseek `
  --host 0.0.0.0 --port 8080 `
  -c 65536 --cache-type-k q4_0 --cache-type-v q4_0
```

Endpoint becomes `http://127.0.0.1:8080/v1`, key `sk-local`. Identical pattern, fewer flags, for low-VRAM 7B/14B picks.

---

## 6. Implementation steps

1. Create `src/data/local-models.json` with ~8–10 models, ~5 server presets, ~6 agent clients (data-only PR, easy to extend later).
2. Add `<section id="local-models">` to `src/pages/resources.astro` after `#cli-tools`. Style with the same `bg-[var(--color-bg)]` / `border-[var(--color-border)]` / `shadow-hard-*` tokens already in use.
3. Add the fourth hero pill `Run Models Locally → #local-models`.
4. Inline `<script>` (typed via `// @ts-check`) for: input bindings, sizing math, recommendation render, snippet templating, copy-to-clipboard.
5. Reuse the existing `[data-copy]` button pattern (or whatever helper resources.astro uses for the bundle copy) instead of writing a new one.
6. Add minimal SEO: bump `<title>` / meta description on resources.astro to mention local model setup.
7. Manual QA in the dev server: at 12 GB VRAM the top recommendation MUST be Qwen3.6-35B-A3B UD-IQ2_M with the exact `start-qwen-moe.ps1` flags. That's the ground-truth check.

---

## 7. Out of scope (call out before building)

- No live VRAM detection — user input only.
- No model downloads from the page — just `huggingface-cli download …` snippets.
- No multi-GPU / tensor-parallel guidance (vLLM section can be a stub).
- No benchmarks/throughput numbers — too noisy to maintain.
- No auth / rate-limit story for exposing `0.0.0.0` on LAN — add a one-line warning instead.

---

## 8. Open questions for you

1. **Catalog scope**: stick to ~8 hand-picked models or aim for a wider catalog (20+) you'll keep updating? *(see §9 — recommended approach: curated seeds + HF API merge.)*
2. **MLX vs llama.cpp on Mac**: lead with MLX (faster on Apple silicon) or keep llama.cpp as the default cross-platform path?
3. **Claude Code over local models**: just point at OpenClaude (already in your bundle) or also document `claude-code-proxy`?
4. **Persisted state**: remember the user's RAM/VRAM in `localStorage` so they don't re-enter on revisit?

---

## 9. Pulling "best models" from Hugging Face

Why we can't just sort `https://huggingface.co/api/models?sort=downloads`: top results are stale TheBloke Llama-2 quants from 2023. HF has no "best for coding agents" tag. Editorial curation has to come from us; HF gives us **fresh quants, file sizes, last-updated, and download counts** per repo.

### Strategy — curated seeds + HF API merge at build time

Two-file split:

```
src/data/local-models-seed.json        ← hand-curated, editorial fields
src/data/local-models.generated.json   ← built from seed + HF API, .gitignored
```

**`local-models-seed.json`** — what only we know:

```jsonc
[
  {
    "id": "qwen3.6-moe",
    "ggufRepo": "unsloth/Qwen3.6-35B-A3B-GGUF",
    "family": "Qwen3.6",
    "params": "35B (3B active)",
    "kind": "moe",
    "context": 262144,
    "strengths": ["agentic-coding", "tool-use", "vision"],
    "license": "Apache-2.0",
    "alias": "qwen3.6-moe",
    "preferredQuants": ["UD-IQ2_M", "Q4_K_M", "Q8_0"]
  },
  // ~10–15 entries: Qwen3.6 MoE, Qwen3.6-27B, Qwen2.5-Coder-{7,14,32}B,
  // DeepSeek-Coder-V2-Lite, DeepSeek-R1-Distill-Qwen-32B, GLM-4.5-Air,
  // Codestral-22B, Llama-3.3-70B, Phi-4, Mistral-Small-3
]
```

**Build script `scripts/fetch-models.mjs`** — runs once at `astro build`:

```js
// for each seed, GET https://huggingface.co/api/models/{ggufRepo}
//   → grab: lastModified, downloads, gated, siblings[]  (siblings = file list)
// for each file in siblings ending in .gguf:
//   filename → parse quant name (UD-IQ2_M, Q4_K_M, Q8_0, IQ3_XS, …)
//   size     → siblings[i].size or HEAD on resolve URL
//   keep only quants in seed.preferredQuants (or all, capped at 6)
// for each kept quant, compute: minVramGB, minRamGB (sizeGB + KV pad),
//   recommended flag based on family-specific heuristic
// merge with seed → write src/data/local-models.generated.json
```

HF endpoints used (all unauth, generous limits — no token needed for ~15 reads):

| Purpose                | Endpoint |
|------------------------|----------|
| Repo metadata + files  | `GET /api/models/{repo}` |
| File size fallback     | `HEAD https://huggingface.co/{repo}/resolve/main/{file}` (Content-Length) |
| Discover new quanters  | `GET /api/models?search={family}+gguf&sort=downloads&limit=20` (used manually to update seeds) |

If HF rate-limits or the build is offline, **fail open**: fall back to checked-in `local-models.generated.json` from the previous build (don't break the deploy).

### How Astro consumes it

```astro
---
import models from '../data/local-models.generated.json';
// ships statically, zero client-side fetches
---
```

User's browser never hits HF. The advisor UI runs entirely on the JSON shipped with the build.

### Refresh cadence

Vercel cron (already on the platform per `PROJECT_PLAN.md`) triggers a weekly redeploy:

```json
// vercel.json
{
  "crons": [{ "path": "/api/refresh-models", "schedule": "0 6 * * 1" }]
}
```

`/api/refresh-models` either:
- runs the same fetch script and writes back, or
- calls Vercel's deploy hook → repo rebuilds with fresh data.

Manual refresh: `pnpm run fetch:models` locally → commit the regenerated JSON.

### Why not client-side fetch on page load?

- ❌ HF response per repo is 50–500 KB — 15 repos = up to 7 MB on every visitor's page load.
- ❌ Adds latency to a page that should render instantly.
- ❌ Couples the page to HF uptime.
- ❌ CORS works, but rate limits are per-IP, not per-site → noisy users get throttled.

Build-time fetch sidesteps all four.

### Quant filename → spec parsing

GGUF filenames already encode quant + sometimes context. Regex table:

```
/UD-?IQ(\d)_(XXS|XS|S|M|L)/i  → unsloth dynamic IQ quants
/(Q\d)_(K_S|K_M|K_L|K|0)/i     → standard llama.cpp quants
/(IQ\d)_(XXS|XS|S|M|L)/i       → i-quants
/(BF16|F16|F32)/i              → full-precision baselines (skip for quant card)
```

Map to `quants[]` in the generated JSON, sort smallest → largest. The recommendation engine in §3 stays unchanged — it only reads `sizeGB` and `name`.

### Implementation steps (additive to §6)

1. Add `scripts/fetch-models.mjs` (Node 20+, native `fetch`, no new deps).
2. Add `pnpm run fetch:models` script + run it in CI before `astro build`.
3. Add `local-models.generated.json` to `.gitignore` *only if* you want CI to be the source of truth; otherwise commit it for offline-safe builds (recommended).
4. Add `local-models-seed.json` to the data dir.
5. Wire the section UI to `local-models.generated.json` instead of the placeholder JSON in §2.
6. (Optional) Add `/api/refresh-models` + Vercel cron for hands-off weekly refresh.

### Editorial loop for adding new models

When a new strong model lands (e.g. Qwen4-Coder, DeepSeek-V4):

1. Add one entry to `local-models-seed.json` (repo + family/strengths/license).
2. Run `pnpm run fetch:models`.
3. Commit + deploy.

Adding a model = ~30 seconds. No code changes.
