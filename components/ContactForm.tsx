"use client";

import { useEffect, useState } from "react";

const FORMSUBMIT = "https://formsubmit.co/jacobsilver@suasqrf.org";

export default function ContactForm() {
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
          Thanks for reaching out. If this is an urgent safety concern, call the Veterans Crisis
          Line now: 988, press 1 (text 838255).
        </p>
      </div>
    );
  }

  return (
    <form className="demo" action={FORMSUBMIT} method="POST">
      <input type="hidden" name="_subject" value="SUAS site: Contact form" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_next" value="https://suasqrf.org/contact?sent=1" />
      {/* Honeypot — real users never fill this */}
      <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

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

      <button className="btn btn-primary" type="submit">
        Send message
      </button>
      <p className="muted" style={{ fontSize: ".82rem" }}>
        Prefer to reach out directly? Email{" "}
        <a href="mailto:jacobsilver@suasqrf.org">jacobsilver@suasqrf.org</a> ·{" "}
        <a href="tel:+19257276109">(925) 727-6109</a>.
      </p>
    </form>
  );
}
