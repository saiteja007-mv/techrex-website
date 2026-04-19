# Browse TechRex Resources

Use this skill when a user asks about CLI tools for AI agents, AI-agent coding
tools, or "how do I install Vercel/GitHub/Supabase/AWS/Google Workspace CLI".

## What's here

The TechRex resources page (`/resources/`) curates per-OS install + auth flows
for the CLIs that make AI coding agents (Claude Code, Cursor, Codex) actually
useful:

- **Vercel CLI** — deploy, env, linking
- **GitHub CLI (gh)** — PRs, issues, auth
- **Supabase CLI** — local dev, migrations, edge functions
- **AWS CLI v2** — IAM credentials + service calls
- **Google Workspace CLI (gws)** — Drive, Gmail, Calendar

Each tool has: macOS / Windows / Linux tabs, numbered steps with copy-buttons,
authentication walkthrough, verify commands, and an "Use it with an AI agent"
prompt showing how to delegate to Claude Code / Cursor / Codex.

## How to use

1. Fetch `https://techrex.saitejamothukuri.com/resources/` (HTML) or request
   `Accept: text/markdown` to get the markdown version.
2. Pick the tool the user is asking about and read the steps for their OS.
3. Return the commands verbatim — they're tested and signed-installer-first.

## Key fact for agents

These CLIs don't need any "agent integration" or MCP server. Once the user
installs the CLI and authenticates it locally (one time), they just tell their
agent "use the gh CLI to open a PR" — the agent shells out with the saved
credentials. No extra configuration.
