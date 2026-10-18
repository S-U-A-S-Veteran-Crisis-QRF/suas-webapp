"use client";

import { useEffect, useState } from "react";

const FORMSUBMIT = "https://formsubmit.co/info@suasqrf.org";

const WAYS = [
  "In-kind free rides (rideshare / AV)",
  "Funding, sponsorship, or reimbursement",
  "Medically tailored meals / food",
  "Emergency shelter / hotel nights",
  "Volunteers / staff time",
  "Other in-kind support",
];

export default function PartnerForm() {
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
          Thanks for your interest in partnering. Or reach us directly at jacobsilver@suasqrf.org ·
          (925) 727-6109.
        </p>
      </div>
    );
  }

  return (
    <form className="demo" action={FORMSUBMIT} method="POST">
      <input type="hidden" name="_subject" value="SUAS site: Partner interest" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_next" value="https://suasqrf.org/nonprofits?sent=1" />
      {/* Honeypot — real users never fill this */}
      <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

      <div className="field-row">
        <div>
          <label htmlFor="organization">
            Organization <span className="req">*</span>
          </label>
          <input id="organization" name="organization" required autoComplete="organization" />
        </div>
        <div>
          <label htmlFor="name">
            Your name <span className="req">*</span>
          </label>
          <input id="name" name="name" required autoComplete="name" />
        </div>
      </div>

      <div className="field-row">
        <div>
          <label htmlFor="email">
            Email <span className="req">*</span>
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div>
          <label htmlFor="phone">Phone (optional)</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>

      <div className="field-row">
        <div>
          <label htmlFor="orgType">Organization type</label>
          <select id="orgType" name="orgType" defaultValue="Rideshare / AV provider">
            <option>Rideshare / AV provider</option>
            <option>Corporate sponsor / funder</option>
            <option>Food provider</option>
            <option>Hotel / shelter</option>
            <option>Health plan / healthcare</option>
            <option>Foundation / grantmaker</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="coverage">Service area / capacity (optional)</label>
          <input id="coverage" name="coverage" placeholder="e.g. Santa Clara County; 50 rides/mo" />
        </div>
      </div>

      <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
        <legend style={{ fontWeight: 600, marginBottom: 8 }}>How you&apos;d like to help</legend>
        <div style={{ display: "grid", gap: 8 }}>
          {WAYS.map((w) => (
            <label key={w} style={{ display: "flex", gap: 10, alignItems: "center", fontWeight: 400 }}>
              <input type="checkbox" name="ways" value={w} style={{ width: "auto" }} />
              <span>{w}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message">Anything else?</label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell us how your organization would like to support veterans — in-kind rides, reimbursement, sponsorship, or more."
        />
      </div>

      <button className="btn btn-primary" type="submit">
        Express partner interest
      </button>
      <p className="muted" style={{ fontSize: ".82rem" }}>
        Prefer to reach out directly? Email{" "}
        <a href="mailto:jacobsilver@suasqrf.org">jacobsilver@suasqrf.org</a> · (925) 727-6109.
      </p>
    </form>
  );
}
