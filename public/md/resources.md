# Resources — CLI tools for AI agents

> Install + auth guides for the CLIs that make AI coding agents (Claude Code, Cursor, Codex) actually useful. Per-OS. Copy-paste commands. No "agent integration" needed — install once, then just tell your agent "use the gh CLI to open a PR".

**Canonical URL:** <https://techrex.saitejamothukuri.com/resources/>

---

## How to use these with an AI agent

There is no special agent-integration layer. Install the CLI, authenticate it on your machine once, then tell your agent what to do:

```
you → "Use the Vercel CLI to deploy this to production."
you → "Use gh CLI to open a PR from this branch."
you → "Use the AWS CLI to list my S3 buckets in us-east-1."
```

The agent runs the CLI in your shell with the credentials you already saved. No MCP, no plugins, no extra config.

---

## Covered tools

### 1. Vercel CLI (Live)

Deploy projects, manage env vars, preview deployments.

**macOS:** `brew install vercel-cli` → `vercel login` → `vercel link`
**Windows:** `winget install OpenJS.NodeJS.LTS` → open fresh PowerShell → `npm install -g vercel` → `vercel login` → `vercel link` → `vercel env pull`
**Linux:** `npm install -g vercel` (Node 16+) → `vercel login` → `vercel link`

Verify: `vercel --version`.
Docs: <https://vercel.com/docs/cli>

### 2. GitHub CLI (Live)

Create PRs, manage issues, clone repos, run workflows.

**macOS:** `brew install gh` → `gh auth login`
**Windows:** `winget install --id GitHub.cli` (or `scoop install gh` / `choco install gh`) → open fresh shell → `gh auth login` → `gh auth status`
**Linux:** add the GitHub CLI apt repo → `sudo apt install gh` → `gh auth login`

Alternative auth: `echo YOUR_PAT | gh auth login --with-token`.
Verify: `gh --version`.
Docs: <https://cli.github.com/>

### 3. Supabase CLI (Live)

Local Supabase, migrations, edge functions, project linking.

**macOS:** `brew install supabase/tap/supabase` → `supabase login` → `supabase init` → `supabase link --project-ref <ref>`
**Windows:** Set-ExecutionPolicy RemoteSigned → install Scoop → `scoop bucket add supabase https://github.com/supabase/scoop-bucket.git` → `scoop install supabase` → `supabase login` → `supabase init` → `supabase link --project-ref <ref>`. **Do not** `npm install -g supabase` — unsupported.
**Linux:** `npm install -g supabase` → `supabase login` → `supabase init`

Verify: `supabase --version`.
Docs: <https://supabase.com/docs/reference/cli/introduction>

### 4. AWS CLI v2 (Live)

Manage AWS services, configure credentials, automate cloud infra.

**macOS:** `curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg" && sudo installer -pkg AWSCLIV2.pkg -target /` → `aws configure`
**Windows:** `msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi /qn` (or `winget install --id Amazon.AWSCLI`) → open fresh PowerShell → create IAM user in AWS console → copy Access Key + Secret → `aws configure` → `aws sts get-caller-identity`
**Linux:** `curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"` → `unzip awscliv2.zip && sudo ./aws/install` → `aws configure`

Multi-account: `aws configure --profile work`, then `aws s3 ls --profile work`.
Verify: `aws --version`.
Docs: <https://aws.amazon.com/cli/>

### 5. Google Workspace CLI (Live)

Manage Drive, Gmail, Calendar, and admin resources from the terminal.

**macOS:** `brew install googleworkspace-cli` → install `gcloud` (`brew install --cask google-cloud-sdk`) → `gws auth setup`
**Windows:** `winget install OpenJS.NodeJS.LTS` → open fresh PowerShell → `npm install -g @googleworkspace/cli` → `winget install Google.CloudSDK` → `gws auth setup`
**Linux:** install Node 18+ → `npm install -g @googleworkspace/cli` → install gcloud → `gws auth setup`

`gws auth setup` creates the GCP project and OAuth client for you. Verify: `gws --version`.
Docs: <https://github.com/googleworkspace/cli>

---

## Claude Code Setup Bundle

My entire Claude Code config in one download — 10 plugins, 18 custom skills, 10 sub-agents, 57 slash commands, rules, hooks, and scrubbed MCP stubs. Hand the file + agent prompt to Claude Code / Cursor / Codex and it installs everything onto your machine.

- Download: <https://techrex.saitejamothukuri.com/claude-code-setup/setup.md>
- Agent prompt: <https://techrex.saitejamothukuri.com/claude-code-setup/agent-prompt.txt>
- Source repo: <https://github.com/saiteja007-mv/techrex-claude-setup>

No secrets shipped — API keys, OAuth tokens, JWTs, and the n8n ngrok URL are scrubbed from the repo. The installer merges non-destructively and backs up your existing `~/.claude/` first.

---

## Other resources on this site

- **[Token Usage](https://techrex.saitejamothukuri.com/token-usage/)** — real numbers from day-to-day agent work.
- **[Channel Stats API](https://techrex.saitejamothukuri.com/api/channel-stats)** — JSON endpoint for TechRex YouTube stats.

## YouTube

The CLI-for-agents series lives here: <https://www.youtube.com/@The_TechRex>
