# CLAUDE.md

Project guidance for Claude Code sessions in this repo.

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

## Repo conventions

- Work on `claude/*` feature branches; open draft PRs; never push to `main`.
- `MASTER.md` is the living status dashboard (auto-refreshed by a daily
  Claude routine) — update its relevant section when you ship something.
- `docs/claude-device-handoff.md` documents cross-device sync; the repo itself
  is the sync channel for all Claude config.
- Secrets: only the local `.env` (see `.env.example`); `ANTHROPIC_API_KEY`
  is required for `/launch-your-agent` and must never be committed.

## Claude toolkit in this repo

- `.claude/agents/` — 24 Opus subagents (see its README for provenance).
- `.claude/skills/` — `/launch-your-agent`, `/wrap-up`, `/setup-agent-toolkit`,
  plus vendored `frontend-design`, `webapp-testing` (Playwright verification),
  and `skill-creator`. See `.claude/skills/README.md`.
- `.claude/hooks/session-start.sh` — installs npm deps on web sessions and
  announces the toolkit.
- `my-agent/` (PR #2 branch) — the `suas-grant-finder` managed-agent build kit.
