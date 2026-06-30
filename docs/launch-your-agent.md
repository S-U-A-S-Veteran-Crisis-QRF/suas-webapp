# Launch Your Agent — skill setup & startup loading

This repo vendors the **launch-your-agent** Claude Code skill (and its **wrap-up**
companion) and loads it automatically at the start of every Claude Code session,
on any device that signs into this account and works on this repo.

---

## What was done

### 1. Vendored the skill

Cloned from [`anthropics/launch-your-agent`](https://github.com/anthropics/launch-your-agent)
(`main`, an Anthropic reference implementation, Apache-2.0) into:

```
.claude/skills/
├── README.md                          # provenance note
├── LICENSE                            # upstream Apache-2.0, retained
├── launch-your-agent/
│   ├── SKILL.md
│   └── references/                    # interview, cma-api, examples-bank,
│                                      # mock-connectors, overview-template, build-sheet
└── wrap-up/
    └── SKILL.md
```

Only the self-contained skill tree was vendored. The upstream repo's own root
files (its README, `CLAUDE.md`, and the `ui/` + `cma-primitives.md` dev docs)
were left out so they don't collide with this Next.js project — the skill loads
its own `references/` at runtime and doesn't need them.

### 2. Made it load at startup

A **SessionStart hook** (`.claude/hooks/session-start.sh`, registered in
`.claude/settings.json`) runs at the start of every session and:

- installs project dependencies (`npm install`, web sessions only — idempotent), and
- injects context announcing the `launch-your-agent` skill so the agent is aware
  of it from the first message.

### 3. Pull request

Opened as draft: **https://github.com/S-U-A-S-Veteran-Crisis-QRF/suas-webapp/pull/1**

---

## How "load up at startup across all devices" actually works

There is **no per-account device sync** for Claude Code settings — your phone,
PC, and laptop don't share a hidden settings store, even on the same account and
different IPs. The thing that makes behavior consistent everywhere is **the repo
itself**:

- **Claude Code on the web** (phone / browser / app): every session clones this
  repo fresh, so a committed `.claude/settings.json` + hook runs at startup on
  **every device and every IP**, automatically. No per-device setup.
- **Local Claude Code CLI** (PC / laptop installs): when you open Claude Code
  inside a clone of this repo, it reads the same repo-level `.claude/settings.json`
  and runs the hook. (Local hooks may prompt for approval the first time, by design.)

> ⚠️ **The cross-device behavior only takes effect once `.claude/settings.json`
> and the hook are merged into the repo's default branch (`main`).** Until then,
> only sessions started from this feature branch pick it up.

If you want startup behavior that is **not** tied to this repo (i.e. on every
project on a given machine), that lives in each machine's user-level
`~/.claude/settings.json` and must be set up once per machine — it does not sync
across devices.

---

## Using the skill

In any Claude Code session on this repo:

```
/launch-your-agent
```

It guides a technical founder from concept to a deployed **Claude Managed Agent
(CMA)**:

1. **Interview** — what you want to build
2. **Stage & Launch** — scope a v0 and deploy it to your own account
3. **Grade & Iterate** — evaluate against your definition of done, refine
4. **Run Without You** — optional scheduled deployment

Companion skill `/wrap-up` regenerates the overview page, recaps the primitives
you now own, shows run status, and sweeps hygiene.

**Requirement:** an Anthropic API key from your own account. The skill stores it
locally (e.g. `./my-agent/.env`, chmod 600, git-ignored) and never commits it or
prints it to chat.

---

## PR monitoring

This repo has no PR CI — the only GitHub Actions workflow
(`pages-build-deployment`) runs on `main` for GitHub Pages, not on PR branches.
PR #1 had no failing checks and no review comments at setup time. The session is
subscribed to PR activity and will respond to review comments / CI failures as
they arrive.
