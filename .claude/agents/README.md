# Subagents

Custom Claude Code subagents available in any session on this repo. Claude
delegates to them automatically when a task matches an agent's `description`, or
you can ask for one by name (e.g. "use the code-reviewer agent").

Like the skills in `../skills/`, these live in the repo, so every Claude Code
session — on any device or IP signed into the account — picks them up once this
is merged into the default branch.

## Source & licensing

Vendored from [`VoltAgent/awesome-claude-code-subagents`](https://github.com/VoltAgent/awesome-claude-code-subagents)
(MIT — see [`LICENSE`](./LICENSE)). A curated subset relevant to this Next.js 15
/ React 19 / TypeScript project plus general engineering was installed, not the
full ~154-agent catalog.

## "As smart as possible"

Every installed agent's frontmatter `model:` field is set to **`opus`** (the
most capable tier), overriding the upstream tiered defaults. This maximizes
capability at the cost of higher token usage per agent run. To dial an
individual agent back, change its `model:` to `sonnet`, `haiku`, or `inherit`.

## Installed agents (24)

**Core development**
- `frontend-developer` — multi-framework frontend apps (React/Vue/Angular)
- `fullstack-developer` — end-to-end feature delivery
- `api-designer` — REST/GraphQL API design
- `ui-designer` — UI/component design

**Language specialists**
- `typescript-pro` — advanced TypeScript, generics, type-level safety
- `javascript-pro` — modern JS
- `react-specialist` — React 18+ patterns
- `nextjs-developer` — Next.js App Router, server components, Core Web Vitals
- `node-specialist` — Node.js runtime

**Quality & security**
- `code-reviewer` — quality, security, best-practice review
- `debugger` — root-cause debugging
- `error-detective` — error/log analysis
- `qa-expert` — test strategy & QA
- `test-automator` — automated test authoring
- `accessibility-tester` — WCAG / a11y (important for the public-facing site)
- `performance-engineer` — performance & Core Web Vitals
- `architect-reviewer` — architecture review
- `security-auditor` — security review (relevant to the intake form / PII)

**Developer experience**
- `refactoring-specialist` — safe refactors
- `git-workflow-manager` — branching, PRs, git workflow
- `build-engineer` — build tooling/pipeline
- `dx-optimizer` — developer-experience improvements
- `dependency-manager` — dependency hygiene/updates
- `documentation-engineer` — docs generation/maintenance
