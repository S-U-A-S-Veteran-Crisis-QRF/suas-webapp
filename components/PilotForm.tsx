"use client";

import { useState } from "react";

export default function PilotForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="form-status ok">
        Thanks — your pilot interest has been captured. We&apos;ll follow up. Or email
        jacobsilver@suasqrf.org · (925) 727-6109.
      </div>
    );
  }

  return (
    <form className="demo" onSubmit={onSubmit}>
      <div>
        <label>Name</label>
        <input required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" required />
      </div>
      <div>
        <label>Phone</label>
        <input />
      </div>
      <div>
        <label>Organization</label>
        <input />
      </div>
      <div>
        <label>County</label>
        <input />
      </div>
      <div>
        <label>Interested as</label>
        <select>
          <option>Veteran</option>
          <option>Family Member</option>
          <option>Nonprofit</option>
          <option>County Partner</option>
          <option>Donor</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label>Message</label>
        <textarea />
      </div>
      <button className="btn btn-primary" type="submit">
        Submit pilot interest
      </button>
      <p className="muted" style={{ fontSize: ".82rem" }}>
        Demo form — connect to email/CRM before launch.
      </p>
    </form>
  );
}
