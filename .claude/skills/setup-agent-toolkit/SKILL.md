---
name: setup-agent-toolkit
description: Set up (or refresh) a repository's Claude Code tooling in one pass — vendor the launch-your-agent skill, install a curated set of high-capability subagents from GitHub, and add a SessionStart hook so it all loads automatically on every device. Use when the user says "set up agent toolkit", "bootstrap claude tooling", "install subagents", "add agents/skills to this repo", "make this repo's agents smart", or wants a new repo configured the way suas-webapp is. Keywords: subagents, skills, SessionStart hook, bootstrap, vendor, opus, cross-device.
version: 1.0.0
---

# Setup Agent Toolkit

Configure a repository so Claude Code sessions on it are maximally capable, and
so the configuration follows the user across **every device and IP** that signs
into the account. Everything is committed **into the repo** — that is the only
mechanism that makes it apply everywhere: each web session clones the repo fresh
and local CLI sessions read the repo's `.claude/` directory. There is no
per-account device sync.

The toolkit has three parts: **vendored skills**, **curated subagents**, and a
**SessionStart hook**. Install whichever the user wants; default to all three.

## Ground rules

- **Work on a branch, never commit straight to the default branch.** Create/switch
  to a feature branch first.
- **Ask before deploying.** Pushing the branch and opening a *draft* PR is fine
  without asking. **Never merge to the default branch or trigger a site/Pages
  deploy without explicit confirmation** — merging is what activates the tooling
  everywhere and (on Pages repos) ships the live site.
- **Preserve attribution.** Everything here is vendored from MIT/Apache-2.0
  sources. Keep each upstream `LICENSE` and a short `README.md` noting provenance.
- **Be idempotent.** Re-running should update files in place, not duplicate them.
- **Fetch via tarball, not git clone.** Remote git is usually scoped to the
  session's own repo, so `git clone` of a third-party repo will 403. Download the
  public tarball over HTTPS instead (forms below).

## Part 1 — Vendor the launch-your-agent skill

Adds the `/launch-your-agent` skill (founder → deployed Claude Managed Agent) and
its `/wrap-up` companion.

```bash
TMP="$(mktemp -d)"
curl -sSL "https://codeload.github.com/anthropics/launch-your-agent/tar.gz/refs/heads/main" -o "$TMP/lya.tar.gz"
tar -xzf "$TMP/lya.tar.gz" -C "$TMP"
mkdir -p .claude/skills
cp -R "$TMP/launch-your-agent-main/.claude/skills/launch-your-agent" .claude/skills/
cp -R "$TMP/launch-your-agent-main/.claude/skills/wrap-up"          .claude/skills/
cp    "$TMP/launch-your-agent-main/LICENSE" .claude/skills/LICENSE
```

Vendor only the `.claude/skills/` tree (the skill loads its own `references/` at
runtime) — leave the upstream repo's root README/CLAUDE.md and `ui/` out so they
don't collide with the host project.

## Part 2 — Install curated subagents (Opus)

Source: [`VoltAgent/awesome-claude-code-subagents`](https://github.com/VoltAgent/awesome-claude-code-subagents)
(MIT, flat `.md` files, default branch `main`). It ships ~154 agents across 10
categories. **Curate** to the project's stack rather than installing all of them.

A good default set for a JS/TS web project plus general engineering (adjust to
the actual stack):

- `01-core-development/`: frontend-developer, fullstack-developer, api-designer, ui-designer
- `02-language-specialists/`: typescript-pro, javascript-pro, react-specialist, nextjs-developer, node-specialist
- `04-quality-security/`: code-reviewer, debugger, error-detective, qa-expert, test-automator, accessibility-tester, performance-engineer, architect-reviewer, security-auditor
- `06-developer-experience/`: refactoring-specialist, git-workflow-manager, build-engineer, dx-optimizer, dependency-manager, documentation-engineer

Download, then copy the curated files into `.claude/agents/` and force each one's
`model:` to `opus` ("as smart as possible"). This Python snippet handles both
replacing an existing `model:` line and inserting one if absent:

```bash
TMP="$(mktemp -d)"
curl -sSL "https://codeload.github.com/VoltAgent/awesome-claude-code-subagents/tar.gz/refs/heads/main" -o "$TMP/volt.tar.gz"
tar -xzf "$TMP/volt.tar.gz" -C "$TMP"
cp "$TMP/awesome-claude-code-subagents-main/LICENSE" .claude/agents/LICENSE 2>/dev/null || mkdir -p .claude/agents && cp "$TMP/awesome-claude-code-subagents-main/LICENSE" .claude/agents/LICENSE
SRC="$TMP/awesome-claude-code-subagents-main/categories" DST=".claude/agents" python3 - <<'PY'
import os, re
SRC, DST = os.environ["SRC"], os.environ["DST"]
os.makedirs(DST, exist_ok=True)
curated = {
  "01-core-development": ["frontend-developer","fullstack-developer","api-designer","ui-designer"],
  "02-language-specialists": ["typescript-pro","javascript-pro","react-specialist","nextjs-developer","node-specialist"],
  "04-quality-security": ["code-reviewer","debugger","error-detective","qa-expert","test-automator",
                          "accessibility-tester","performance-engineer","architect-reviewer","security-auditor"],
  "06-developer-experience": ["refactoring-specialist","git-workflow-manager","build-engineer",
                              "dx-optimizer","dependency-manager","documentation-engineer"],
}
def force_opus(t):
    if not t.startswith("---"): return t
    end = t.find("\n---", 3); fm, body = t[:end], t[end:]
    if re.search(r'^model:.*$', fm, flags=re.M):
        return re.sub(r'^model:.*$', 'model: opus', fm, flags=re.M) + body
    return fm.rstrip("\n") + "\nmodel: opus" + body
for cat, names in curated.items():
    for n in names:
        p = os.path.join(SRC, cat, n + ".md")
        if os.path.exists(p):
            open(os.path.join(DST, n + ".md"), "w").write(force_opus(open(p).read()))
            print("installed", n)
PY
```

Tune the model later per agent: `opus` (most capable), `sonnet` (cheaper),
`haiku` (cheapest), or `inherit`.

## Part 3 — SessionStart hook

Make the toolkit load at the start of every session and prepare the dev env.
Create `.claude/hooks/session-start.sh` (synchronous; switch to async only if the
user wants faster startup), keeping install output on **stderr** so stdout
carries only the hook's JSON (which becomes session context):

```bash
#!/bin/bash
set -euo pipefail
# Install deps only in remote (web) sessions, where container state is cached.
if [ "${CLAUDE_CODE_REMOTE:-}" = "true" ] && [ -f "${CLAUDE_PROJECT_DIR:-.}/package.json" ]; then
  (cd "${CLAUDE_PROJECT_DIR:-.}" && npm install) 1>&2 || echo "session-start: npm install failed (continuing)" 1>&2
fi
cat <<'JSON'
{"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":"This repo has vendored skills in .claude/skills/ and curated subagents in .claude/agents/. Use /launch-your-agent to build a managed agent; delegate to the specialized subagents for frontend, review, debugging, a11y, security, etc."}}
JSON
```

`chmod +x` it, then register in `.claude/settings.json` (merge if it exists):

```json
{ "hooks": { "SessionStart": [ { "hooks": [ { "type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/session-start.sh" } ] } ] } }
```

Validate before committing:
- `CLAUDE_CODE_REMOTE=true CLAUDE_PROJECT_DIR="$PWD" ./.claude/hooks/session-start.sh` exits 0 and prints valid JSON on stdout.
- `node -e "JSON.parse(require('fs').readFileSync('.claude/settings.json','utf8'))"` passes.
- `bash -n .claude/hooks/session-start.sh` passes.

## Wrap-up

1. Write/update a short `docs/`-level markdown note describing what was installed
   and the cross-device mechanism (web sessions clone the repo; merge to the
   default branch to activate everywhere).
2. Add `.claude/agents/README.md` and `.claude/skills/README.md` provenance notes.
3. Commit with a clear message and push the feature branch; open a **draft** PR if
   none is open.
4. **Stop and ask** before merging to the default branch or deploying. Tell the
   user the merge is what activates the toolkit on all devices (and, on Pages
   repos, ships the live site), and let them decide.
