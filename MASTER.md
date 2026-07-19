# MASTER — SUAS Veteran Crisis Q.R.F. status dashboard

The single always-current picture of everything: the site, every pull request,
the work history, Claude's capability stack, and a privacy-safe snapshot of
connected apps. Refreshed by a daily Claude check-up routine.

> **Privacy rule for this file:** this repo is public. Connected-app sections
> carry only aggregate counts and coarse status — never message contents,
> contact names, email addresses, or financial figures.

---

## Mission & live site

SUAS Veteran Crisis Q.R.F. is a veteran crisis quick-reaction-force nonprofit.
This repo is its public website (Next.js 15, static export) plus an interactive
crisis-services app demo.

- **Live:** <https://s-u-a-s-veteran-crisis-qrf.github.io/suas-webapp/> (GitHub Pages; `suasqrf.org` custom domain planned)
- **Crisis line guardrail:** the 988 (press 1) / text 838255 banner stays prominent on every page — always.

## Pull requests

| PR | State | Branch | What it delivers | Blocking merge |
|----|-------|--------|------------------|----------------|
| [#4](https://github.com/S-U-A-S-Veteran-Crisis-QRF/suas-webapp/pull/4) | Draft | `claude/consolidate-device-chats-files-fz0zd1` | Device handoff doc + this MASTER.md + CLAUDE.md + 3 new vendored skills | Mark ready & merge — docs/tooling only |
| [#3](https://github.com/S-U-A-S-Veteran-Crisis-QRF/suas-webapp/pull/3) | Draft | `worktree-website-fixes` | Fixes dead /app demo cards; corrects stale `.env.example` doc | Mark ready & merge — small, verified build |
| [#2](https://github.com/S-U-A-S-Veteran-Crisis-QRF/suas-webapp/pull/2) | Draft | `claude/launch-agent-skill-github-xcoiez` | `my-agent/` build kit for the **suas-grant-finder** managed agent (design/config only) | Decide: merge kit, then launch with API key |
| [#1](https://github.com/S-U-A-S-Veteran-Crisis-QRF/suas-webapp/pull/1) | ✅ Merged 2026-06-30 | — | Claude agent toolkit (skills, 24 Opus subagents, SessionStart hook) | — |

## Issues

None open. (CI: none configured — verification is `npm run build` locally/per-session.)

## Work log

Full dated history lives in [`docs/claude-device-handoff.md`](docs/claude-device-handoff.md#2-work-log--everything-claude-has-built-in-this-repo-reconstructed-from-git--prs). Summary:

- **2026-06-28** — Site rebuilt in Next.js 15; heroes + polish; crisis-app prototype; moved to free static hosting on GitHub Pages
- **2026-06-29** — Contrast/accessibility fixes; full Food/Ride/Shelter dispatch demo with HALT framing on `/app`
- **2026-06-30** — Agent toolkit merged (PR #1); all forms wired to one Web3Forms inbox
- **2026-07-02** — Site sweep fixes (PR #3); grant-finder agent kit (PR #2)
- **2026-07-05** — Device handoff doc, this dashboard, root CLAUDE.md, 3 new official Anthropic skills, daily check-up routine (PR #4)
- **2026-07-10** — `everything-claude-code` plugin enabled for all devices via `.claude/settings.json`
- **2026-07-10** — Form validation hole fixed: native validation restored (`noValidate` removed), zod email/name backstop in `lib/submitForm.ts`, autofill-safe `botcheck` honeypot, fetch timeout — verified with Playwright across all 4 forms
- **2026-07-19** — Second brain bridged to cloud sessions: `CLAUDE.md` now documents the Obsidian vault (private Google Drive folder + private GitHub backup, built on the MacBook Pro 2026-07-18) and how cloud/phone sessions reach it via the Google Drive connector

## Claude capability stack

- **24 Opus subagents** (`.claude/agents/`) — frontend, React/Next, TypeScript, code review, debugging, QA, accessibility, security, performance, refactoring, docs, and more.
- **Skills** (`.claude/skills/`): `/launch-your-agent`, `/wrap-up`, `/setup-agent-toolkit`, plus vendored from Anthropic's official [`anthropics/skills`](https://github.com/anthropics/skills): **frontend-design**, **webapp-testing** (Playwright), **skill-creator**.
- **Root `CLAUDE.md`** — project brain: stack, commands, design-system idiom, crisis-banner guardrail.
- **SessionStart hook** — every session on every device auto-loads all of the above; the repo is the sync channel (see [`docs/claude-device-handoff.md`](docs/claude-device-handoff.md)).
- **`everything-claude-code` plugin** ([WorldFlowAI/everything-claude-code](https://github.com/WorldFlowAI/everything-claude-code)) — auto-installed on every device via `.claude/settings.json` (`extraKnownMarketplaces` + `enabledPlugins`): 9 agents (planner, architect, tdd-guide, e2e-runner, …), 11 skills, 15 slash commands (`/tdd`, `/plan`, `/e2e`, …), and workflow hooks (auto-prettier + tsc after edits, console.log warnings, tmux nudges).
- **suas-grant-finder** managed agent — designed, not yet launched (PR #2; needs `ANTHROPIC_API_KEY` in `my-agent/.env`).
- **Second brain** — private Obsidian vault (Google Drive folder `SUAS-QRF`) with 5-minute auto-backup to a private GitHub repo; carries its own agent contract (`CLAUDE.md` at the vault root). Cloud sessions reach it via the Google Drive connector (see this repo's `CLAUDE.md`, "Second brain" section).

## Connected apps snapshot

*As of 2026-07-05, from an interactive session. Aggregate counts only.*

| App | Status | Snapshot |
|-----|--------|----------|
| Gmail | ✅ Connected | ~201 threads in last 7 days, 18 unread |
| Google Calendar | ✅ Connected | 66 calendars; 3 events in the next 7 days (primary) |
| Google Drive | ✅ Connected | 50+ recently active files |
| Dropbox | ✅ Connected | Personal account; root folder empty |
| Slack | ✅ Connected | 25 public channels |
| Airtable | ✅ Connected | 0 bases accessible |
| monday.com | ✅ Connected | 1 workspace |
| HubSpot | ✅ Connected | Standard account, active |
| PayPal | ✅ Connected | 0 transactions in the last 30 days |
| Docusign | ✅ Connected | 1 account |
| Zoho Books | ✅ Connected | 0 organizations set up |
| Zoho Projects | ✅ Connected | 0 portals/projects set up |
| QuickBooks | ⚠️ Needs re-authorization | OAuth token expired |
| Zoho CRM | ⚠️ Needs broader OAuth scopes | Scope mismatch |
| Zoho Desk | ⚠️ Needs broader OAuth scopes | Scope mismatch |
| Cloudinary | ⚠️ Needs authorization | Connect via claude.ai connector settings |
| Elicit | ⚠️ Needs authorization | Connect via claude.ai connector settings |

## Next actions

- [ ] Mark PRs #3 and #4 ready for review and merge (both docs/small fixes, build-verified)
- [ ] Decide on PR #2: merge the grant-finder kit, add `ANTHROPIC_API_KEY` locally, launch the agent
- [ ] Re-authorize QuickBooks; re-consent Zoho CRM/Desk with broader scopes (claude.ai connector settings)
- [ ] Point `suasqrf.org` custom domain at GitHub Pages
- [ ] Pull this branch (or `main` after merge) on the MacBook Pro and Beelink PC to sync the toolkit

---

*Last checked: 2026-07-05 by Claude (interactive session). A daily Claude
routine refreshes this file; connected-app rows update only when those
connectors are reachable from the run.*
