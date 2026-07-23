# SUAS grant-finder — what's next (the version plan)

v0 (today) is one expert that finds and verifies open funding and drafts the top
outreach. Everything below is a deliberate, numbered upgrade — not a pile of
"maybe later." Each says **what / why it's later / exactly how**.

## v1 — Make it run itself, monthly, reporting only NEW grants
- **What:** the sweep runs on its own each month and only surfaces opportunities it hasn't shown you before.
- **Why later:** v0 is on-demand on purpose — prove the report is good before automating it.
- **How:** create a **scheduled deployment** (`POST /v1/deployments?beta=true`, monthly cron + your timezone, the same `user.define_outcome` as `initial_events`) **+** a **memory store** ("grants-seen") attached `read_write`; the agent diffs each run against it. Re-read the kickoff for literal dates first — it must say "as of this run", never a hard date.

## v2 — Let it SEND the top LOIs (after you approve each one)
- **What:** the agent emails the letters of inquiry itself, one approval click each.
- **Why later:** sending is a write-action into an external system — kept human-in-the-loop and drafts-only for v0.
- **How:** add an email/Gmail **MCP connector** + a **vault** credential; gate the toolset `always_ask` so you confirm every send. (Reason class: needs a credential + a deliberate write-action gate.)

## v3 — The full automation: a coordinator with a team of experts
- **What:** your original vision — fundraising + marketing + brand + donor-appeal experts, coordinated.
- **Why later:** build and trust one expert end-to-end first; then clone the pattern.
- **How:** build each specialist as its own agent with a scoped system prompt + outcome, then a **multiagent coordinator** (`"multiagent":{"type":"coordinator","agents":[...]}`) that delegates. The grant-finder is specialist #1.

## v4 — Cheaper/faster model if cost bites
- **What:** swap to Sonnet-class (or fast Opus) if run cost matters more than depth.
- **Why later:** Opus chosen for verification quality; at on-demand frequency it's cents per run anyway.
- **How:** `agents update` with `claude-sonnet-4-6` (or `{"id":"claude-opus-4-8","speed":"fast"}`); **re-run `evals/run-evals.sh` before trusting it.**

## Standing habit
- Re-run `evals/run-evals.sh` against `evals/case-01` before promoting ANY new agent version to the deployment. Only promote when the verdict holds.
