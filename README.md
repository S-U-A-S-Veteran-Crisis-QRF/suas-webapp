# SUAS Veteran Crisis Q.R.F. — Website

Next.js (App Router) rebuild of the SUAS QRF site. Navy/cream/gold design system,
photographic heroes on every page, an interactive crisis-services app prototype on
the App Demo page, and a Family Intake form.

Live (free, GitHub Pages): https://s-u-a-s-veteran-crisis-qrf.github.io/suas-webapp/

## Stack
- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- Plain CSS design system in `app/globals.css`
- **Static export** (`output: "export"`) — hosted free on GitHub Pages
- Family Intake form delivered via **Web3Forms** (free, no backend)

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
```

## Enable the intake form
Get a free **Web3Forms** access key (web3forms.com — enter your email, no account),
then paste it into `components/FamilyIntakeForm.tsx` (`WEB3FORMS_ACCESS_KEY`) or set
`NEXT_PUBLIC_WEB3FORMS_KEY`. Until set, the form shows a "email/call us" fallback.

## Deploy (GitHub Pages, free)
The built site lives on the `gh-pages` branch. To redeploy after changes:
```bash
NEXT_PUBLIC_BASE_PATH=/suas-webapp npm run build   # builds ./out for the sub-path
# publish ./out to the gh-pages branch (force-push)
```
(Or ask Claude to rebuild and push.) For auto-deploy on every commit, authorize the
`workflow` scope and add a GitHub Actions Pages workflow.

## Custom domain (later)
`suasqrf.org` already points at GitHub Pages. To serve this site at the root:
rebuild with `NEXT_PUBLIC_BASE_PATH` empty, add a `CNAME` file (`suasqrf.org`) to the
deployed output, and attach the domain to this repo's Pages settings.

## Crisis safety
The Veterans Crisis Line (988, press 1 · text 838255) banner is global and must stay
accurate and prominent. SUAS is coordination, not emergency care.
