"use client";

import { useState } from "react";
import { submitForm } from "@/lib/submitForm";

type Status = "idle" | "submitting" | "ok" | "error";

export default function ContactForm() {
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

    const res = await submitForm("Contact", {
      name: fd.get("name"),
      email: fd.get("email"),
      role: fd.get("role"),
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
        <strong>Thanks — your message reached us.</strong>
        <p style={{ marginTop: 6 }}>
          We&apos;ll follow up soon. If this is an urgent safety concern, call the Veterans Crisis
          Line now: <a href="tel:988">988, press 1</a> (text <a href="sms:838255">838255</a>).
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
        <label htmlFor="role">Role</label>
        <input id="role" name="role" placeholder="e.g. veteran, family, nonprofit, county, donor" />
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required />
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
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
      <p className="muted" style={{ fontSize: ".82rem" }}>
        Prefer to reach out directly? Email{" "}
        <a href="mailto:jacobsilver@suasqrf.org">jacobsilver@suasqrf.org</a> · (925) 727-6109.
      </p>
    </form>
  );
}
