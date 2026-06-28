"use client";

import { useState } from "react";

type FieldErrors = Record<string, string[] | undefined>;
type Status = "idle" | "submitting" | "ok" | "error";

export default function FamilyIntakeForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverMsg, setServerMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    setServerMsg("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      relationship: fd.get("relationship"),
      county: fd.get("county"),
      contactPref: fd.get("contactPref"),
      message: fd.get("message"),
      company: fd.get("company"), // honeypot
      consent: fd.get("consent") ? true : false,
    };

    try {
      const res = await fetch("/api/family-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json.ok) {
        setStatus("ok");
        (e.target as HTMLFormElement).reset();
        return;
      }
      if (res.status === 422 && json.fieldErrors) {
        setErrors(json.fieldErrors as FieldErrors);
        setStatus("error");
        setServerMsg("Please fix the highlighted fields and try again.");
        return;
      }
      setStatus("error");
      setServerMsg(json.error || "Something went wrong. Please try again or email us directly.");
    } catch {
      setStatus("error");
      setServerMsg("Network error. Please try again or email jacobsilver@suasqrf.org.");
    }
  }

  const err = (f: string) => errors[f]?.[0];

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
          <input id="name" name="name" required aria-invalid={!!err("name")} autoComplete="name" />
          {err("name") && <div className="field-error">{err("name")}</div>}
        </div>
        <div>
          <label htmlFor="email">
            Email <span className="req">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            aria-invalid={!!err("email")}
            autoComplete="email"
          />
          {err("email") && <div className="field-error">{err("email")}</div>}
        </div>
      </div>

      <div className="field-row">
        <div>
          <label htmlFor="phone">Phone (optional)</label>
          <input id="phone" name="phone" type="tel" aria-invalid={!!err("phone")} autoComplete="tel" />
          {err("phone") && <div className="field-error">{err("phone")}</div>}
        </div>
        <div>
          <label htmlFor="relationship">Relationship to the veteran</label>
          <input id="relationship" name="relationship" placeholder="e.g. spouse, parent, friend" />
          {err("relationship") && <div className="field-error">{err("relationship")}</div>}
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
          aria-invalid={!!err("message")}
          placeholder="Share what you're seeing or what kind of support you're looking for. Please don't include clinical details."
        />
        {err("message") && <div className="field-error">{err("message")}</div>}
      </div>

      {/* Honeypot — visually hidden, ignored by humans */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontWeight: 400 }}>
        <input
          type="checkbox"
          name="consent"
          required
          style={{ width: "auto", marginTop: 4 }}
          aria-invalid={!!err("consent")}
        />
        <span>
          I understand SUAS is a support-coordination tool and <strong>not</strong> emergency care.
          In an emergency I will call 988 (press 1) or 911. <span className="req">*</span>
        </span>
      </label>
      {err("consent") && <div className="field-error">{err("consent")}</div>}

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
