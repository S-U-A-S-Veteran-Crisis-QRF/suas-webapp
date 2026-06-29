"use client";

import { useState } from "react";

// Free, no-backend form delivery via Web3Forms (https://web3forms.com).
// Get a free access key (enter your email, no account needed) and paste it here,
// or set NEXT_PUBLIC_WEB3FORMS_KEY at build time. The key is safe to expose in
// client code — that's how Web3Forms is designed to work.
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY";

type Status = "idle" | "submitting" | "ok" | "error";

export default function FamilyIntakeForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    setServerMsg("");

    const fd = new FormData(form);

    // Honeypot — real users leave this empty.
    if (fd.get("company")) {
      setStatus("ok");
      form.reset();
      return;
    }

    if (!fd.get("consent")) {
      setStatus("error");
      setServerMsg("Please confirm you understand SUAS is not emergency care.");
      return;
    }

    if (WEB3FORMS_ACCESS_KEY.startsWith("REPLACE_")) {
      setStatus("error");
      setServerMsg(
        "This form isn't connected yet. In the meantime, email jacobsilver@suasqrf.org or call (925) 727-6109."
      );
      return;
    }

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New family intake — ${fd.get("name") || "unknown"}`,
      from_name: "SUAS QRF website",
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      relationship: fd.get("relationship"),
      county: fd.get("county"),
      contact_preference: fd.get("contactPref"),
      message: fd.get("message"),
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
        setServerMsg(
          json.message || "Something went wrong. Please email jacobsilver@suasqrf.org or call (925) 727-6109."
        );
      }
    } catch {
      setStatus("error");
      setServerMsg("Network error. Please try again, or email jacobsilver@suasqrf.org.");
    }
  }

  if (status === "ok") {
    return (
      <div className="form-status ok" role="status">
        <strong>Thank you — your message reached us.</strong>
        <p style={{ marginTop: 6 }}>
          A SUAS team member will follow up using your preferred contact method. If this is an
          urgent safety concern, call the Veterans Crisis Line now: 988, press 1 (text 838255).
        </p>
      </div>
    );
  }

  return (
    <form className="demo" onSubmit={onSubmit} noValidate>
      <div className="field-row">
        <div>
          <label htmlFor="name">
            Your name <span className="req">*</span>
          </label>
          <input id="name" name="name" required autoComplete="name" />
        </div>
        <div>
          <label htmlFor="email">
            Email <span className="req">*</span>
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>

      <div className="field-row">
        <div>
          <label htmlFor="phone">Phone (optional)</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="relationship">Relationship to the veteran</label>
          <input id="relationship" name="relationship" placeholder="e.g. spouse, parent, friend" />
        </div>
      </div>

      <div className="field-row">
        <div>
          <label htmlFor="county">County (optional)</label>
          <input id="county" name="county" placeholder="e.g. Santa Clara" />
        </div>
        <div>
          <label htmlFor="contactPref">Preferred contact</label>
          <select id="contactPref" name="contactPref" defaultValue="email">
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message">
          How can we help? <span className="req">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="Share what you're seeing or what kind of support you're looking for. Please don't include clinical details."
        />
      </div>

      {/* Honeypot — visually hidden, ignored by humans */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontWeight: 400 }}>
        <input type="checkbox" name="consent" required style={{ width: "auto", marginTop: 4 }} />
        <span>
          I understand SUAS is a support-coordination tool and <strong>not</strong> emergency care.
          In an emergency I will call 988 (press 1) or 911. <span className="req">*</span>
        </span>
      </label>

      {status === "error" && serverMsg && (
        <div className="form-status err" role="alert">
          {serverMsg}
        </div>
      )}

      <button className="btn btn-primary" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send to SUAS"}
      </button>
      <p className="muted" style={{ fontSize: ".82rem" }}>
        We typically respond within a few business days. Prefer to reach out directly? Email{" "}
        <a href="mailto:jacobsilver@suasqrf.org">jacobsilver@suasqrf.org</a> · (925) 727-6109.
      </p>
    </form>
  );
}
