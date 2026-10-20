import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Transparency & Financials",
  description:
    "Legal status, registrations, leadership, and how donations are used at S.U.A.S. Veteran Crisis Q.R.F., a California 501(c)(3) public charity (EIN 88-3249428).",
};

export default function TransparencyPage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="eyebrow">Trust &amp; governance</div>
          <h1>Transparency &amp; financials</h1>
          <p className="lede">
            Who we are on paper, who runs the organization, and where the money goes.
          </p>
        </div>
      </section>

      <section>
        <div className="container" style={{ maxWidth: 860 }}>
          <h2>Legal status</h2>
          <p>
            S.U.A.S. Veteran Crisis Q.R.F. is a California nonprofit public benefit corporation,
            incorporated in October 2022 (California Secretary of State entity number 5150056,
            status Active). The IRS recognizes SUAS as a 501(c)(3) public charity, effective July 8,
            2022, under EIN 88-3249428. Donations are tax-deductible to the extent allowed by law.
          </p>
          <ul>
            <li>
              <a href="/docs/IRS-Determination-Letter.pdf" target="_blank" rel="noopener noreferrer">
                IRS determination letter (PDF)
              </a>
            </li>
            <li>
              <a
                href="https://apps.irs.gov/app/eos/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Verify our status on the IRS Tax Exempt Organization Search
              </a>{" "}
              (search EIN 88-3249428)
            </li>
            <li>
              <a
                href="https://bizfileonline.sos.ca.gov/search/business"
                target="_blank"
                rel="noopener noreferrer"
              >
                California Secretary of State business search
              </a>{" "}
              (entity 5150056)
            </li>
          </ul>

          <h2>Where we are</h2>
          <p>
            Mailing address and office of record: 727 Edge Lane, Los Altos, CA 94024. SUAS is a
            hybrid organization: our team works remotely and meets veterans where they are across
            Santa Clara County, and most in-person work happens at Hacker Dojo, 855 Maude Ave,
            Mountain View, CA 94043.
          </p>

          <h2>Leadership</h2>
          <p>
            Officers as filed with the California Secretary of State (Statement of Information,
            September 25, 2026): Jacob Sterling Silver, Chief Executive Officer; Jose Alcantar Jr.,
            Chief Financial Officer; Brant Cassidy Rigden Creamer, Secretary. SUAS is veteran-led in
            the field: the responders who answer a call have served.
          </p>

          <h2>How donations are used</h2>
          <p>
            Gifts fund two things. First, direct assistance to veterans: rides to safety, hot meals,
            and emergency shelter nights, paid for as they happen. Second, the infrastructure that
            lets a small volunteer team respond quickly: the QRF app in development, phone and
            coordination tools, and free community events that reduce isolation. SUAS has no paid
            office lease and no paid executive staff; overhead is kept to the minimum a registered
            charity requires. Read more on our <Link href="/donate">Donate page</Link> and{" "}
            <Link href="/programs">Programs page</Link>.
          </p>

          <h2>Annual filings</h2>
          <p>
            As a small public charity SUAS files IRS Form 990-N or 990-EZ annually and the
            California Attorney General&rsquo;s Registry of Charities annual report. Copies of our
            filings are available on request to{" "}
            <a href="mailto:jacobsilver@suasqrf.org">jacobsilver@suasqrf.org</a>, and our IRS
            filings are published on{" "}
            <a
              href="https://projects.propublica.org/nonprofits/organizations/883249428"
              target="_blank"
              rel="noopener noreferrer"
            >
              ProPublica Nonprofit Explorer
            </a>{" "}
            as the IRS releases them.
          </p>

          <h2>Questions</h2>
          <p>
            Email <a href="mailto:jacobsilver@suasqrf.org">jacobsilver@suasqrf.org</a> or call (925)
            727-6109. See also our <Link href="/privacy">Privacy Policy</Link> and{" "}
            <Link href="/safety">Safety page</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
