// ─────────────────────────────────────────────────────────────────
// Shared form delivery — every SUAS website form lands in ONE place.
//
// Uses Web3Forms (https://web3forms.com): free, no backend, works on a
// static GitHub Pages site. Submissions are emailed to you, and if you
// connect Google Sheets in the Web3Forms dashboard, every submission
// also auto-populates ONE spreadsheet — your single stakeholder list.
//
// SETUP (one time, ~2 min):
//   1. Go to https://web3forms.com, enter jacobsilver@suasqrf.org
//      (no account needed). Your access key is emailed to you.
//   2. Paste it below in place of REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY,
//      OR set NEXT_PUBLIC_WEB3FORMS_KEY in .env before building.
//   3. (Optional) In the Web3Forms dashboard, connect Google Sheets so
//      all forms also flow into one sheet.
// The key is safe to expose in client code — that's how Web3Forms works.
// ─────────────────────────────────────────────────────────────────

import { z } from "zod";

export const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "1efb2f90-1e2d-413d-bf81-7f864d5430d6";

export const FORMS_CONNECTED = !WEB3FORMS_ACCESS_KEY.startsWith("REPLACE_");

export type SubmitResult = { ok: boolean; message?: string };

const FALLBACK =
  "This form isn't connected yet. In the meantime, email jacobsilver@suasqrf.org or call (925) 727-6109.";

// Backstop validation: every SUAS form requires a name and a reachable
// email. The browser's native validation (required / type="email") runs
// first; this guards the programmatic path so a submission without a way
// to reach the person back can never be sent.
const contactableSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address so we can follow up with you."),
});

/**
 * Submit any form to the shared Web3Forms inbox.
 * @param source  Short label identifying which form this came from
 *                (e.g. "Pilot interest", "Contact", "Partner/Services").
 * @param fields  Field name → value pairs to record.
 */
export async function submitForm(
  source: string,
  fields: Record<string, FormDataEntryValue | string | null>
): Promise<SubmitResult> {
  if (!FORMS_CONNECTED) {
    return { ok: false, message: FALLBACK };
  }

  const check = contactableSchema.safeParse({
    name: String(fields.name ?? ""),
    email: String(fields.email ?? ""),
  });
  if (!check.success) {
    return { ok: false, message: check.error.issues[0].message };
  }

  const label = (
    (fields.name as string) ||
    (fields.organization as string) ||
    "New submission"
  )
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, 80);

  // Reserved keys are set after the field spread so a form field can
  // never clobber them.
  const payload: Record<string, unknown> = {
    ...fields,
    access_key: WEB3FORMS_ACCESS_KEY,
    from_name: "SUAS QRF website",
    subject: `[${source}] ${label}`,
    form_source: source,
  };

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    });
    const json = await res.json().catch(() => ({}));
    if (res.ok && json.success) return { ok: true };
    return {
      ok: false,
      message:
        json.message ||
        "Something went wrong. Please email jacobsilver@suasqrf.org or call (925) 727-6109.",
    };
  } catch {
    return { ok: false, message: "Network error. Please try again, or email jacobsilver@suasqrf.org." };
  }
}
