import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";

const GOFUNDME_URL = "https://gofund.me/62aa802f0";
const PAYPAL_URL = "https://www.paypal.com/US/fundraiser/charity/4819148";

const donateTitle = "Donate — SUAS Veteran Crisis Q.R.F.";
const donateDescription =
  "When a veteran calls at 2 a.m., your gift is what shows up. Give money, a vehicle, or property — including homes and land that become recovery housing for combat veterans. SUAS is a 501(c)(3) nonprofit (EIN 88-3249428).";

export const metadata: Metadata = {
  title: "Donate",
  description: donateDescription,
  openGraph: {
    title: donateTitle,
    description: donateDescription,
    type: "website",
    siteName: "SUAS Veteran Crisis Q.R.F.",
    url: "/donate",
    locale: "en_US",
    images: [
      {
        url: "/images/donate-meal-line.jpg",
        width: 1023,
        height: 731,
        alt: "Volunteers serving a hot meal line",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: donateTitle,
    description: donateDescription,
    images: ["/images/donate-meal-line.jpg"],
  },
};

const widgetCss = `
.donate-widget .freq-input { position: absolute; opacity: 0; pointer-events: none; }
.donate-widget .seg { display: inline-flex; background: #e9eef5; border-radius: 999px; padding: 4px; gap: 4px; }
.donate-widget .seg label { padding: 10px 22px; border-radius: 999px; cursor: pointer; font-weight: 700; color: #33475f; }
.donate-widget .seg label .most { display: inline-block; margin-left: 8px; font-size: 12px; font-weight: 700; background: #e8f3e4; color: #2c7a2c; border-radius: 999px; padding: 2px 10px; vertical-align: middle; }
.donate-widget #freq-once:checked ~ .segwrap .seg .lab-once,
.donate-widget #freq-mo:checked ~ .segwrap .seg .lab-mo { background: #1C59B5; color: #fff; }
.donate-widget #freq-mo:checked ~ .segwrap .seg .lab-mo .most { background: rgba(255,255,255,.22); color: #fff; }
.donate-widget .permo { display: none; }
.donate-widget #freq-mo:checked ~ .tiers .permo { display: inline; }
.donate-widget .note-mo { display: none; }
.donate-widget #freq-mo:checked ~ .note-mo { display: block; }
.donate-widget .tiers { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 20px; }
@media (max-width: 720px) { .donate-widget .tiers { grid-template-columns: 1fr; } }
.donate-widget .tier { display: block; border: 2px solid #dbe4f0; border-radius: 14px; padding: 20px; text-decoration: none; color: inherit; background: #fff; transition: border-color .15s, transform .15s; }
.donate-widget .tier:hover { border-color: #1C59B5; transform: translateY(-2px); }
.donate-widget .tier strong { display: block; font-size: 30px; color: #1C59B5; }
.donate-widget .tier span { display: block; margin-top: 6px; color: #33475f; }
.faq details { border: 1px solid #dbe4f0; border-radius: 12px; padding: 16px 20px; margin-bottom: 12px; background: #fff; }
.faq summary { font-weight: 700; cursor: pointer; color: #16345f; }
.faq details p { margin: 10px 0 4px; color: #33475f; }
.donate-form label { display: block; font-weight: 600; margin: 14px 0 6px; color: #16345f; }
.donate-form input, .donate-form select, .donate-form textarea { width: 100%; padding: 12px; border: 1px solid #c4d0e0; border-radius: 10px; font-size: 16px; }
.donate-form textarea { min-height: 110px; }
.figure { margin: 0; }
.figure img { border-radius: 14px; box-shadow: 0 10px 30px rgba(20,40,80,.18); }
.figure figcaption { margin-top: 10px; color: #5a6b82; font-size: 15px; }
.chip { display: inline-block; background: #fff3d6; color: #8a6d1a; font-weight: 700; font-size: 13px; border-radius: 999px; padding: 4px 12px; margin-bottom: 10px; }
.split { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: center; }
@media (max-width: 860px) { .split { grid-template-columns: 1fr; } }
`;

export default function DonatePage() {
  return (
    <>
      <style>{widgetCss}</style>

      {/* HERO */}
      <section className="hero-image">
        <div className="hero-bg">
          <Image
            src="/images/donate-meal-line.jpg"
            alt="Volunteers serving a hot meal line"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="hero-overlay" />
        <div className="container">
          <div className="eyebrow">Give to SUAS QRF</div>
          <h1>When a veteran calls at 2 a.m., your gift is what shows up.</h1>
          <p className="lede">
            A hot meal. A ride to safety. A bed instead of the street — and a fellow veteran who
            stays on the line. Give money, or give something bigger: a home, a building, or land
            that becomes a place where combat veterans recover.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href={GOFUNDME_URL} target="_blank" rel="noopener noreferrer">
              Donate on GoFundMe
            </a>
            <a className="btn btn-ghost" href={PAYPAL_URL} target="_blank" rel="noopener noreferrer">
              Donate with PayPal
            </a>
          </div>
        </div>
      </section>

      {/* WHAT WE'RE BUILDING */}
      <section>
        <div className="container">
          <Reveal>
            <div className="eyebrow">The mission</div>
            <h2>What we&apos;re building: one tap between a veteran and help</h2>
            <p className="lead">
              We&apos;re building the SUAS QRF app — a crisis-response app that puts the whole
              response on one screen. A veteran in trouble doesn&apos;t fill out a form or sit on
              hold. They answer one question — &ldquo;What do you need?&rdquo; — and tap. Behind
              that tap, a peer responder gets moving with a ride, a meal, or a safe bed.
            </p>
          </Reveal>
          <div className="split" style={{ marginTop: 28 }}>
            <Reveal>
              <figure className="figure">
                <span className="chip">In development</span>
                <Image
                  src="/images/donate-app-home.jpg"
                  alt="SUAS QRF app home screen with Free Ride, Free Food, and Emergency Shelter options"
                  width={1080}
                  height={1920}
                  style={{ width: "100%", maxWidth: 340, height: "auto" }}
                />
                <figcaption>
                  The app home screen, as it stands in development — one question, three taps, help
                  on the way.
                </figcaption>
              </figure>
            </Reveal>
            <div>
              <div className="grid cols-3" style={{ gridTemplateColumns: "1fr" }}>
                <Reveal className="card lift">
                  <h3>Free Ride</h3>
                  <p>
                    A crisis ride to safety, coordinated the moment it&apos;s tapped — a connection to a
                    fellow veteran, not a stranger and a fare.
                  </p>
                </Reveal>
                <Reveal className="card lift">
                  <h3>Free Food</h3>
                  <p>
                    A hot meal brought to the veteran — comfort in their hands, not a voucher and a
                    bus ride across town.
                  </p>
                </Reveal>
                <Reveal className="card lift">
                  <h3>Emergency Shelter</h3>
                  <p>
                    A safe bed for the night, no payment needed — and a peer who checks in the next
                    morning.
                  </p>
                </Reveal>
              </div>
              <Reveal>
                <p style={{ marginTop: 20 }}>
                  <strong>Your gift builds it — and funds what&apos;s behind it.</strong> Donations
                  pay for the app&apos;s development and for the field operations every tap will
                  set in motion: the $20 ride, the $25 meal, the $120 bed. The app is being built
                  now, not finished.
                </p>
                <div className="cta-row" style={{ marginTop: 16 }}>
                  <a className="btn btn-primary" href="#give-money">
                    Fund the build
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* WHY WE SERVE */}
      <section>
        <div className="container">
          <div className="split">
            <Reveal>
              <figure className="figure">
                <Image
                  src="/images/donate-raider-bell.jpg"
                  alt="The Raider Bell memorial"
                  width={1200}
                  height={1600}
                  style={{ width: "100%", height: "auto" }}
                />
                <figcaption>
                  The Raider Bell — its plaque calls it a symbol of resilience, trust, and
                  perseverance.
                </figcaption>
              </figure>
            </Reveal>
            <Reveal>
              <div className="eyebrow">Why we serve</div>
              <h2>Resilience, trust, perseverance</h2>
              <p>
                The Raider Bell hangs as a memorial to Marines and Sailors — and to what carries
                people through the worst nights of their lives: resilience, trust, and perseverance.
                Those aren&apos;t words on a plaque to us. They&apos;re the job description.
              </p>
              <p>
                SUAS QRF is veteran-led. When a veteran in crisis reaches out, the person who
                answers has stood where they&apos;re standing — and stays: through the ride, the
                meal, the first night off the street, and the weeks of waiting until real treatment
                opens up. Nobody gets handed off. Nobody gets left.
              </p>
              <p>
                <em>
                  Semper Fidelis — always faithful. Spiritus Invictus — unconquered spirit.
                </em>{" "}
                That&apos;s the standard your gift is held to.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHAT COMFORT MEANS */}
      <section>
        <div className="container">
          <div className="split">
            <Reveal>
              <div className="eyebrow">The story of comfort</div>
              <h2>What comfort actually means</h2>
              <p>
                Comfort sounds small until you&apos;re the one out there at 2 a.m. Then it has a
                shape: a hot meal in your hands, a safe bed instead of concrete, a ride that comes
                when it&apos;s promised — and a voice on the line that doesn&apos;t hang up.
              </p>
              <p>
                Every candle in this picture was lit by somebody who refused to forget. That&apos;s
                what a gift here is: a refusal to forget the veteran still waiting — for a bed, for
                a ride, for one person to show up. Your giving is how the showing up happens.
              </p>
            </Reveal>
            <Reveal>
              <figure className="figure">
                <Image
                  src="/images/donate-vigil.jpg"
                  alt="Votive candles lit in remembrance"
                  width={1200}
                  height={1600}
                  style={{ width: "100%", height: "auto" }}
                />
                <figcaption>
                  Lit for the ones still out there — and in memory of the ones who didn&apos;t make
                  it home.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* GIVE MONEY */}
      <section id="give-money">
        <div className="container">
          <Reveal>
            <div className="eyebrow">Give money</div>
            <h2>Give money — tonight, or every month</h2>
            <p className="lead">
              Pick an amount and how often. Every tier is a real thing a veteran gets: a meal, a
              safe bed, or the whole bundle.
            </p>
          </Reveal>
          <Reveal>
            <div className="donate-widget">
              <input id="freq-once" className="freq-input" type="radio" name="freq" />
              <input id="freq-mo" className="freq-input" type="radio" name="freq" defaultChecked />
              <div className="segwrap">
                <div className="seg" role="group" aria-label="Gift frequency">
                  <label htmlFor="freq-once" className="lab-once">
                    One-time
                  </label>
                  <label htmlFor="freq-mo" className="lab-mo">
                    Monthly <span className="most">Most impact</span>
                  </label>
                </div>
              </div>
              <p className="note note-mo" style={{ marginTop: 12 }}>
                Monthly gifts keep the QRF ready — the ride, the meal, and the bed are
                funded before the call even comes in.
              </p>
              <div className="tiers">
                <a className="tier" href={GOFUNDME_URL} target="_blank" rel="noopener noreferrer">
                  <strong>
                    $25<span className="permo">/mo</span>
                  </strong>
                  <span>Puts a hot meal in a veteran&apos;s hands tonight</span>
                </a>
                <a className="tier" href={GOFUNDME_URL} target="_blank" rel="noopener noreferrer">
                  <strong>
                    $120<span className="permo">/mo</span>
                  </strong>
                  <span>Gets a veteran a safe bed instead of the street</span>
                </a>
                <a className="tier" href={GOFUNDME_URL} target="_blank" rel="noopener noreferrer">
                  <strong>
                    $165<span className="permo">/mo</span>
                  </strong>
                  <span>Covers the full bundle — meal, ride, bed, and a peer check-in</span>
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <p className="note" style={{ marginTop: 12 }}>
              Donations are processed securely by GoFundMe and PayPal Giving Fund. We never store
              your card details.
            </p>
            <p className="note" style={{ marginTop: 16 }}>
              Amounts reflect SUAS QRF&apos;s own per-unit service costs. Larger gifts — and gifts
              of property — stretch across many nights and many veterans.
            </p>
            <p style={{ marginTop: 12, fontWeight: 700 }}>
              $1,550 raised from 8 donors on GoFundMe — join them.
            </p>
            <div className="cta-row" style={{ marginTop: 12 }}>
              <a className="btn btn-primary" href={GOFUNDME_URL} target="_blank" rel="noopener noreferrer">
                Donate on GoFundMe
              </a>
              <a className="btn btn-ghost" href={PAYPAL_URL} target="_blank" rel="noopener noreferrer">
                Donate with PayPal
              </a>
            </div>
            <p className="note" style={{ marginTop: 12 }}>
              Tax-deductible · 501(c)(3) nonprofit · EIN 88-3249428 ·{" "}
              <a href="/docs/IRS-Determination-Letter.pdf" target="_blank" rel="noopener noreferrer">
                IRS determination letter (PDF)
              </a>
            </p>
            <p className="note" style={{ marginTop: 8 }}>
              Giving property, a vehicle, or goods instead — or want to talk first? Use the donation
              form below. It starts a conversation, no obligation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* EVERY KIND OF GIFT */}
      <section id="gift-types">
        <div className="container">
          <Reveal>
            <div className="eyebrow">Ways to give</div>
            <h2>Every kind of gift becomes comfort</h2>
            <p className="lead">
              Money keeps the response running tonight. Property builds the place veterans recover
              tomorrow. Vehicles and goods put both within reach. One form below starts any of them.
            </p>
          </Reveal>
          <div className="grid cols-3">
            <Reveal className="card lift">
              <h3>Money</h3>
              <p>
                One-time or monthly, on GoFundMe or through the PayPal Giving Fund. Even $20 moves a
                veteran off the street and into a car with a peer responder beside them.
              </p>
              <p>
                <a href={GOFUNDME_URL} target="_blank" rel="noopener noreferrer">
                  Give money →
                </a>
              </p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Recovery housing</h3>
              <p>
                <strong>A home, building, or land.</strong> Donated property becomes recovery housing
                for combat veterans — sober living, group rehab for CPTSD/PTSD, or a quiet place to
                decompress. It&apos;s the largest gift a supporter can make, and it keeps giving for
                decades.
              </p>
              <p>
                <a href="#property">See how property gifts work →</a>
              </p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Vehicles &amp; goods</h3>
              <p>
                A running car or truck becomes a crisis-response vehicle. Furniture, appliances, and
                equipment outfit the homes veterans recover in. If it can help a veteran, ask us
                before you sell or scrap it.
              </p>
              <p>
                <a href="#donation-form">Give a vehicle or goods →</a>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROPERTY */}
      <section id="property">
        <div className="container">
          <Reveal>
            <div className="eyebrow">Property gifts</div>
            <h2>Your donated home or land becomes a place where combat veterans recover.</h2>
            <p className="lead">
              A crisis ride ends the emergency. Recovery housing ends the cycle. When you donate a
              house, a building, or a piece of land to SUAS QRF, it doesn&apos;t sit in a portfolio
              — it becomes a home where veterans heal, run by people who have worn the uniform
              themselves.
            </p>
          </Reveal>
          <Reveal>
            <figure className="figure" style={{ marginTop: 24 }}>
              <Image
                src="/images/donate-recovery-home.jpg"
                alt="A welcoming home that could become veteran recovery housing"
                width={1024}
                height={1024}
                style={{ width: "100%", maxWidth: 720, height: "auto" }}
              />
            </figure>
          </Reveal>
          <Reveal>
            <p style={{ marginTop: 20 }}>
              <strong>Here&apos;s the gap a donated home fills first:</strong> getting into rehab at
              the Palo Alto VA can take two to six weeks — and a veteran who has finally said
              &ldquo;yes, I&apos;ll go&rdquo; can&apos;t spend those weeks on the street and still
              make it. A donated home is the landing pad: a safe, sober bed where they wait with
              peers watching out for them, until the VA bed opens and we get them through that door.
            </p>
            <p>
              Inheriting a house you can&apos;t keep? Holding land with no plan for it? Downsizing,
              settling an estate, or holding a building that&apos;s more burden than asset? A
              property gift can turn that weight into the place a veteran finally gets to breathe.
            </p>
          </Reveal>
          <div className="grid cols-4" style={{ marginTop: 24 }}>
            <Reveal className="card lift">
              <h3>Sober Living Environments</h3>
              <p>
                Donated homes become SLEs — stable, substance-free houses where veterans in recovery
                live alongside peers who hold each other accountable, with structure, house rules,
                and a roof that doesn&apos;t disappear mid-recovery.
              </p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Group Rehab for CPTSD / PTSD</h3>
              <p>
                Residential space for small-group recovery work — room for combat veterans to do the
                hard work of healing together, guided by peers and connected to clinical care, away
                from the environments that keep wounds open.
              </p>
            </Reveal>
            <Reveal className="card lift">
              <h3>Decompression Space</h3>
              <p>
                Not every veteran needs a program — some need quiet before crisis hits. A donated
                home or rural parcel becomes a safe place to land, breathe, and reset: a porch, a
                bed, and nobody asking anything of them for a while.
              </p>
            </Reveal>
            <Reveal className="card lift">
              <h3>The Landing — Until a VA Bed Opens</h3>
              <p>
                It can take two to six weeks for a rehab bed to open at the Palo Alto VA. A veteran
                who has agreed to treatment shouldn&apos;t have to survive the street in the
                meantime — that&apos;s when people are lost. A donated home is where they land:
                sober, fed, and looked after by peers who keep them steady and get them to that bed
                the day it opens.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <h2 style={{ marginTop: 40 }}>How a property gift works</h2>
          </Reveal>
          <div className="grid cols-4">
            <Reveal className="card lift">
              <h3>1 · Conversation</h3>
              <p>
                Start with the form below or a phone call. Tell us what you have and what
                you&apos;d like it to become. No obligation, no pressure.
              </p>
            </Reveal>
            <Reveal className="card lift">
              <h3>2 · Walk-through &amp; review</h3>
              <p>
                We visit the property and review title, liens, condition, and carrying costs with
                you — and how it could serve recovery housing.
              </p>
            </Reveal>
            <Reveal className="card lift">
              <h3>3 · Board review</h3>
              <p>
                Our board reviews every property gift before acceptance, so both sides know exactly
                what the property will be used for.
              </p>
            </Reveal>
            <Reveal className="card lift">
              <h3>4 · Transfer &amp; thanks</h3>
              <p>
                The deed transfers, you receive your IRS acknowledgment letter — and a standing
                invitation to see what your property became.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <div className="card" style={{ marginTop: 24 }}>
              <h3>Straight with you</h3>
              <p>
                Not every property can be accepted — heavy liens, environmental problems, or carrying
                costs beyond our means can make a gift unworkable, and if a property truly can&apos;t
                serve veterans, selling it may fund more recovery than keeping it. Either way, the
                review is free, honest, and comes with no obligation. If a donated property is sold
                within three years, we file IRS Form 8282 as the law requires.
              </p>
              <div className="cta-row" style={{ marginTop: 12 }}>
                <a className="btn btn-primary" href="#donation-form">
                  Talk to us about your property
                </a>
                <a className="btn btn-ghost" href="mailto:jacobsilver@suasqrf.org">
                  jacobsilver@suasqrf.org
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DONATION FORM */}
      <section id="donation-form">
        <div className="container">
          <Reveal>
            <div className="eyebrow">Get in touch</div>
            <h2>Start a donation conversation</h2>
            <p className="lead">
              Tell us what you&apos;d like to give — money, a home, a building, land, a vehicle, or
              anything else. Sending opens a pre-addressed email to our team in your own mail app,
              so you keep a copy of everything.
            </p>
          </Reveal>
          <Reveal>
            <form
              className="donate-form card"
              style={{ maxWidth: 720 }}
              action="mailto:jacobsilver@suasqrf.org?subject=Donation%20inquiry%20%E2%80%94%20SUAS%20QRF"
              method="post"
              encType="text/plain"
            >
              <label htmlFor="df-name">Your name</label>
              <input id="df-name" name="Name" type="text" required autoComplete="name" />
              <label htmlFor="df-email">Email</label>
              <input id="df-email" name="Email" type="email" required autoComplete="email" />
              <label htmlFor="df-phone">Phone (optional)</label>
              <input id="df-phone" name="Phone" type="tel" autoComplete="tel" />
              <label htmlFor="df-type">What would you like to give?</label>
              <select id="df-type" name="Gift type">
                <option>Money</option>
                <option>A home / residential property</option>
                <option>A commercial building</option>
                <option>Land</option>
                <option>A vehicle</option>
                <option>Goods or equipment</option>
                <option>Something else / not sure yet</option>
              </select>
              <label htmlFor="df-amount">Amount (optional)</label>
              <input id="df-amount" name="Amount" type="text" placeholder="e.g. 165, or monthly $50" />
              <label htmlFor="df-location">Property location (city &amp; state)</label>
              <input id="df-location" name="Property location" type="text" placeholder="e.g. San Jose, CA" />
              <label htmlFor="df-value">Estimated value (optional)</label>
              <input id="df-value" name="Estimated value" type="text" placeholder="e.g. around $400k, or 'not sure yet'" />
              <label htmlFor="df-timeline">Timeline</label>
              <select id="df-timeline" name="Timeline">
                <option>As soon as possible</option>
                <option>In the next few months</option>
                <option>Estate / future gift</option>
                <option>Just exploring</option>
              </select>
              <label htmlFor="df-notes">Anything we should know? (optional)</label>
              <textarea id="df-notes" name="Notes" />
              <div className="cta-row" style={{ marginTop: 20 }}>
                <button className="btn btn-primary" type="submit">
                  Send donation inquiry
                </button>
              </div>
              <p className="note" style={{ marginTop: 12 }}>
                This opens your email app with the details addressed to our team — nothing is sent
                until you hit send.
              </p>
            </form>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="container">
          <Reveal>
            <div className="eyebrow">FAQ</div>
            <h2>Questions donors ask</h2>
          </Reveal>
          <Reveal className="faq" style={{ maxWidth: 800 }}>
            <details>
              <summary>Is my donation tax-deductible?</summary>
              <p>
                Yes. SUAS QRF (legal name: S.U.A.S. Veteran Crisis QRF) is an IRS-recognized
                501(c)(3) nonprofit, EIN 88-3249428. Cash and non-cash gifts are deductible to the
                extent allowed by law, and you&apos;ll receive a written acknowledgment for your
                records. Property gifts over $5,000 generally need a qualified appraisal — talk with
                your tax advisor about your specific situation.
              </p>
            </details>
            <details>
              <summary>What kinds of property can you accept?</summary>
              <p>
                Houses, residential buildings, commercial buildings, and land — in any condition
                worth reviewing. The best fits become recovery housing: sober living environments,
                small residential rehab settings, or decompression space for combat veterans. Every
                property goes through a free review of title, liens, condition, and carrying costs
                before our board accepts it.
              </p>
            </details>
            <details>
              <summary>What happens to a veteran waiting for a VA rehab bed?</summary>
              <p>
                Rehab placement at the Palo Alto VA can take two to six weeks, and that wait is
                where too many veterans fall back to the street and never make it in. Donated homes
                are our answer: a landing place where a veteran stays sober, safe, and supported by
                peers until the VA bed opens — then we make sure they get there. Your property
                doesn&apos;t just house veterans; it holds the ones who are this close to treatment
                until treatment is ready for them.
              </p>
            </details>
            <details>
              <summary>The property has a mortgage, liens, or tenants. Can I still donate it?</summary>
              <p>
                Often, yes — but it depends on the numbers, which is exactly what the review is for.
                Tell us honestly what you know in the form above; there may be options like donating
                partial equity or timing the gift around a sale. If it turns out we can&apos;t accept
                it, we&apos;ll tell you plainly and, where we can, suggest who might.
              </p>
            </details>
            <details>
              <summary>What if my property doesn&apos;t fit recovery housing?</summary>
              <p>
                With your agreement, we can accept and sell it, putting the full proceeds into the
                crisis-response work — meals, rides, and shelter nights — or into preparing another
                property for veterans. Nothing is sold quietly: you&apos;ll know the plan before
                anything is signed.
              </p>
            </details>
            <details>
              <summary>Can I leave property to SUAS QRF in my will?</summary>
              <p>
                Yes — bequests of homes, land, and other assets are welcome, and the
                &ldquo;Estate / future gift&rdquo; option in the form starts that conversation. Your
                attorney can name S.U.A.S. Veteran Crisis QRF, EIN 88-3249428, as a beneficiary.
                We&apos;re glad to talk through what you&apos;d like your gift to become.
              </p>
            </details>
            <details>
              <summary>How do I give money right now, without the form?</summary>
              <p>
                Right now, on our{" "}
                <a href={GOFUNDME_URL} target="_blank" rel="noopener noreferrer">
                  GoFundMe page
                </a>{" "}
                or through the{" "}
                <a href={PAYPAL_URL} target="_blank" rel="noopener noreferrer">
                  PayPal Giving Fund
                </a>{" "}
                — one-time or monthly — or by check payable to &ldquo;S.U.A.S. Veteran Crisis
                QRF&rdquo; (email us and we&apos;ll share the mailing details). The form is simply
                the fastest way to tell us about a larger gift or anything that isn&apos;t cash.
              </p>
            </details>
          </Reveal>
        </div>
      </section>

      {/* 988 BAND */}
      <section>
        <div className="container">
          <Reveal>
            <div className="band">
              <h2>In crisis now? Don&apos;t wait on us.</h2>
              <p className="lead" style={{ margin: "12px auto 0" }}>
                If you or a veteran you love is in crisis, call or text{" "}
                <a href="tel:988" style={{ color: "#fff", fontWeight: 800 }}>
                  988
                </a>
                , then press 1 — the Veterans Crisis Line, 24/7. SUAS QRF is support coordination,
                not emergency care.
              </p>
              <div className="cta-row" style={{ justifyContent: "center" }}>
                <a className="btn btn-primary" href={GOFUNDME_URL} target="_blank" rel="noopener noreferrer">
                  Donate on GoFundMe
                </a>
                <a className="btn btn-ghost" href={PAYPAL_URL} target="_blank" rel="noopener noreferrer">
                  Donate with PayPal
                </a>
              </div>
              <p style={{ marginTop: 16, color: "rgba(255,255,255,.85)", fontSize: ".92rem" }}>
                S.U.A.S. Veteran Crisis QRF is a 501(c)(3) nonprofit organization. EIN 88-3249428.
                Donations are tax-deductible to the extent allowed by law. No goods or services
                were provided in exchange for this contribution. We never sell or share donor
                data. This page offers general information only and is not tax, legal, or
                financial advice.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
