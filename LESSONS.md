# LESSONS — Claude's corrections log

Self-learning journal for Claude sessions on SUAS work. Every time **Jacob
corrects Claude** or **Claude catches its own mistake**, the lesson gets an
entry here — so the next session (on any device) doesn't repeat it.

**Read this file before acting on anything it covers. Append when corrected.**

Rules for entries:

- Newest first. Keep each entry short: what went wrong → the rule going forward.
- This file is in a **public** repo: state lessons generically. No veteran PII,
  credentials, private-repo contents, or personal details — the *lesson*, not
  the sensitive specifics.
- Tag who caught it: `[user correction]` or `[self-correction]`.
- Don't delete old entries; if a lesson is superseded, add the new one on top
  and mark the old one superseded.

Template:

```markdown
## YYYY-MM-DD — <short title> [user correction | self-correction]
**What happened:** …
**Rule going forward:** …
```

---

## 2026-07-19 — Check the second brain before re-deriving org facts [self-correction]

**What happened:** Claude concluded the public `help` repo "serves
suasqrf.org" from the `CNAME` file inside it and told Jacob it must stay
public. The vault's `🔥 Recent Context` already recorded that the domain was
repointed to the new webapp on 2026-07-15 (verified by an hourly watchdog).
A config file left in a repo proves history, not present state.

**Rule going forward:** Before asserting an org fact, check the vault (Recent
Context, then the relevant notes) — it is the org's source of truth and the
fact may already be documented. Where live state matters, verify it live;
when two sources conflict, say so instead of picking one silently.

## 2026-07-19 — Inspect a repo before proposing visibility or destructive changes [self-correction]

**What happened:** Claude flagged the public `help` repo as a candidate to
flip private based on its name and visibility alone. When asked to actually do
it, inspection revealed it is the **live Jekyll site serving `suasqrf.org`**
via GitHub Pages (`CNAME` + deploy workflows) — making it private would have
taken the org's domain down.

**Rule going forward:** Never recommend or execute a visibility change,
deletion, or archive without inspecting the target first (clone/read it; look
for `CNAME`, Pages/deploy workflows, live-site configs). A public repo may
*be* a live website — the org's public-repo exception exists precisely for
those.

## 2026-07-19 — Check existing infrastructure before creating new [self-correction]

**What happened:** While fixing the privacy issue below, Claude tried to create
a brand-new private sync repo — before checking whether one already existed.
The org already had `suas-claude-program`, a private repo purpose-built as the
cross-device Claude brain, which was the right home for the sync channel.

**Rule going forward:** Before creating any new repo, file, branch, or system,
inventory what already exists (`list_repos`, repo docs, MASTER.md, the vault).
Extend existing infrastructure instead of duplicating it.

## 2026-07-19 — Session data must never live on public repos [user correction]

**What happened:** Claude built the cross-device session-sync channel (handoffs
+ journal) on a branch of **this repo — which is public** (it must be, for free
GitHub Pages hosting). Jacob corrected it: everything SUAS is private except
the websites that need to be public to operate. The channel was moved to the
private `suas-claude-program` repo.

**Rule going forward:** Before writing any org/session/work data anywhere,
check the destination's visibility. Default to private. Public repos carry
only what must be public to operate (the website itself and its code/docs).
This applies to branches too — every branch of a public repo is public.

## 2026-07-24 — Verify links against the deployed basePath, not the local build [self-correction]

**What happened:** The 2026-07-20 fix for the donate page's 404 IRS
determination letter added the missing PDF to `public/docs/` and logged the
issue as closed. The link was still 404 on the live site: the real cause was
that a plain `<a href="/docs/...">` ignores Next's `basePath`, so on the
`/suas-webapp` project-site deploy it resolved to `github.io/docs/...`. A
local build (where `NEXT_PUBLIC_BASE_PATH` is empty) hides this completely —
the link works locally and only ever breaks in production. Found four days
later during a security pass.

**Rule going forward:** `basePath` rewriting applies to `next/link` and
`next/image` only — never to raw `<a href="/...">`, `<img src="/...">`, or
`fetch("/...")`. Prefix those with `process.env.NEXT_PUBLIC_BASE_PATH`. And
when verifying any link or asset fix, build the way the site actually deploys
(`NEXT_PUBLIC_BASE_PATH=/suas-webapp npm run build`) and check the built HTML,
because the local default silently masks this whole class of bug.

## 2026-07-24 — A form with no `method` degrades to a GET that leaks PII [self-correction]

**What happened:** All four site forms were `<form onSubmit={...}>` with no
`method`. React's handler calls `preventDefault()`, so this looks safe — but
it only works *after* hydration. On a slow phone, or with JS blocked, a native
submit falls through to the browser default (**GET** to the current URL), so a
family member's name, phone, county, relationship, and free-text about their
veteran ended up in the address bar — and therefore in browser history,
GitHub Pages access logs, and the `Referer` header of every later request.
Reproduced in a real browser with JS disabled, then confirmed fixed.

**Rule going forward:** Any form carrying sensitive input gets an explicit
`method="post"`, even when a JS handler is supposed to intercept it. Reason
about what a form does *before* hydration and with JS off, not just in the
happy path — on a static site there is no server to catch the difference.
