"use client";

import { useState } from "react";
import { submitForm } from "@/lib/submitForm";

type Status = "idle" | "submitting" | "ok" | "error";

export default function FamilyIntakeForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState<string>("");

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

    if (!fd.get("consent")) {
      setStatus("error");
      setServerMsg("Please confirm you understand SUAS is not emergency care.");
      return;
    }

    const res = await submitForm("Family intake", {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      relationship: fd.get("relationship"),
      county: fd.get("county"),
      contact_preference: fd.get("contactPref"),
      message: fd.get("message"),
      consent_acknowledged: fd.get("consent") ? "yes" : "no",
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
        <strong>Thank you — your message reached us.</strong>
        <p style={{ marginTop: 6 }}>
          A SUAS team member will follow up using your preferred contact method. If this is an
          urgent safety concern, call the Veterans Crisis Line now: <a href="tel:988">988, press 1</a>{" "}
          (text <a href="sms:838255">838255</a>).
        </p>
      </div>
    );
  }

  return (
    <form className="demo" onSubmit={onSubmit}>
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

      {/* Honeypot — a hidden checkbox autofill never ticks; bots that do are ignored */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: "none" }}
      />

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
