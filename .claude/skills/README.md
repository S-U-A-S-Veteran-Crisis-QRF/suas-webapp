# Claude Code skills

This directory contains Claude Code skills available in Claude Code sessions on
this project — some written here, some vendored from upstream.

## setup-agent-toolkit (local)

`setup-agent-toolkit/` — a repo-local skill that bootstraps a repository's Claude
Code tooling in one pass: vendors the launch-your-agent skill, installs a curated
set of Opus-tier subagents from GitHub, and adds a SessionStart hook so it all
loads on every device. It encodes exactly how this repo was set up so another
repo can be configured the same way. Invoke with `/setup-agent-toolkit`. It opens
a draft PR but always asks before merging or deploying.

## sync (local)

`sync/` — cross-device session sync. Uses the `claude-sync` orphan branch of
the **private `suas-claude-program` repo** as a message bus between every
Claude session on every device: `/sync` catches up (latest `HANDOFF.md` +
journal), `/sync handoff` publishes this session's state, `/sync note` leaves
a quick message. Receiving is automatic — the SessionStart hook fetches the
branch and injects the latest handoff into every session's starting context.
The git mechanics live in `sync/scripts/sync.sh` (derives the private remote
from origin's URL, bootstraps the branch, throwaway worktree, push retry with
rebase). Session state never goes in this public repo; even privately, entries
are summaries with no PII/credentials/transcripts. See
`docs/cross-device-sync.md`.

## launch-your-agent / wrap-up (vendored)

Vendored from [`anthropics/launch-your-agent`](https://github.com/anthropics/launch-your-agent)
(`main`), an Anthropic reference implementation.

- **`launch-your-agent/`** — guides a technical founder from concept to a
  deployed Claude Managed Agent (CMA): interview → stage & launch → grade &
  iterate → optional scheduled deployment. Invoke with `/launch-your-agent`.
- **`wrap-up/`** — companion skill for status checks and close-out.

Running the skill requires an Anthropic API key in your own account (the skill
stores it locally and never commits it). See the comments at the top of each
`SKILL.md` for details.

Licensed under Apache-2.0 (see [`LICENSE`](./LICENSE)); the original headers and
copyright notices are retained in each file. This is a vendored copy of an
upstream reference implementation that is not actively maintained.

## frontend-design / webapp-testing / skill-creator (vendored)

Vendored from [`anthropics/skills`](https://github.com/anthropics/skills) (`main`),
Anthropic's official skills collection.

- **`frontend-design/`** — produces distinctive, production-grade frontend
  interfaces instead of generic AI-styled pages. Loads automatically during
  design-heavy site work.
- **`webapp-testing/`** — drives the running site with Playwright to verify
  changes end-to-end (screenshots, click-throughs, form flows).
- **`skill-creator/`** — scaffolds new custom skills for this repo the right
  way. Invoke when you want to teach Claude a new repeatable workflow.

Each skill is Apache-2.0 and retains its upstream `LICENSE.txt` in its folder.
Note: the `docx`/`pdf`/`pptx`/`xlsx` document skills from the same upstream repo
were deliberately **not** vendored — they are proprietary/source-available and
their license forbids redistribution (this repo is public).
