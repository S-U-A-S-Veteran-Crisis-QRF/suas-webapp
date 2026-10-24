import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Programs & Services",
  description:
    "What S.U.A.S. Veteran Crisis Q.R.F. does for veterans in Santa Clara County: peer-bridge crisis response, free community events, direct service referral, and the QRF app in development.",
};

export default function ProgramsPage() {
  return (
    <>
      <section className="hero-image">
        <div className="hero-bg">
          <Image
            src="/images/presence.webp"
            alt="Two people sitting together in conversation"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="hero-overlay" />
        <div className="container">
          <div className="eyebrow">Programs &amp; services</div>
          <h1>What SUAS does</h1>
          <p className="lede">
            Peer-bridge crisis support for veterans in Santa Clara County, California: a fellow
            veteran who shows up, a ride, a meal, a safe bed for the night, and a warm hand-off to
            the services that can carry the rest.
          </p>
          <div className="cta-row">
            <Link className="btn btn-primary" href="/contact">
              Get in touch
            </Link>
            <Link className="btn btn-ghost" href="/donate">
              Support the work
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <div className="sec-label">Who we serve</div>
            <h2>Veterans who are slipping, before they fall</h2>
            <p className="lead">
              SUAS serves veterans of every branch and era in Santa Clara County, along with the
              families and friends who are trying to help them. Most of the people we reach are not
              in a 911 emergency. They are isolated, behind on a bill, sleeping in a car, waiting
              weeks for an appointment, or simply not answering the phone. That is the gap we work
              in: the days and weeks between &ldquo;something is wrong&rdquo; and &ldquo;help has
              started.&rdquo;
            </p>
          </Reveal>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <Reveal>
            <div className="sec-label">Core programs</div>
            <h2>Four ways we show up</h2>
          </Reveal>
          <div className="grid cols-2">
            <Reveal className="card lift">
              <h3>Peer-bridge crisis response</h3>
              <p>
                When a veteran or a family member reaches out, a fellow veteran responds, in person
                where possible. The responder stays with the person through the immediate need and
                the follow-up, so nobody is handed a phone number and left alone. Our mobile peer
                response is available around the clock, every day of the year, within the limits of
                a volunteer team.
              </p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Free ride, free food, emergency shelter</h3>
              <p>
                The three things a veteran in trouble most often needs tonight. We pay for a ride to
                safety or to an appointment, put a hot meal in their hands, and cover a safe bed for
                the night when the alternative is the street. Donations fund these directly: about
                $20 for a ride, $25 for a meal, $120 for a bed.
              </p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Direct service referral</h3>
              <p>
                We walk veterans into the systems built to serve them instead of pointing at a
                website: VA health care and benefits, county veterans services, housing and food
                programs, legal aid, and treatment. We make the call with them, go to the first
                appointment when it helps, and check back until the service has actually started.
              </p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Free community events</h3>
              <p>
                Isolation is the common thread in nearly every veteran crisis we see, so we run free
                gatherings that give veterans a reason to leave the house and a room full of people
                who understand them. In August 2026 we hosted the Veterans Innovation Hackathon at
                Hacker Dojo in Mountain View, where veterans and engineers built tools for veteran
                support over three days.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <div className="sec-label">In development</div>
            <h2>The QRF app: one tap between a veteran and help</h2>
            <p className="lead">
              We are building a crisis-response app so that a veteran in trouble answers one
              question, &ldquo;What do you need?&rdquo;, and taps once. Behind that tap a peer
              responder gets moving with a ride, a meal, or a bed, and the trusted people the veteran
              has chosen are kept in the loop. The app is in development and pilot planning; it is
              not yet a live service, and it is never a substitute for 911 or the Veterans Crisis
              Line.
            </p>
            <div className="cta-row">
              <Link className="btn btn-primary" href="/app">
                See the demo
              </Link>
              <Link className="btn btn-ghost" href="/pilot">
                Join the pilot
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <div className="sec-label">How to get help</div>
            <h2>Reach us</h2>
            <p className="lead">
              If you are a veteran in Santa Clara County, or you are worried about one, email{" "}
              <a href="mailto:jacobsilver@suasqrf.org">jacobsilver@suasqrf.org</a>, call or text{" "}
              <a href="tel:+19257276109">(925) 727-6109</a>, or use the{" "}
              <Link href="/contact">contact form</Link>. If anyone is in immediate danger, call 911.
              Veterans in crisis can reach the Veterans Crisis Line any time at 988 (press 1) or by
              texting 838255.
            </p>
          </Reveal>
          <p className="note">
            SUAS is peer support and care coordination. We are not a medical, mental-health, or
            emergency provider, and we do not diagnose or treat. See our{" "}
            <Link href="/safety">Safety page</Link> for the boundaries we work inside.
          </p>
        </div>
      </section>
    </>
  );
}
