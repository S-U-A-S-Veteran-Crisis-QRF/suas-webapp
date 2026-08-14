---
name: grants
description: Overview and operating guide for the SUAS grant program — the standing authorization, where everything lives (key vault, pipeline, SOP, drafts), and the working loop, discover → qualify → draft → queue for Jacob's signature. Use when the user says "/grants", "grant work", "find grants", "apply for grants", "work the pipeline", "grant status", "what grants are we chasing", or any session is about to do grant discovery, qualification, or application drafting. Keywords: grants, SAM.gov, grants.gov, pipeline, funding applications, NOFO, veteran grants.
version: 1.0.0
---

# Grants — the SUAS grant program, end to end

## Standing authorization (Jacob, 2026-08-14)

**All grant preparation is autonomous — never ask permission for it.**
Discover opportunities, qualify fit, track deadlines, and draft complete
application packages without checking in. The **only** step reserved for
Jacob is **final sign-off and submission** — he is the org's authorized
representative, and submission is outbound (the publish gate). Queue
finished drafts for his signature in plain language; never block on
questions.

## Where everything lives

| Thing | Location |
|-------|----------|
| Grant program SOP | Vault `01_SOPs/` → `SOP — Grant pipeline (Claude prepares, Jacob signs)` |
| Opportunity pipeline (live) | Vault `05_Reference/` → newest `Grant Pipeline — …` note |
| Application drafts | Vault `06_Funding/` — filenames marked `DRAFT`; approved boilerplate (org context, founder bio, budget, letter templates) is already there |
| Secret values (SAM.gov key etc.) | `SUAS-SECURE` folder in the org Google Drive (**outside** the git-synced vault) → `API-KEY-REGISTRY.md`. Rules in `docs/api-keys.md` |
| SAM.gov tooling | `npm run sam -- <check | entity <UEI> | opps [keyword]>` (main computers only) |
| Weekly discovery | Scheduled cloud routine "SUAS weekly grant scan", Mondays ~8am PT — push-notifies and files a `📥 Grant scan` inbox note when it finds something new |

The vault is the `SUAS-QRF` Google Drive folder (`~/Documents/SUAS-QRF` on
main computers; Drive connector from cloud). Read its `CLAUDE.md` contract
before writing there. Cloud sessions can only **create** Drive files — leave
`📥 … — fold me in.md` inbox notes at the vault root instead of editing.

## Capability map by session type

- **Cloud sessions**: discovery via WebSearch/WebFetch (the network policy
  blocks direct calls to api.sam.gov and api.grants.gov — don't burn time on
  curl). Full vault read + create via the Drive connector.
- **Main computers (Mac/Beelink)**: everything above **plus** the real APIs —
  `npm run sam` for key checks, SUAS's SAM registration status, and
  opportunity search; Grants.gov's search2 API needs no key.

## The working loop

1. **Catch up** — read the newest `Grant Pipeline` note + any unfolded
   `📥 Grant scan` inbox notes; check `MASTER.md` next actions.
2. **Discover** (when asked, or when the pipeline is thin) — sweep five
   lenses: federal/VA (SSG Fox SPGP, SSVF, SAMHSA), California state/county,
   veteran foundations (Bob Woodruff etc.), corporate giving, small/rolling +
   in-kind tech grants. **Verify every claim on a live funder page** — name,
   deadline, eligibility, URL. Nothing from memory alone.
3. **Qualify** — small early-stage CA 501(c)(3) (EIN 88-3249428), volunteer
   crisis QRF (food/rides/shelter dispatch), suicide-prevention adjacent.
   Score: eligibility, mission fit, award vs. application effort, deadline
   feasibility.
4. **Draft** — full package in `06_Funding/`, `DRAFT` in the filename.
   Civilian-ally framing always (Jacob is NOT a veteran; veteran peer
   responders lead support). Crisis line (988, press 1 / text 838255) on all
   public-facing copy. Any number not already in the vault → `[Jacob confirm]`.
5. **Queue for signature** — tell Jacob what's ready, where it is, the
   deadline, and the one action he must take. Then keep the pipeline moving.

## Hard rules

- No veteran PII in any draft, note, or repo — ever.
- No invented numbers, tax language, or legal claims.
- No submission, outbound sending, or spending — Jacob only.
- Secret values never leave the `SUAS-SECURE` registry + local `.env`
  (this repo is public; the vault git-syncs — see `docs/api-keys.md`).
- SAM registration must stay active to receive federal awards — if working
  on a main computer, `npm run sam -- entity <UEI>` is a cheap health check.
