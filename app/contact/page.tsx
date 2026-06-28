import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Questions about the pilot, partnerships, or the demo platform? Get in touch with SUAS.",
};

export default function ContactPage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="eyebrow">Contact</div>
          <h1>Get in touch</h1>
          <p className="lede">
            Questions about the pilot, partnerships, or the demo platform? We would like to hear from
            you.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href="mailto:jacobsilver@suasqrf.org">
              Email us
            </a>
            <a className="btn btn-ghost" href="tel:+19257276109">
              (925) 727-6109
            </a>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="panel">
            <Reveal>
              <div className="sec-label">Contact SUAS</div>
              <h2>Send a message</h2>
            </Reveal>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
