"use client";

import { useState } from "react";
import { submitForm } from "@/lib/submitForm";

type Status = "idle" | "submitting" | "ok" | "error";

const WAYS = [
  "In-kind free rides (rideshare / AV)",
  "Funding, sponsorship, or reimbursement",
  "Medically tailored meals / food",
  "Same-night shelter / hotel nights",
  "Volunteers / staff time",
  "Other in-kind support",
];

export default function PartnerForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot — real users never tick this.
    if (fd.get("botcheck")) {
      setStatus("ok");
      form.reset();
      return;
    }

    setStatus("submitting");
    setServerMsg("");

    const ways = fd.getAll("ways").join(", ");

    const res = await submitForm("Partner/Services interest", {
      organization: fd.get("organization"),
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      organization_type: fd.get("orgType"),
      ways_to_help: ways,
      coverage_area: fd.get("coverage"),
      message: fd.get("message"),
    });

    if (res.ok) {
      setStatus("ok");
      form.reset();
    } else {
      setStatus("error");
      setServerMsg(res.message || "");
    }
  }

  if (status === "ok") {
    return (
      <div className="form-status ok" role="status">
        <strong>Thank you — we&apos;ve received your interest in partnering.</strong>
        <p style={{ marginTop: 6 }}>
          A SUAS team member will follow up to talk through how your organization can help veterans.
          Or reach us directly at jacobsilver@suasqrf.org · (925) 727-6109.
        </p>
      </div>
    );
  }

  return (
    <form className="demo" onSubmit={onSubmit}>
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

      {/* Honeypot — a hidden checkbox autofill never ticks; bots that do are ignored */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: "none" }}
      />

      {status === "error" && serverMsg && (
        <div className="form-status err" role="alert">
          {serverMsg}
        </div>
      )}

      <button className="btn btn-primary" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Express partner interest"}
      </button>
      <p className="muted" style={{ fontSize: ".82rem" }}>
        Prefer to reach out directly? Email{" "}
        <a href="mailto:jacobsilver@suasqrf.org">jacobsilver@suasqrf.org</a> · (925) 727-6109.
      </p>
    </form>
  );
}
