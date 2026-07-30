"use client";

import { useState } from "react";
import { submitForm } from "@/lib/submitForm";

type Status = "idle" | "submitting" | "ok" | "error";

export default function HackathonForm() {
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

    const res = await submitForm("Hackathon interest", {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      organization: fd.get("organization"),
      involved_as: fd.get("involvedAs"),
      skills: fd.get("skills"),
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
        <strong>Thanks — we have your hackathon interest.</strong>
        <p style={{ marginTop: 6 }}>
          We&apos;ll follow up with details. Registration also runs through Luma at{" "}
          <a href="https://luma.com/Innovation4Veterans" target="_blank" rel="noopener noreferrer">
            luma.com/Innovation4Veterans
          </a>
          . Or reach us at jacobsilver@suasqrf.org · (925) 727-6109.
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
        <label htmlFor="organization">Organization or company</label>
        <input id="organization" name="organization" autoComplete="organization" />
      </div>
      <div>
        <label htmlFor="involvedAs">I want to get involved as</label>
        <select id="involvedAs" name="involvedAs" defaultValue="Participant — engineer or developer">
          <option>Participant — engineer or developer</option>
          <option>Participant — designer</option>
          <option>Participant — product, PM, or business</option>
          <option>Veteran sharing lived experience</option>
          <option>Veteran in tech (building and advising)</option>
          <option>Mentor or Demo Day judge</option>
          <option>Nonprofit or veteran service partner</option>
          <option>Sponsor (funding, credits, equipment, or people)</option>
          <option>Volunteer</option>
          <option>Student</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="skills">Skills or focus areas</label>
        <input id="skills" name="skills" placeholder="e.g. React, hardware, UX, benefits navigation" />
      </div>
      <div>
        <label htmlFor="message">Anything else</label>
        <textarea
          id="message"
          name="message"
          placeholder="Ideas you want to build, problems you've seen, or how your team could support the event."
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
        {status === "submitting" ? "Sending…" : "Send hackathon interest"}
      </button>
      <p className="muted" style={{ fontSize: ".82rem" }}>
        Prefer to reach out directly? Email{" "}
        <a href="mailto:jacobsilver@suasqrf.org">jacobsilver@suasqrf.org</a> · (925) 727-6109.
      </p>
    </form>
  );
}
