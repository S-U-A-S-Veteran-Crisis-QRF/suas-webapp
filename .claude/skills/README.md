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
