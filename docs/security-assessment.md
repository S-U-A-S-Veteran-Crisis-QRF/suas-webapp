# Security assessment — SUAS Veteran Crisis Q.R.F. website

**Assessed:** 2026-07-24 · **Target:** this repo's static export, as deployed to
GitHub Pages · **Method:** code audit + live browser attack pass ·
**Fixes:** PR [#23](https://github.com/S-U-A-S-Veteran-Crisis-QRF/suas-webapp/pull/23)

Re-run the automated checks any time with `scripts/security-check.mjs` (see
[Re-running this assessment](#re-running-this-assessment)).

---

## Was there a breach?

**No evidence of one, and structurally there is very little here to breach.**
That is not the same as proving nothing ever happened, so here is the line
between what was verified and what cannot be seen.

**Verified clean:**

- No credential, `.env` file, key, or token has ever been committed to this
  repo, at any point in its history, on any branch — including files added and
  later deleted.
- Every commit across all branches was authored by Jacob, his second account,
  Claude, or the nightly routine. No unexpected contributors.
- The site stores nothing: no database, no accounts, no sessions, no cookies,
  no `localStorage`, no analytics, no geolocation. There is no server runtime —
  GitHub Pages serves flat files. The classic breach scenario, where an
  attacker gets into a system and leaves with records, has no target here
  because there are no records.

**What was actually found** was an exposure *pathway* (finding 1 below), not
proof that anyone's data went anywhere it shouldn't. Whether a real person ever
triggered it is unknowable from here. If one did, the realistic risk is not an
attacker — it is that their answers sat in their own browser history, which
matters on a shared or family computer, and which is exactly the situation of
someone writing about a veteran in crisis.

**The honest gap:** GitHub does not give repo owners access to Pages request
logs. If a URL carrying form answers was ever requested, that request line
exists in GitHub's infrastructure and neither Claude nor Jacob can inspect it.
Not a reason to assume the worst, but not certainty either.

**Checkable by Jacob, not by Claude:** the Web3Forms dashboard — submission
volume and history, plus the inbox itself. If the public form key had been
abused, it would be plainly visible as junk entries or quota consumed faster
than real traffic explains. That is the concrete evidence for whether the form
has been hit, and it is a two-minute check.

---

## Findings

Severity is calibrated to what this site actually is: a public brochure site
with no auth, no database, and no server. Nothing here was inflated to look
impressive.

### 1. Family/veteran intake data could reach the URL query string — FIXED

**Severity: medium — the most consequential defect found.** No attacker
required, which is why it ranked first.

All four forms were `<form onSubmit={…}>` with **no `method`**. React's handler
calls `preventDefault()`, so this reads as safe — but only *after* hydration.
On a slow phone, or with JavaScript blocked or broken, a native submit falls
through to the browser default: a **GET to the current page**.

Reproduced in a real browser with JavaScript disabled, before the fix:

```
/families/?name=Jane+Doe&email=jane@example.com&phone=5551234567
  &relationship=spouse&county=Santa+Clara&contactPref=email
  &message=sensitive+detail+about+my+veteran&consent=on
```

A family member's name, phone, county, relationship to the veteran, and
free-text about what they are seeing — in the address bar, and from there in
browser history and GitHub Pages access logs.

**Correction to the original writeup:** the first draft of PR #23 claimed this
also leaked via referrer headers to other sites. That was overstated. Modern
browsers default to `strict-origin-when-cross-origin`, which strips path and
query on cross-origin requests, so that route was far narrower than implied.
Recorded here rather than quietly dropped.

**Fix:** `method="post"` on all four forms. A POST to a static host 405s
harmlessly and never builds a query string. Verified: leak reproduced with the
attribute stripped, absent with it in place.

### 2. IRS determination letter 404s on the live site — FIXED

**Severity: low technically, high in consequence.**

`app/donate/page.tsx` linked the 501(c)(3) proof as a raw
`<a href="/docs/IRS-Determination-Letter.pdf">`. Plain anchors bypass Next's
`basePath` rewriting — only `next/link` and `next/image` receive it — so on the
`/suas-webapp` project-site deploy it resolved to `github.io/docs/…` → 404.

Worth recording: the 2026-07-20 work log closed this same 404 by uploading the
PDF. The missing file was the wrong diagnosis; the link was broken by the
missing `basePath`, so it stayed broken for four more days. A local build hides
this completely, because `NEXT_PUBLIC_BASE_PATH` is empty locally and the link
works.

The security-adjacent part: the single artifact a donor or county partner uses
to verify the charity is real was a dead link. That is the condition
look-alike-charity fraud thrives in.

**Fix:** prefixed with `NEXT_PUBLIC_BASE_PATH`, matching the existing pattern
in `app/app/page.tsx`. Verified 200 against a sub-path build.

### 3. Notification-email injection — FIXED

**Severity: low–medium.**

Field values were spread into the Web3Forms payload unescaped, and Web3Forms
renders submissions into an HTML email. A submission containing
`<a href="…">Urgent: open secure form</a>` — or a tracking `<img>` — arrived
inside an email that genuinely came from SUAS's own website form, carrying
maximum trust with the one person who reads that inbox.

**Fix:** angle brackets encoded in `lib/submitForm.ts`. Note the limit: this
covers submissions made through the site, not a direct POST (see
[outstanding](#outstanding-needs-jacob)).

### 4. No length caps anywhere — FIXED

**Severity: low–medium.** A multi-megabyte `message` burned monthly quota,
could make the notification email undeliverable or unreadable, and would
corrupt a row if Google Sheets is connected as the stakeholder list.

**Fix:** `maxLength` on every field (name 100, email 200, phone 30,
county/relationship 80, org/coverage 120, message 2000), plus an 8 KB
whole-payload ceiling in `submitForm` as the backstop for the programmatic
path.

### 5. No Content-Security-Policy — FIXED, with caveats

**Severity: low.** Honest framing: with no `dangerouslySetInnerHTML`, no
user-rendered content, and no third-party scripts, a CSP blocks nothing
exploitable *today*. Its value is containing a future compromised dependency or
malicious commit.

**Fix:** a `<meta http-equiv="Content-Security-Policy">` in `app/layout.tsx`,
plus `strict-origin-when-cross-origin`. GitHub Pages cannot send HTTP headers,
so meta is the only lever available.

Real limits, so nobody over-trusts this later:

- `'unsafe-inline'` is unavoidable in `script-src` — the static export ships an
  inline bootstrap script and there is no server to issue nonces.
- Next hoists its own `<script>` tags above the meta tag, so `script-src` does
  not constrain the first-party bundles.
- What it genuinely enforces: `connect-src`, `form-action`, `img-src`,
  `object-src`, `base-uri`.
- `frame-ancestors` and report-only are ignored in meta, so framing /
  clickjacking cannot be blocked here. With no auth and no state-changing
  clicks, that is reasonable to accept.

### 6. `.gitignore` didn't cover all env files — FIXED

**Severity: low, preventive.** It ignored `.env` and `.env*.local` but not
`.env.production` or `.env.development`. In a public repo, a future
`.env.production` holding the `ANTHROPIC_API_KEY` that `CLAUDE.md` requires
would have been committable with no warning. Now `.env*` with
`!.env.example`.

### 7. No disclosure of where intake data goes — PARTIALLY ADDRESSED

**Severity: low; disclosure/compliance rather than attack.** The family intake
form collects a name, phone, county, relationship, and free text about a
veteran, then sends it to a third-party processor and optionally into a Google
Sheet. Meanwhile `/safety` claims "privacy-first by design" and there is no
`/privacy` route.

**Done:** a line under each form stating submissions are delivered by email
through Web3Forms and are not stored on this website.

**Not done, deliberately:** an actual privacy policy page. That makes legal
commitments on the org's behalf and is Jacob's to author or approve, not
Claude's to invent. See [outstanding](#outstanding-needs-jacob).

---

## Outstanding — needs Jacob

### Enable the Web3Forms spam check (captcha) — the only item no code can fix

The access key is public by design; that is how Web3Forms works on a static
site. An attacker reads it from the JS bundle — or straight from
`lib/submitForm.ts` on GitHub — and POSTs directly to `api.web3forms.com`,
skipping the honeypot, the zod validation, the length caps, and the
angle-bracket encoding. **Everything in this repo is browser-side and therefore
bypassable.**

On the free tier's 250 submissions/month, a script burns the month in seconds.
After that a real family's intake gets an error message instead of reaching
anyone. That is the honest impact: not data theft — denial of the org's only
intake path, plus inbox flooding.

Enable Cloudflare Turnstile or hCaptcha in the Web3Forms dashboard and add the
token field to all four forms. A server-verified captcha is the only control
that survives a direct POST. Also worth turning on the dashboard's own spam
filter and a submission alert.

> This vector was **not** exercised against the live endpoint during the
> assessment. Demonstrating it would have consumed real quota and flooded the
> inbox.

### Decide on a privacy policy page

Needed for CCPA/CPRA posture, county-partner due diligence, and grantmaker
review — and to back up the site's own "privacy-first" claim. One short page
saying what the forms collect, where it goes (Web3Forms → email → optional
Google Sheet), how long it is kept, and how to request deletion.

### Keep the intake fallback prominent

Every form already lists the email and phone as a direct alternative. That is
what makes a form outage survivable rather than a crisis. Do not remove it.

---

## Confirmed clean

Checked and found genuinely sound — recorded so future sessions do not re-derive it:

| Area | Result |
|---|---|
| XSS in React code | None. No `dangerouslySetInnerHTML`, `eval`, `new Function`, or `document.write` anywhere in `app/` or `components/` |
| XSS in the standalone demo | `public/app-demo-frs.html` does use `innerHTML`, but every interpolated value is a hardcoded constant or a locally generated ref — no URL params, no `postMessage`, no storage, no user text. Not exploitable; a guard comment now says so |
| Third-party API text in the DOM | Web3Forms' `json.message` renders as a React text child and is auto-escaped |
| PII handling | Zero `localStorage`/`sessionStorage`, zero cookies, zero analytics, zero `navigator.*`/geolocation, zero `useSearchParams`/`window.location`. Form data travels only in a POST body |
| Demo components | No real data. `CrisisDemoApp` is fictional and state-only; both demos evaporate on reload |
| Reverse tabnabbing | The only `target="_blank"` already carries `rel="noopener noreferrer"` |
| Third-party scripts / CDN / fonts | None at all, so there is no SRI to add. Only outbound destinations are `api.web3forms.com` and the PayPal link |
| `public/` contents | Nothing that shouldn't be public — images with credits, the IRS PDF, the demo HTML |
| Secrets in history | None ever committed |
| Crisis-line guardrail | `CrisisBar` renders on all 12 pages; the directly-reachable `/app-demo-frs.html` carries its own 988 bar |

### Dependency advisories — not applicable to this deployment

`npm audit` reports 2 high-severity advisories against `next` and `sharp`. They
are false positives here, and re-triaging them each time is wasted effort:

- Every Next.js advisory listed requires a server runtime this deployment does
  not have — Server Actions, rewrites, response caching, or the image
  optimizer. `next.config.mjs` sets `loader: "custom"` and `output: "export"`,
  which removes the optimizer entirely.
- The middleware auth-bypass class requires a `middleware.ts`. There is none.
- `sharp`/libvips CVEs are build-time image processing, not reachable by a
  visitor to a static site.

Keep dependencies current on general principle, but do not churn the lockfile
in response to these specific alerts.

### Cosmetic, non-security, noticed and left alone

- No favicon ships, so browsers take a 404 on `/favicon.ico`.
- `metadataBase` is `https://suasqrf.org`, which is not yet serving this site,
  so Open Graph images point at a domain that will 404 — social shares show a
  broken preview until the custom domain is attached.
- `CrisisDemoApp` names `'DM Sans'` but nothing loads it, so it silently falls
  back to `system-ui`.

---

## Re-running this assessment

`scripts/security-check.mjs` automates the runtime half: it builds the site the
way it actually deploys, serves it at the correct sub-path, and drives a real
browser through the checks — CSP violations, XSS payloads through the intake
form, the no-JS submit leak, crisis-bar presence, broken images, and outbound
request destinations.

```bash
npm run security-check     # playwright is already a devDependency
```

It exits non-zero if any check fails, so it can gate a release. What it cannot
check is anything requiring the live host or the Web3Forms dashboard.

**Two habits that would have caught two of these findings earlier:**

1. **Build the way you deploy.** `NEXT_PUBLIC_BASE_PATH=/suas-webapp npm run
   build`, then verify against the built HTML. The local default silently masks
   every `basePath` bug — that is how finding 2 survived a fix attempt.
2. **Reason about the pre-hydration and JS-off path.** On a static site there is
   no server to catch the difference between "React handled it" and "the
   browser did." That is finding 1 in one sentence.

Both are now recorded as rules in `LESSONS.md`.
