"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="form-status ok">
        Thanks — your message has been captured. We&apos;ll follow up. Or email
        jacobsilver@suasqrf.org · (925) 727-6109.
      </div>
    );
  }

  return (
    <form className="demo" onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="role">Role</label>
        <input id="role" value={role} onChange={(e) => setRole(e.target.value)} />
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Send message
      </button>
      <p className="muted" style={{ fontSize: ".82rem" }}>
        Demo form — connect to email/CRM before launch. Or email{" "}
        <a href="mailto:jacobsilver@suasqrf.org">jacobsilver@suasqrf.org</a> · (925) 727-6109.
      </p>
    </form>
  );
}
