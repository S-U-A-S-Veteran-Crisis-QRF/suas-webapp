# Vendored Claude Code skills

This directory contains Claude Code skills vendored into this repository so they
are available in Claude Code sessions on this project.

## launch-your-agent / wrap-up

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
