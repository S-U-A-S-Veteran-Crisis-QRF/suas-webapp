import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How S.U.A.S. Veteran Crisis Q.R.F. collects, uses, and protects information on suasqrf.org, including contact forms, donations, and website analytics.",
};

const UPDATED = "October 20, 2026";

export default function PrivacyPage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="eyebrow">Trust &amp; governance</div>
          <h1>Privacy Policy</h1>
          <p className="lede">
            We collect as little as possible, we never sell it, and we never use this website to
            collect crisis or health information. Last updated {UPDATED}.
          </p>
        </div>
      </section>

      <section>
        <div className="container" style={{ maxWidth: 860 }}>
          <h2>Who we are</h2>
          <p>
            S.U.A.S. Veteran Crisis Q.R.F. (&ldquo;SUAS,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) is a
            California nonprofit public benefit corporation recognized by the IRS as a 501(c)(3)
            public charity (EIN 88-3249428). Our mailing address is 727 Edge Lane, Los Altos, CA
            94024. This policy covers the website at suasqrf.org and its subpages.
          </p>

          <h2>What we collect, and why</h2>
          <h3>Information you send us</h3>
          <p>
            When you use a contact, pilot-interest, family-intake, or partner form on this site, we
            receive what you type: usually your name, email address, phone number, role, and your
            message. We use it only to reply to you and to follow up on what you asked about. Forms
            are delivered to our inbox by a third-party form service (Web3Forms or FormSubmit); the
            service transmits your submission to us and is not permitted to use it for its own
            purposes.
          </p>
          <h3>Donations</h3>
          <p>
            Donations are processed by PayPal Giving Fund and GoFundMe on their own secure pages. We
            never see or store your card or bank details. Those processors share your name, email,
            and gift amount with us so we can send a thank-you and a tax receipt. Their privacy
            policies govern their handling of your payment information.
          </p>
          <h3>Website analytics and advertising measurement</h3>
          <p>
            We use Google Analytics 4 to understand how people use this site (pages visited, device
            type, approximate region) and, as a Google Ad Grants participant, Google Ads conversion
            tracking to measure whether our ads lead to actions such as a form submission or a
            donation click. These tools set cookies and collect your IP address and a pseudonymous
            identifier. We do not use this data to identify you, and we do not use it for
            remarketing or to build advertising profiles. You can opt out with the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener noreferrer" target="_blank">
              Google Analytics opt-out browser add-on
            </a>{" "}
            or by blocking cookies in your browser.
          </p>
          <h3>The app demo</h3>
          <p>
            The interactive demo on our App Demo page runs entirely in your browser with sample
            data. Nothing you tap or type in the demo is transmitted to us or stored.
          </p>

          <h2>What we do not collect</h2>
          <p>
            This website is not a crisis service and is not designed to receive health, mental
            health, or emergency information. Please do not submit it through our forms. If you are
            in crisis, call the Veterans Crisis Line at 988 and press 1, or text 838255. We do not
            knowingly collect information from anyone under 18.
          </p>

          <h2>How we share information</h2>
          <p>
            We do not sell, rent, or trade personal information, and we do not share it with other
            organizations for their marketing. We share it only with the service providers named
            above, who process it on our behalf; when the law requires it; or to protect someone
            from imminent harm.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Form submissions are kept for as long as we are working with you, and then for up to
            three years for record-keeping. Donation records are kept for seven years as required
            for nonprofit accounting. Analytics data is retained by Google for 14 months.
          </p>

          <h2>Your rights (including California residents)</h2>
          <p>
            You may ask us at any time what personal information we hold about you, ask us to
            correct it, or ask us to delete it. California residents have these rights under the
            California Consumer Privacy Act; we honor them for everyone. We will not treat you
            differently for exercising them. Email{" "}
            <a href="mailto:jacobsilver@suasqrf.org">jacobsilver@suasqrf.org</a> or write to the
            address above, and we will respond within 30 days.
          </p>

          <h2>Security</h2>
          <p>
            This site is served entirely over HTTPS. We do not run our own servers; the site is
            static and hosted on GitHub Pages, and forms, donations, and analytics are handled by the
            providers named above over encrypted connections.
          </p>

          <h2>Changes and contact</h2>
          <p>
            If we change this policy, we will update the date at the top of this page. Questions go
            to <a href="mailto:jacobsilver@suasqrf.org">jacobsilver@suasqrf.org</a> or (925)
            727-6109. See also our <Link href="/safety">Safety page</Link> and{" "}
            <Link href="/transparency">Transparency page</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
