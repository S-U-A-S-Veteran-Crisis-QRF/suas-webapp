---
name: grant-finder
description: Find real, currently-open funding S-U-A-S Veteran Crisis QRF can apply for — grants, foundations, government/VA, and corporate giving for veteran-crisis, mental-health, suicide-prevention, and emergency/QRF work. Verifies every opportunity by fetching its source, ranks by fit + dollars + deadline, and writes a decision-ready report with drafted letters of inquiry for the top picks. Runs locally in Claude Code (no API key needed). Use when the user says "/grant-finder", "find grants", "find funding", "fundraising", or wants money the nonprofit doesn't repay. Keywords: grants, funding, foundations, fundraising, veterans, nonprofit.
version: 1.0.0
---

# Grant finder — free local version

This is the local Claude Code version of the `suas-grant-finder` managed agent
(design in `my-agent/`). It does the same job using your web tools, so it runs on
a **Claude Pro plan with no API key**. Sends nothing — research and drafts only.

## Who it's for

S-U-A-S Veteran Crisis QRF ("SUAS"), a nonprofit running a veteran-crisis
quick-reaction force (rapid response for U.S. veterans in acute crisis — suicide
prevention, mental-health emergencies). It has very little money, so the goal is
funding it does **not** have to pay back.

## Inputs

Read `my-agent/first_prompt.txt` for SUAS's profile. If the bracketed fields
(501(c)(3) status, state, budget) are unfilled, search broadly and **note the
eligibility requirement** for each opportunity so the team can check fit — do not
assume facts not provided.

## What to do

1. **Search** (WebSearch) for grants, private/community foundations, government and
   VA programs, and corporate-giving programs that fund veteran services, mental
   health, suicide prevention, crisis response, or emergency/quick-reaction work.
   Run several searches from different angles (national foundations, veteran-
   specific funders, mental-health/suicide-prevention funders, corporate veteran
   programs, state/community foundations).
2. **Verify** (WebFetch) — open each candidate's page and confirm it is real and
   currently open **before** including it. Capture: funder, award amount/range,
   deadline (or "rolling"), eligibility, and the application/source URL you fetched.
3. **Rank** by fit to SUAS + award size + deadline proximity; state a one-line
   rationale.
4. **Write** the report to `my-agent/grant-report.md`:
   - a ranked table: `Funder | Amount | Deadline | Eligibility | Why it fits SUAS | Link`
   - for the **top 3** best-fit funders, a tailored letter-of-inquiry / outreach
     email draft (≤250 words each), addressed to that funder.

## Hard rules (never break)

- Never contact, email, or submit anything to anyone. Drafts only.
- Never invent a funder, link, amount, or deadline. Every entry comes from a page
  you actually fetched, with its URL. Anything unverifiable → omit it or mark it
  **"unverified"**. Deadlines are stated relative to today's date.
- A short list of real, open, well-fit grants beats a long padded one.

## Definition of done

Grade the result against `my-agent/outcome.md` (≥8 verified open opportunities,
each fully specified with a live link, top-3 drafted LOIs, nothing fabricated,
ranked). If the first pass is thin, run more searches and iterate before finishing.

## After

Offer to save the report as `my-agent/evals/case-01/expected.md` (the baseline),
and point to `my-agent/NEXT-DIRECTIONS.md` for what a paid/hosted version would add
(monthly auto-runs, sending the LOIs, a full marketing/brand/donor expert team).
