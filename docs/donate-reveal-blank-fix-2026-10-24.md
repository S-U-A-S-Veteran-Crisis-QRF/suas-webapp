# Donate page blank-middle fix — Oct 24, 2026

For the next agent (Claude) picking this up. This note is dev-only; it is
not part of the website build.

## Symptom (reported by Jacob, Oct 24, 2026)

`/donate` showed only the header/hero and the footer. The whole middle —
mission, tiers, property gifts, form, FAQ — was blank/invisible, even
though the server delivered the full HTML (200, ~79 KB).

## Root cause

`components/Reveal.tsx` wrapped almost every middle section. Its CSS
(`app/globals.css`: `.reveal{opacity:0}`) hid those sections, and only
JavaScript adding `.in` via IntersectionObserver could show them.
Any JS / observer / chunk failure therefore left the middle blank.
The hero is NOT wrapped in Reveal, which is why hero + footer still showed.

## Fixes, in order (all on `main`, all deployed to `gh-pages` for /donate)

1. **Benevity matching line** — `app/donate/page.tsx`
   - Commit `79bc60f`: added the employer-matching line.
   - Commit `ab66cf7`: linked it to the public Benevity profile:
     https://causes.benevity.org/causes/840-883249428
     (EIN 88-3249428). Link opens in a new tab. No "Benevity" word in the
     visible link text, by design — the link text is the portal sentence.

2. **First Reveal attempt (did NOT work in a real render)** — `components/Reveal.tsx`, `app/layout.tsx`
   - Commit `18bef5d`: `<noscript>` style forcing `.reveal` visible, plus a
     1-second fallback timer and an IntersectionObserver-undefined check.
   - Render test on `?v=revealfix1` still showed a blank middle, so this
     alone is NOT sufficient. Do not rely on it.

3. **Working fix: visible by default** — `components/Reveal.tsx`
   - Commit `f650959`: the server render now carries NO `reveal` class at
     all, so middle content is visible even with no JavaScript. The
     `reveal` class is only added after JS mounts; in-view sections show
     immediately, below-fold sections fade in on intersection, and the
     1-second fallback still applies if the observer never fires.
   - Live check: `/donate` HTML contains 0 `class="reveal"` instances,
     and a rendered scroll-through of `?v=revealvisible2` showed every
     section: hero, What we're building, $25/$150/$210 tiers, Benevity
     link, property gifts, inquiry form, 7 FAQs, footer.
   - Built donate chunk for this version:
     `_next/static/chunks/app/donate/page-c8c80093ff9eb60f.js`
   - `gh-pages` head after this deploy: `f7471da`.

## What is NOT yet done (if Claude is fixing further)

- The source fix in `components/Reveal.tsx` and `app/layout.tsx` is in
  `main`, so it applies site-wide in source — but this deploy was scoped
  to /donate only. Other pages that use Reveal still have their OLD
  built chunks + index.html on `gh-pages`. To fix them, rebuild and push
  each page's `index.html`, `index.txt`, and its new page chunk to
  `gh-pages` (same pattern as /donate above). Do not delete old chunks
  from `gh-pages`; old HTML still references them.
- Deploy pattern that worked Oct 24: push source file(s) to `main` via
  the GitHub connector `push_files`, then push built files from `out/`
  to `gh-pages` the same way. Builds need
  `NEXT_PUBLIC_GA_ID=G-2GJCV5XX5B` or the GA4 tag silently drops.
  Content-hashed `_next` chunks are immutable — if a hash already exists
  on `gh-pages`, skip pushing it.

## Rules that still apply to this site

- Do not describe Jacob as a veteran; he founded SUAS QRF as a civilian.
- Unit costs: meal $25, ride $35, shelter night $150, full bundle $210.
- Do not overstate the app — it is a demo / in development, not a live
  backend. Do not claim VA approval, clinical validation, or HIPAA
  compliance.
- Free-only: no payment details, no paid tools. GoFundMe is primary;
  PayPal Giving Fund is the fee-covered route.
