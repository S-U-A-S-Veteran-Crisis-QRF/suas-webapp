# API keys — where they live and how to use them

This repo is **public**, so it never carries a secret value — only variable
names, placeholders, and this doc. The rules below are the whole system.

## The one rule

**Secret values live in exactly two places:**

1. The org's private key vault — the `SUAS-SECURE` folder in the org Google
   Drive (access: founder). Its `API-KEY-REGISTRY.md` is the source of truth:
   every key's value, purpose, owner account, and rotation date.
2. Local `.env` files on a machine that needs the key (`.env` and
   `.env*.local` are gitignored here; `my-agent/.env` likewise).

Everything else — this repo, the second-brain vault (it auto-commits to a
GitHub backup), chat logs, screenshots — gets **names only, never values**.
If a value ever leaks into one of those, rotate the key first, then update
the registry.

## Inventory

| Key | Env var | Secret? | Used by |
|-----|---------|---------|---------|
| SAM.gov API key | `SAM_GOV_API_KEY` | **Yes** | `scripts/sam-gov.mjs` (`npm run sam`), suas-grant-finder agent |
| Web3Forms access key | `NEXT_PUBLIC_WEB3FORMS_KEY` | No — public by design | All site forms via `lib/submitForm.ts` (client-side form service; the key is safe to expose and currently lives in that file) |
| Anthropic API key | `ANTHROPIC_API_KEY` | **Yes** | `/launch-your-agent` (managed-agent launches); local `.env` only |
| Google Analytics ID | `NEXT_PUBLIC_GA_ID` | No — ships in public page HTML | `app/layout.tsx` (analytics tag; set per-deploy) |

*Audited 2026-08-14: a five-agent sweep of the working tree, all markdown, and
full git history found no secret values committed anywhere in this repo.*

## Using the SAM.gov key (grant program)

The key unlocks SAM.gov's APIs — most usefully for SUAS: **entity
registration status** (SUAS must keep its SAM registration active to receive
federal grants) and federal opportunity data. Grant *search* itself is best
done on Grants.gov, whose search API needs no key.

```bash
# 1. Copy the value from the key vault into .env at the repo root:
#    SAM_GOV_API_KEY=<value>

npm run sam -- check           # validate the key against SAM.gov
npm run sam -- entity <UEI>    # SUAS's SAM registration status + expiry
npm run sam -- opps veteran    # federal opportunities from the last 90 days
```

Notes:

- SAM.gov personal API keys **expire every ~90 days** — regenerate at
  sam.gov → Account Details → API Key, then update the vault registry and any
  local `.env`.
- Claude cloud sessions cannot reach `api.sam.gov` (network policy), so key
  verification and searches run from the main computers.

## Adding a new key

1. Put the value in the key vault registry (value, env var, purpose, owner,
   rotation date).
2. Add the env var name + a comment to `.env.example` — placeholder only.
3. Add a row to the inventory table above.
4. Never commit the value; check the destination's visibility before writing
   it anywhere (see `LESSONS.md`).
