import { NextResponse } from "next/server";
import { familyIntakeSchema } from "@/lib/validation";

export const runtime = "nodejs";

const NOTIFY_TO = process.env.INTAKE_NOTIFY_TO || "jacobsilver@suasqrf.org";
const NOTIFY_FROM = process.env.INTAKE_NOTIFY_FROM || "SUAS Intake <onboarding@resend.dev>";

function esc(s: string) {
  return s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] as string));
}

async function sendEmail(data: Record<string, unknown>) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { delivered: false, reason: "no_api_key" as const };

  const rows = Object.entries(data)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#5c6a79">${esc(k)}</td><td>${esc(String(v ?? ""))}</td></tr>`)
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: NOTIFY_FROM,
      to: [NOTIFY_TO],
      reply_to: String(data.email ?? ""),
      subject: `New family intake — ${data.name ?? "unknown"}`,
      html: `<h2>New Family Intake</h2><table>${rows}</table>`,
    }),
  });

  if (!res.ok) {
    return { delivered: false, reason: "send_failed" as const, status: res.status };
  }
  return { delivered: true as const };
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = familyIntakeSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return NextResponse.json({ ok: false, fieldErrors }, { status: 422 });
  }

  // Drop honeypot before logging/sending.
  const { company: _company, consent: _consent, ...clean } = parsed.data;
  const submission = { ...clean, receivedAt: new Date().toISOString() };

  // Always log server-side so submissions are never silently lost.
  console.log("[family-intake]", JSON.stringify(submission));

  try {
    const result = await sendEmail(submission);
    return NextResponse.json({ ok: true, delivered: result.delivered });
  } catch (err) {
    console.error("[family-intake] email error", err);
    // The submission is logged; report success to the user but flag delivery.
    return NextResponse.json({ ok: true, delivered: false });
  }
}
