"use client";

import { useEffect, useState } from "react";

const FORMSUBMIT = "https://formsubmit.co/info@suasqrf.org";

export default function HelpForm() {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("sent") === "1") {
      setSent(true);
    }
  }, []);

  if (sent) {
    return (
      <div className="form-status ok" role="status">
        <strong>Request received — a real person will call you back.</strong>
        <p style={{ marginTop: 6 }}>
          We respond in hours, not days — including overnight. If you are in immediate danger or
          thinking about harming yourself, call the Veterans Crisis Line now: 988, press 1 (text
          838255), or call 911.
        </p>
      </div>
    );
  }

  return (
    <form className="demo" action={FORMSUBMIT} method="POST">
      <input type="hidden" name="_subject" value="SUAS site: HELP REQUEST" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_next" value="https://suasqrf.org/help?sent=1" />
      {/* Honeypot — real users never fill this */}
      <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

      <div>
        <label htmlFor="help-name">Your name</label>
        <input id="help-name" name="name" required autoComplete="name" />
      </div>
      <div>
        <label htmlFor="help-phone">Phone — so we can call you back</label>
        <input id="help-phone" name="phone" type="tel" required autoComplete="tel" />
      </div>
      <div>
        <label htmlFor="help-need">What do you need tonight?</label>
        <select id="help-need" name="need" required defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          <option value="ride">A ride to safety</option>
          <option value="meal">A hot meal</option>
          <option value="shelter">A safe bed tonight</option>
          <option value="talk">Someone to talk to</option>
          <option value="other">Something else</option>
        </select>
      </div>
      <div>
        <label htmlFor="help-city">City you&apos;re in</label>
        <input id="help-city" name="city" autoComplete="address-level2" placeholder="e.g. San Jose" />
      </div>
      <div>
        <label htmlFor="help-notes">Anything we should know? (optional)</label>
        <textarea id="help-notes" name="notes" />
      </div>

      <button className="btn btn-primary" type="submit">
        Request a callback
      </button>
      <p className="muted" style={{ fontSize: ".82rem" }}>
        Free for veterans in Santa Clara County. We never sell or share your information.
      </p>
    </form>
  );
}
