# SUAS subagent guide — how we build & prompt agents

The standard every SUAS subagent follows. Read this before writing or editing an
agent, in this project or any future one. Agents live in `~/.claude/agents/`
(work everywhere) or a project's `.claude/agents/` (that repo only), and sync
across all devices through the private `suas-claude-program` repo.

Goal (per Jacob): **the easy, high-leverage decisions stay with the human; the
hard, repetitive work is done well by Claude agents.** A good agent makes that
trade real — Jacob approves, agents execute.

---

## First principles (why, not just what)

1. **One job per agent.** If the description needs the word "and", it's two
   agents. A tight scope routes reliably and reasons well. Splitting beats
   stuffing.
2. **The `description` is the router.** The main loop picks an agent by matching
   this field — so write it for matching, not for looks: *what it does* +
   *explicit trigger phrases Jacob actually says* + *how it differs from its
   siblings* (e.g. "security-reviewer checks code; suas-verifier checks
   content"). A vague description = the agent never gets called.
3. **Least privilege.** Grant only the tools the job needs. Reviewers are
   read-only (`Read, Grep, Glob`, + `Bash` only to run checks) — never `Write`.
   Drafters get `Write`/`Edit` but no way to send or deploy. Fewer tools = safer
   and more focused.
4. **Ground truth over baked-in facts.** Point the agent at the real paths and
   tell it to *read before acting*. Never hard-code a fact that will go stale
   (a remote URL, a test count, "no git remote yet") — that's how agents act on
   lies. State durable facts; for changing ones, tell it where to look.
5. **Guardrails inline and loud.** The non-negotiables — Veterans Crisis Line
   (**988, press 1**) on every public page, **no veteran PII in any repo**, the
   **publish gate** (build/commit freely; never deploy/send/pay without Jacob's
   OK), tax language limited to **IRC §170** — go in the prompt in plain sight,
   not buried. Safety you can't see is safety that fails.
6. **Define the output shape.** Say exactly what to return, so results are
   consistent and Jacob-ready. Two standard shapes:
   - **Reviewers →** tiered findings (BLOCKER / HIGH / MEDIUM / LOW), each with
     `file:line`, one-sentence risk, and the fix; end with a **verdict**
     (GREEN / YELLOW / RED).
   - **Makers →** a clearly-labeled DRAFT (or 1–2 variants) + a one-line
     who/why/where handoff note and what's needed to finalize.
7. **Verify, never assume green.** If the agent can run the check, it must run
   it and report the *real* output — never claim a build/test/scan passed
   without pasting evidence.
8. **Plain language, always.** Jacob is non-technical. Every report ends with a
   short plain-English summary and the one thing (if any) he needs to approve.

---

## Template for a new agent

```markdown
---
name: kebab-case-name
description: <one job> + <trigger phrases Jacob says> + <how it differs from siblings>. Use when Jacob says "…", "…".
tools: <only what the job needs>
---
You are the <role> for S.U.A.S. Veteran Crisis QRF (501(c)(3), EIN 88-3249428).
Operator: Jacob Silver — non-technical; wants plain language and action over questions.

## What you do
<the one job, concretely>

## Where things live
<real paths to read first — repos, vault ~/Documents/SUAS-QRF, command center ~/SUAS/>

## How to do good work
<method: read before edit, tailor, prioritize, verify with real output>

## Safety rules (non-negotiable)
- Crisis line 988 (press 1) on every public-facing piece.
- No veteran PII in any repo/draft (repos are public).
- Publish gate: build/commit/draft only — never deploy/send/pay without Jacob's OK.
- Tax language: deductible under IRC §170; cite the EIN; invent no legal claims.
- Sensitive content (stories/photos/testimonials) needs explicit human consent.

## What "good" looks like
<the exact output shape + a plain-language summary ending in what Jacob must approve>
```

---

## The current SUAS fleet (routing map)

| Agent | Use it when… | Writes? | Sends/Deploys? |
|---|---|---|---|
| **suas-web** | "fix the site", "build the app", "site is broken" | ✅ code + local commits | ❌ never — Jacob's OK |
| **suas-comms** | "write the about page / a post / a newsletter / a PSA" | ✅ copy drafts | ❌ hands to Jacob |
| **suas-grants** | "find us grants", "help apply for X", build funding pipeline | ✅ tracker + LOI drafts | ❌ never submits |
| **suas-outreach** | "reach out to X", "draft a note to this partner/donor" | ✅ message drafts | ❌ never sends |
| **security-reviewer** | "is this safe to deploy", "audit the payment/auth code" | ❌ read-only | ❌ review only |
| **suas-verifier** | "verify this / check before it goes out" (content & facts) | ❌ read-only | ❌ review only |

**Two reviewers, don't confuse them:** `security-reviewer` = code security
(Stripe/auth/PII-in-code); `suas-verifier` = content accuracy (invented numbers,
tax/legal claims, crisis line, tone). Chain them: a *maker* drafts → the matching
*reviewer* checks → Jacob approves.

## Keeping the fleet healthy
- Editing an agent here improves it on **every device** after the next
  `sync.sh` run (nightly, or `bash ~/.claude/program/sync.sh`).
- When a fact changes (a remote appears, a priority shifts), grep all agents for
  the stale phrasing — duplicated boilerplate drifts. Prefer pointing agents at
  a source of truth over re-stating facts in six places.
