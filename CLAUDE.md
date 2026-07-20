# CLAUDE.md

Project guidance for Claude Code sessions in this repo.

## Operating mode — the expert attitude

Every session runs in Jacob's expert posture (mirrored from the shared Claude
program, 2026-07-19): **autonomous execution** inside the boundaries below,
**immediate action** (no permission-asking on obvious next steps),
**constraint-aware** (the crisis-banner guardrail, no-PII, and the
public/outbound/paid publish gate are never crossed), **context-first** (check
the second brain and `MASTER.md` before re-deriving anything),
**output-focused** (end with a real deliverable, not analysis), and
**Jacob-aware** (queue decisions for his review in plain language instead of
blocking on questions).

## What this is

The public website + app demo for **SUAS Veteran Crisis Q.R.F.**, a veteran
crisis quick-reaction-force nonprofit. Live at
<https://s-u-a-s-veteran-crisis-qrf.github.io/suas-webapp/> (custom domain
`suasqrf.org` planned).

## Non-negotiable guardrail

The **Veterans Crisis Line banner** (988, press 1 / text 838255) must stay
prominent on every page. Never remove, shrink, or bury the crisis bar
(`components/CrisisBar.tsx`, `.crisis-bar` styles). Treat any change that
touches it as high-risk and verify it visually.

## Stack & architecture

- **Next.js 15 App Router + React 19 + TypeScript**, configured for
  **static export** (`next.config.mjs`) hosted free on GitHub Pages — there is
  **no server runtime**: no API routes, no server actions, no SSR-only features.
- Forms have no backend: every form posts to **Web3Forms** through
  `lib/submitForm.ts` (single access-key constant there; `zod` validates).
- Pages live in `app/<route>/page.tsx`; shared UI in `components/`
  (Header, Footer, CrisisBar, form components, CrisisDemoApp, Reveal).
  Nav items come from `lib/nav.ts`.
- **Design system is plain CSS** in `app/globals.css` — no Tailwind, no CSS
  modules. Use the existing custom properties (`--cream`, `--navy`, `--gold`,
  `--crisis`, etc.) and utility classes (`.container`, `.btn`, `.btn-primary`,
  `.btn-ghost`, `.hero`, `.band`, `.eyebrow`). Match this idiom; don't
  introduce new styling systems.
- Contrast rule learned the hard way: ghost buttons flip to white text only
  inside `.hero` / `.hero-image` / `.band` dark containers — check both
  contexts when styling CTAs.

## Commands

```bash
npm run dev     # local dev server
npm run build   # static export — must pass before pushing (all 15 pages)
npm run lint
```

Deploys go out via GitHub Pages from the static export; see README.md.

## Second brain (org memory)

SUAS's persistent memory is an **Obsidian vault** — the "second brain" — that
lives in the private Google Drive folder `SUAS-QRF` (on the main computers:
`~/Documents/SUAS-QRF`) and auto-backs-up to a private GitHub repo via the
Obsidian Git plugin. **Cloud/phone sessions can't clone that repo, but they can
read and write the vault through the Google Drive connector** (search Drive for
the `SUAS-QRF` folder).

Rules when touching the vault from a cloud session:

- **Read the vault's own `CLAUDE.md` (the agent contract) first** — it defines
  the read order (`🔥 Recent Context.md` → `00_START_HERE.md` → the folder's
  `_index.md`), note conventions (YAML frontmatter, wikilinks, no orphans),
  and the end-of-session memory protocol. Its rules win inside the vault.
- Respect the numbered folder structure; never restructure it. Never touch
  `06_Files/` (bulk import dump) or anything under `SECURE/`.
- No veteran PII, credentials, or invented facts — same safety rules as here.
- The vault is the place to check for already-documented fixes, org facts, and
  approved boilerplate before re-deriving them.
- Human-facing setup/recovery instructions (per device, sync architecture,
  gotchas) live in `docs/obsidian-second-brain-setup.md` — point Jacob there
  rather than re-explaining the sync.

## Repo conventions

- Work on `claude/*` feature branches; open draft PRs; never push to `main`.
- `MASTER.md` is the living status dashboard (auto-refreshed by a daily
  Claude routine) — update its relevant section when you ship something.
- Cross-device sync: repo-carried config (`.claude/` on `main`) syncs tooling;
  **live session state syncs via the `claude-sync` branch of the PRIVATE
  `suas-claude-program` repo** — never via this public repo. Every session
  auto-catches-up at start (SessionStart hook) and should publish
  `/sync handoff` before ending so other devices/sessions pick up seamlessly.
  Even on the private channel, entries are summaries: no veteran PII,
  credentials, or chat transcripts. Full map: `docs/cross-device-sync.md`
  (historical snapshot: `docs/claude-device-handoff.md`).
- **Privacy-first GitHub rule:** everything SUAS is private **except** the
  website repos that must be public to operate (this repo — GitHub Pages).
  Never put org/session/work data in a public repo; branches of a public repo
  are public too.
- **Self-learning:** `LESSONS.md` at the repo root logs every correction (from
  Jacob or self-caught). Consult it before acting; append an entry whenever
  you're corrected. Think before acting — check existing infrastructure and
  repo visibility first.
- Secrets: only the local `.env` (see `.env.example`); `ANTHROPIC_API_KEY`
  is required for `/launch-your-agent` and must never be committed.

## Claude toolkit in this repo

- `.claude/agents/` — 24 Opus subagents (see its README for provenance).
- `.claude/skills/` — `/launch-your-agent`, `/wrap-up`, `/setup-agent-toolkit`,
  plus vendored `frontend-design`, `webapp-testing` (Playwright verification),
  and `skill-creator`. See `.claude/skills/README.md`.
- `.claude/hooks/session-start.sh` — installs npm deps on web sessions and
  announces the toolkit.
- **`everything-claude-code` plugin** — auto-enabled on every device via
  `extraKnownMarketplaces` + `enabledPlugins` in `.claude/settings.json`
  (source: [WorldFlowAI/everything-claude-code](https://github.com/WorldFlowAI/everything-claude-code)).
  Adds 9 agents (planner, architect, tdd-guide, e2e-runner, …), 11 skills,
  15 slash commands (`/tdd`, `/plan`, `/e2e`, …), and workflow hooks
  (auto-prettier + tsc after edits, console.log warnings, tmux nudges for
  dev servers).
- `my-agent/` (PR #2 branch) — the `suas-grant-finder` managed-agent build kit.
