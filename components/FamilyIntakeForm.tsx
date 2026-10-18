"use client";

import { useEffect, useState } from "react";

const FORMSUBMIT = "https://formsubmit.co/info@suasqrf.org";

export default function FamilyIntakeForm() {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("sent") === "1") {
      setSent(true);
    }
  }, []);

  if (sent) {
    return (
      <div className="form-status ok" role="status">
        <strong>Message sent — we&apos;ll reply soon.</strong>
        <p style={{ marginTop: 6 }}>
          A SUAS team member will follow up using your preferred contact method. If this is an
          urgent safety concern, call the Veterans Crisis Line now: 988, press 1 (text 838255).
        </p>
      </div>
    );
  }

  return (
    <form className="demo" action={FORMSUBMIT} method="POST">
      <input type="hidden" name="_subject" value="SUAS site: Family intake" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_next" value="https://suasqrf.org/families?sent=1" />
      {/* Honeypot — real users never fill this */}
      <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

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

      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontWeight: 400 }}>
        <input type="checkbox" name="consent" required style={{ width: "auto", marginTop: 4 }} />
        <span>
          I understand SUAS is a support-coordination tool and <strong>not</strong> emergency care.
          In an emergency I will call 988 (press 1) or 911. <span className="req">*</span>
        </span>
      </label>

      <button className="btn btn-primary" type="submit">
        Send to SUAS
      </button>
      <p className="muted" style={{ fontSize: ".82rem" }}>
        We typically respond within a few business days. Prefer to reach out directly? Email{" "}
        <a href="mailto:jacobsilver@suasqrf.org">jacobsilver@suasqrf.org</a> · (925) 727-6109.
      </p>
    </form>
  );
}
