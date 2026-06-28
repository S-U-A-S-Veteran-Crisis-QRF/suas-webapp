# SUAS Veteran Crisis Q.R.F. — Website

Next.js (App Router) rebuild of suasqrf.org. Reuses the original navy/cream/gold
design system, adds a modernized Families experience with photorealistic imagery,
and ships a real Family Intake backend.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- Plain CSS design system in `app/globals.css` (ported from the original site)
- `next/image` for optimized, responsive photography
- API route at `app/api/family-intake/route.ts` (zod-validated, email via Resend)

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Family Intake backend

`POST /api/family-intake` accepts the trusted-circle intake form. It validates
input with zod, logs the submission server-side, and — when `RESEND_API_KEY` is
set — emails it to `INTAKE_NOTIFY_TO`. Copy `.env.example` to `.env.local` and
fill in values for email delivery. Without a key, submissions are validated and
logged but not emailed (safe default for local dev).

## Deploy (Vercel)

1. Push this folder to a Git repo.
2. Import into Vercel — framework auto-detected as Next.js.
3. Add env vars from `.env.example` in the Vercel project settings.
4. Point `suasqrf.org` DNS at the Vercel deployment.

## Crisis safety

The Veterans Crisis Line (988, press 1 · text 838255) banner is global and must
stay accurate and prominent. SUAS is coordination, not emergency care.
