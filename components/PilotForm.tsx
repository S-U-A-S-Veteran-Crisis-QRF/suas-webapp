"use client";

import { useEffect, useState } from "react";

const FORMSUBMIT = "https://formsubmit.co/info@suasqrf.org";

export default function PilotForm() {
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
          Thanks for your pilot interest. Or reach us at jacobsilver@suasqrf.org · (925) 727-6109.
        </p>
      </div>
    );
  }

  return (
    <form className="demo" action={FORMSUBMIT} method="POST">
      <input type="hidden" name="_subject" value="SUAS site: Pilot interest" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_next" value="https://suasqrf.org/pilot?sent=1" />
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

      <button className="btn btn-primary" type="submit">
        Submit pilot interest
      </button>
      <p className="muted" style={{ fontSize: ".82rem" }}>
        Prefer to reach out directly? Email{" "}
        <a href="mailto:jacobsilver@suasqrf.org">jacobsilver@suasqrf.org</a> · (925) 727-6109.
      </p>
    </form>
  );
}
