"use client";

import { useState } from "react";
import { submitForm } from "@/lib/submitForm";

type Status = "idle" | "submitting" | "ok" | "error";

export default function PilotForm() {
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

    const res = await submitForm("Pilot interest", {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      organization: fd.get("organization"),
      county: fd.get("county"),
      interested_as: fd.get("interestedAs"),
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
        <strong>Thanks — your pilot interest has been captured.</strong>
        <p style={{ marginTop: 6 }}>
          We&apos;ll follow up. Or reach us at jacobsilver@suasqrf.org · (925) 727-6109.
        </p>
      </div>
    );
  }

  return (
    <form className="demo" onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" required autoComplete="name" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" />
      </div>
      <div>
        <label htmlFor="organization">Organization</label>
        <input id="organization" name="organization" />
      </div>
      <div>
        <label htmlFor="county">County</label>
        <input id="county" name="county" placeholder="e.g. Santa Clara" />
      </div>
      <div>
        <label htmlFor="interestedAs">Interested as</label>
        <select id="interestedAs" name="interestedAs" defaultValue="Veteran">
          <option>Veteran</option>
          <option>Family Member</option>
          <option>Nonprofit</option>
          <option>County Partner</option>
          <option>Donor</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" />
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
        {status === "submitting" ? "Sending…" : "Submit pilot interest"}
      </button>
      <p className="muted" style={{ fontSize: ".82rem" }}>
        Prefer to reach out directly? Email{" "}
        <a href="mailto:jacobsilver@suasqrf.org">jacobsilver@suasqrf.org</a> · (925) 727-6109.
      </p>
    </form>
  );
}
