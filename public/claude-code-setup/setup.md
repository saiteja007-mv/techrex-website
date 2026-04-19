# TechRex Claude Code Setup Bundle

> Drop-in config bundle for Claude Code. Hand the prompt below to any
> AI coding agent (Claude Code, Cursor, Codex) together with the public
> repo URL, and it will install the full TechRex setup onto your machine.
>
> - Repo:    https://github.com/saiteja007-mv/techrex-claude-setup
> - Targets: `~/.claude/` (Linux/macOS) or `%USERPROFILE%\.claude` (Windows)
> - Channel: https://www.youtube.com/@The_TechRex

---

## What gets installed

| Category        | Count | What it is                                                 |
|-----------------|-------|------------------------------------------------------------|
| Global CLAUDE.md| 1     | Caveman Mode + RTK (Rust Token Killer) + graphify reference|
| Rules           | 2     | `ccg-fast-context.md`, `ccg-skills.md`                     |
| Plugins         | 10    | Marketplace plugins installed via `/plugin install`        |
| Custom skills   | 18    | autoresearch, graphify, ccg, data-analyst, seedance, ...   |
| Sub-agents      | 10    | blog writer, QA, fullstack, planner, ui-ux-designer, ...   |
| Slash commands  | 57    | `ccg/*` (28) + `gsd/*` (26) + `vibe-*` (3)                 |
| Hook            | 1     | PreToolUse Glob\|Grep -> graphify reminder                 |
| MCP stubs       | 2     | `search-console` + `n8n-mcp` templates (no secrets)        |
| Statusline      | opt-in| ccstatusline launcher                                      |

Everything is scrubbed — no API keys, no JWTs, no OAuth tokens, no ngrok
URLs, no email addresses. You configure your own after install.

---

## Part 1 — the agent prompt

Copy the whole block and paste into your AI agent. The site also hosts
the plain-text version at
[`/claude-code-setup/agent-prompt.txt`](/claude-code-setup/agent-prompt.txt)
if you want to curl it.

```
You are installing the TechRex Claude Code Setup Bundle onto this machine.

Repo: https://github.com/saiteja007-mv/techrex-claude-setup
Target: the current user's ~/.claude/ directory.

Rules of engagement:
  - NEVER overwrite existing files I didn't tell you to overwrite.
  - NEVER clobber existing settings.json / config.json — merge only.
  - ALWAYS back up the existing ~/.claude before touching it.
  - After each step, print ONE line: "v step N — <summary>".
  - At the end, print a table: v / ! / x per section.

Run these steps in order:

1. DETECT ENVIRONMENT — OS, $HOME, confirm `claude` CLI on PATH.
2. BACKUP — copy ~/.claude to ~/.claude.bak-<timestamp>/.
3. CLONE — git clone https://github.com/saiteja007-mv/techrex-claude-setup
   into a temp dir (git pull if already present).
4. MERGE CLAUDE.md — if mine doesn't exist, copy verbatim; else append
   the repo's content between markers:
        # === BEGIN TechRex Bundle ===
        ...
        # === END TechRex Bundle ===
5. COPY RULES — copy .claude/rules/*.md if not present (non-destructive).
6. COPY SKILLS — copy each dir in .claude/skills/ if not present.
7. COPY AGENTS — copy each .md in .claude/agents/ (inc. ccg/) if absent.
8. COPY COMMANDS — copy every .md in .claude/commands/ if absent.
9. STATUSLINE — ask "Install TechRex statusline? [y/N]"; if yes, copy
   statusline.bat + statusline.js.
10. SETTINGS.JSON — load .claude/settings.json.template; deep-merge into
    user's settings.json (UNION permissions.allow + enabledPlugins +
    extraKnownMarketplaces; APPEND hooks.PreToolUse; keep existing
    statusLine / autoUpdatesChannel / skipDangerousModePermissionPrompt).
11. CONFIG.JSON — load .claude/config.json.template; merge mcpServers by
    key WITHOUT overwriting existing servers. Remind me to fill
    <YOUR_N8N_API_URL>, <YOUR_N8N_API_KEY>, <YOUR_N8N_MCP_DIST_PATH>.
12. INSTALL PLUGINS — run /plugin install for each of:
      document-skills@ando-marketplace
      frontend-design@claude-plugins-official
      n8n-mcp-skills@n8n-mcp-skills
      apify-ultimate-scraper@apify-agent-skills
      rust-analyzer-lsp@claude-plugins-official
      hugging-face-cli@huggingface-skills
      ui-ux-pro-max@ui-ux-pro-max-skill
      marketing-skills@marketingskills
      codex@openai-codex
      claude-mem@thedotmack
13. VERIFY — count skills (>=18), agents (>=10), commands (>=57); grep
    Caveman Mode / RTK / graphify in CLAUDE.md; list enabled plugins.
14. FINAL REPORT — table of v/!/x per section + reminder to fill MCP
    creds, review CLAUDE.md, reopen terminal, run /plugin.

Do not invent steps. Do not run destructive commands. Ask before
installing the statusline. If any step fails, stop and report — do not
continue blindly.
```

---

## Part 2 — Plugins installed (10)

The agent installs these via `/plugin install <slug>`. Each lives on a
public Claude Code marketplace.

| Slug | Marketplace | Purpose |
|------|-------------|---------|
| `document-skills` | `ando-marketplace` | PDF / DOCX / XLSX skills |
| `frontend-design` | `claude-plugins-official` | Design-system helpers |
| `n8n-mcp-skills` | `n8n-mcp-skills` | n8n workflow skills |
| `apify-ultimate-scraper` | `apify-agent-skills` | Web scraping |
| `rust-analyzer-lsp` | `claude-plugins-official` | Rust LSP integration |
| `hugging-face-cli` | `huggingface-skills` | HF model / dataset ops |
| `ui-ux-pro-max` | `ui-ux-pro-max-skill` | UI/UX design skills |
| `marketing-skills` | `marketingskills` | Marketing content |
| `codex` | `openai-codex` | OpenAI Codex integration |
| `claude-mem` | `thedotmack` | Persistent memory |

Two extra marketplaces are auto-registered by the settings template so
plugin installs resolve without manual marketplace adds:

- `openai-codex` -> `github:openai/codex-plugin-cc`
- `thedotmack`   -> `github:thedotmack/claude-mem`

---

## Part 3 — Custom skills (18)

Copied from the repo's `.claude/skills/` into `~/.claude/skills/`:

`autoresearch` · `caveman` · `ccg` · `data-analyst` · `data-storytelling`
· `design-system` · `exploratory-data-analysis` · `gmaps-scraper` ·
`graphify` · `kpi-dashboard-design` · `linkedin-profile-search` ·
`prompt-refine` · `seedance` · `senior-data-scientist` ·
`skill-development` · `social-media` · `sql-optimization-patterns` ·
`youtube-content-generator`

---

## Part 4 — Sub-agents (10)

Copied to `~/.claude/agents/`:

Root: `blog-writer-expert` · `comprehensive-qa-tester` · `fullstack-expert`
· `system-troubleshooter` · `ui-ux-design-expert` · `youtube-content-strategist`

CCG workflow (`agents/ccg/`): `get-current-datetime` · `init-architect`
· `planner` · `ui-ux-designer`

---

## Part 5 — Slash commands (57)

Copied to `~/.claude/commands/`:

- **`ccg/*` (28)** — plan, execute, verify, commit, review, debug, test,
  spec-plan, spec-impl, team-plan, team-exec, worktree, workflow, ...
- **`gsd/*` (26)** — new-project, create-roadmap, execute-phase,
  progress, status, check-todos, plan-fix, verify-work, ...
- **`vibe-*` (3)** — vibe-build, vibe-coding, vibe-research.

---

## Part 6 — PreToolUse hook

Auto-injected into `settings.json` under `hooks.PreToolUse`. Reminds
Claude to read the graphify knowledge graph (if one exists) before
doing raw Glob / Grep searches:

```json
{
  "matcher": "Glob|Grep",
  "hooks": [{
    "type": "command",
    "command": "[ -f graphify-out/graph.json ] && echo '{\"hookSpecificOutput\":{\"hookEventName\":\"PreToolUse\",\"additionalContext\":\"graphify: Knowledge graph exists. Read graphify-out/GRAPH_REPORT.md for god nodes and community structure before searching raw files.\"}}' || true"
  }]
}
```

---

## Part 7 — MCP server stubs

Merged into `config.json` without overwriting your existing MCP servers.
Replace the placeholders after install:

```json
{
  "mcpServers": {
    "search-console": {
      "command": "npx",
      "args": ["-y", "search-console-mcp"]
    },
    "n8n-mcp": {
      "command": "node",
      "args": ["<YOUR_N8N_MCP_DIST_PATH>"],
      "env": {
        "MCP_MODE": "stdio",
        "LOG_LEVEL": "error",
        "DISABLE_CONSOLE_OUTPUT": "true",
        "N8N_API_URL": "<YOUR_N8N_API_URL>",
        "N8N_API_KEY": "<YOUR_N8N_API_KEY>"
      }
    }
  }
}
```

- **search-console** prompts for Google OAuth on first use. No code
  changes required.
- **n8n-mcp** needs a running n8n instance (local, docker, or exposed
  via ngrok). Clone https://github.com/czlonkowski/n8n-mcp, build it,
  then point `args[0]` at the built entry file.

---

## Part 8 — Verification checklist

After the agent finishes, open a fresh terminal and run:

```bash
# Linux / macOS / Git Bash
ls ~/.claude/skills                | wc -l    # >= 18
find ~/.claude/agents   -name '*.md' | wc -l  # >= 10
find ~/.claude/commands -name '*.md' | wc -l  # >= 57
grep -c "Caveman Mode" ~/.claude/CLAUDE.md    # >= 1
grep -c "RTK"          ~/.claude/CLAUDE.md    # >= 1
grep -c "graphify"     ~/.claude/CLAUDE.md    # >= 1
```

Then start `claude` and run `/plugin` — you should see 10 enabled
plugins.

---

## Part 9 — Removing the bundle

- **Skills / agents / commands** — delete the copied files/dirs.
- **CLAUDE.md** — delete everything between `=== BEGIN/END TechRex Bundle ===`.
- **Plugins** — `/plugin uninstall <slug>` for each.
- **MCP servers** — drop the `search-console` and `n8n-mcp` entries
  from `config.json`.

---

Curated by [TechRex](https://www.youtube.com/@The_TechRex) — AI coding
agent tutorials for developers. Source: MIT-licensed on
[GitHub](https://github.com/saiteja007-mv/techrex-claude-setup).
