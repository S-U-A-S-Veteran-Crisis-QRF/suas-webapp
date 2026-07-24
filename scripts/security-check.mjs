#!/usr/bin/env node
// Runtime security checks for the static export — see docs/security-assessment.md.
//
// Builds the site the way it actually deploys (sub-path basePath), serves it,
// and drives a real browser through the checks that caught the 2026-07-24
// findings. Exits non-zero if anything regresses, so it can gate a release.
//
//   npm run security-check
//
// What it cannot check: anything needing the live host or the Web3Forms
// dashboard (quota abuse via direct POST is covered only by the server-side
// captcha).

import { execSync, spawn } from "node:child_process";
import { existsSync, rmSync, mkdtempSync, cpSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE_PATH = "/suas-webapp"; // must match the deploy sub-path
const PORT = 8099;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const URL_BASE = ORIGIN + BASE_PATH;

const PAGES = [
  "/", "/about/", "/donate/", "/families/", "/contact/", "/pilot/",
  "/nonprofits/", "/app/", "/safety/", "/veterans/", "/counties/",
  "/how-it-works/",
];

// A crash is a failed run, not a passed one — make that loud and non-zero.
process.on("uncaughtException", (e) => {
  console.error(`\nsecurity-check crashed before finishing: ${e.message}\n`);
  process.exit(1);
});

const failures = [];
const fail = (m) => { failures.push(m); console.log(`  FAIL  ${m}`); };
const pass = (m) => console.log(`  ok    ${m}`);

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error("playwright is not installed. Run: npm i -D playwright");
  process.exit(2);
}

// ── build exactly as deployed ────────────────────────────────────────────────
console.log(`\nBuilding with NEXT_PUBLIC_BASE_PATH=${BASE_PATH} …`);
rmSync("out", { recursive: true, force: true });
execSync("npm run build", {
  stdio: "inherit",
  env: { ...process.env, NEXT_PUBLIC_BASE_PATH: BASE_PATH },
});
if (!existsSync("out/index.html")) {
  console.error("Build produced no out/index.html");
  process.exit(2);
}

// ── serve it at the sub-path, so basePath bugs are visible ───────────────────
const root = mkdtempSync(join(tmpdir(), "suas-seccheck-"));
cpSync("out", join(root, BASE_PATH.replace(/^\//, "")), { recursive: true });
const server = spawn("python3", ["-m", "http.server", String(PORT)], {
  cwd: root, stdio: "ignore",
});
const cleanup = () => {
  server.kill();
  rmSync(root, { recursive: true, force: true });
};
process.on("exit", cleanup);
await new Promise((r) => setTimeout(r, 1500));

const browser = await chromium.launch({
  executablePath: existsSync("/opt/pw-browsers/chromium")
    ? "/opt/pw-browsers/chromium"
    : undefined,
});

// ── every page: CSP violations, broken images, crisis bar ────────────────────
console.log("\nPage integrity");
const ctx = await browser.newContext();
const page = await ctx.newPage();
const cspViolations = [];
const outbound = new Set();
page.on("console", (m) => {
  const t = m.text();
  if (/Refused to|Content Security Policy|violates/i.test(t)) cspViolations.push(t.slice(0, 200));
});
page.on("request", (r) => { if (!r.url().startsWith(ORIGIN)) outbound.add(`${r.method()} ${new URL(r.url()).origin}`); });

for (const p of PAGES) {
  const res = await page.goto(URL_BASE + p, { waitUntil: "networkidle" });
  if (!res || res.status() >= 400) { fail(`${p} returned HTTP ${res?.status()}`); continue; }
  // The non-negotiable guardrail: the 988 crisis bar on every page.
  if ((await page.locator(".crisis-bar").count()) < 1) fail(`${p} is missing the crisis bar`);
  const broken = await page.evaluate(() =>
    [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length);
  if (broken > 0) fail(`${p} has ${broken} broken image(s)`);
}
if (!failures.length) pass(`${PAGES.length} pages: crisis bar present, no broken images`);

// ── links that ignore basePath silently 404 in production ────────────────────
console.log("\nbasePath integrity");
{
  const res = await page.goto(`${URL_BASE}/docs/IRS-Determination-Letter.pdf`);
  res && res.status() === 200
    ? pass("IRS determination letter resolves under the sub-path")
    : fail(`IRS determination letter returned HTTP ${res?.status()} — a raw <a href="/…"> ignores basePath`);
}

// ── XSS through the intake form ──────────────────────────────────────────────
console.log("\nXSS through the family intake form");
{
  await page.goto(`${URL_BASE}/families/`, { waitUntil: "networkidle" });
  const XSS = `"><img src=x onerror=alert(1)><script>alert(2)</script>`;
  let alerted = false;
  page.on("dialog", async (d) => { alerted = true; await d.dismiss(); });
  await page.fill("#name", XSS);
  await page.fill("#email", "attacker@example.com");
  await page.fill("#message", XSS);
  await page.check('input[name="consent"]', { force: true });
  await page.click('button[type="submit"]', { force: true });
  await page.waitForTimeout(2500);
  if (alerted) fail("XSS payload executed a dialog");
  if (await page.evaluate(() => !!document.querySelector('img[src="x"]')))
    fail("XSS payload was rendered as live HTML in the DOM");
  if (!alerted) pass("payload escaped — no dialog, not rendered as HTML");
}

// ── the finding that mattered: no-JS submit must not leak PII to the URL ─────
console.log("\nNo-JS / pre-hydration submit (the 2026-07-24 PII leak)");
{
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const p2 = await noJs.newPage();
  const navs = [];
  p2.on("framenavigated", (f) => { if (f === p2.mainFrame()) navs.push(f.url()); });
  await p2.goto(`${URL_BASE}/families/`, { waitUntil: "load" });
  const method = await p2.locator("form.demo").getAttribute("method");
  if ((method || "").toLowerCase() !== "post")
    fail(`intake form method is ${JSON.stringify(method)} — must be "post" or a native submit GETs the data into the URL`);
  await p2.fill("#name", "Jane Doe");
  await p2.fill("#email", "jane@example.com");
  await p2.fill("#phone", "5551234567");
  await p2.fill("#relationship", "spouse");
  await p2.fill("#message", "sensitive detail about my veteran");
  // force: the Reveal transitions leave elements "unstable" for Playwright,
  // and native validation blocks the submit if consent isn't ticked — which
  // would make this test silently pass for the wrong reason.
  await p2.check('input[name="consent"]', { force: true });
  await p2.locator('button[type="submit"]').click({ force: true }).catch(() => {});
  await p2.waitForTimeout(1500);
  const finalUrl = decodeURIComponent(navs[navs.length - 1] || "");
  if (/name=Jane|phone=555|message=sensitive/.test(finalUrl))
    fail(`PII leaked into the URL: ${finalUrl.slice(0, 160)}`);
  else pass('method="post" holds — no form data in the URL');
  await noJs.close();
}

// ── CSP present, enforcing, and not breaking anything ────────────────────────
console.log("\nContent-Security-Policy");
{
  await page.goto(URL_BASE + "/", { waitUntil: "networkidle" });
  const csp = await page.evaluate(() =>
    document.querySelector('meta[http-equiv="Content-Security-Policy"]')?.getAttribute("content") || "");
  if (!csp) fail("no meta CSP found — Pages cannot send headers, so meta is the only lever");
  else {
    for (const d of ["connect-src", "form-action", "object-src", "base-uri"])
      if (!csp.includes(d)) fail(`CSP is missing ${d} (one of the directives meta actually enforces)`);
    if (!csp.includes("api.web3forms.com"))
      fail("CSP omits api.web3forms.com — form submissions would be blocked");
    if (!failures.some((f) => f.includes("CSP"))) pass("policy present and allows the form endpoint");
  }
  if (cspViolations.length) {
    for (const v of new Set(cspViolations)) fail(`CSP violation: ${v}`);
  } else pass("zero CSP violations across all pages");
}

// ── anything reaching a third party is worth a human look ────────────────────
console.log("\nOutbound destinations");
{
  const EXPECTED = new Set(["POST https://api.web3forms.com"]);
  const unexpected = [...outbound].filter((o) => !EXPECTED.has(o));
  if (unexpected.length) fail(`unexpected third-party requests: ${unexpected.join(", ")}`);
  else pass(outbound.size ? [...outbound].join(", ") : "none");
}

await browser.close();

console.log(
  failures.length
    ? `\n${failures.length} check(s) FAILED\n`
    : "\nAll security checks passed.\n"
);
process.exit(failures.length ? 1 : 0);
