import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import CrisisBar from "@/components/CrisisBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DonateClickTracker from "@/components/DonateClickTracker";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://suasqrf.org"),
  title: {
    default: "SUAS Veteran Crisis Q.R.F.",
    template: "%s | SUAS Veteran Crisis Q.R.F.",
  },
  description:
    "Nonprofit peer-bridge crisis support for veterans in Santa Clara County, California: a fellow veteran who shows up, a ride, a meal, a safe bed, and a warm hand-off to services. Not emergency care.",
  openGraph: {
    title: "SUAS Veteran Crisis Q.R.F.",
    description:
      "Crisis-prevention infrastructure for veterans — private check-ins, trusted-circle alerts, and resource routing.",
    type: "website",
    siteName: "SUAS Veteran Crisis Q.R.F.",
    url: "/",
    locale: "en_US",
    images: [
      {
        url: "/images/home.jpg",
        width: 1067,
        height: 1600,
        alt: "An American flag backlit by sunlight",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SUAS Veteran Crisis Q.R.F.",
    description:
      "Crisis-prevention infrastructure for veterans — private check-ins, trusted-circle alerts, and resource routing.",
    images: ["/images/home.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) — Google Ads AW-18532521945 */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-18532521945"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18532521945');
            `,
          }}
        />
        {GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script
              id="ga-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}');
                `,
              }}
            />
          </>
        )}
        {/* JSON-LD Structured Data (Nonprofit) */}
        <Script
          id="json-ld-nonprofit"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NonprofitOrganization",
              name: "SUAS QRF",
              alternateName: "S.U.A.S. Veteran Crisis Q.R.F.",
              url: "https://suasqrf.org/",
              logo: "https://suasqrf.org/icon.svg",
              description:
                "Nonprofit peer-bridge crisis support for veterans in Santa Clara County, California: peer response, free rides, meals, emergency shelter nights, direct service referral, and free community events.",
              areaServed: { "@type": "AdministrativeArea", name: "Santa Clara County, California" },
              foundingDate: "2022-07-08",
              taxID: "88-3249428",
              legalName: "S.U.A.S. Veteran Crisis QRF",
              nonprofitStatus: "https://schema.org/Nonprofit501c3",
              address: {
                "@type": "PostalAddress",
                streetAddress: "727 Edge Lane",
                addressLocality: "Los Altos",
                addressRegion: "CA",
                postalCode: "94024",
                addressCountry: "US",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-925-727-6109",
                contactType: "customer service",
                availableLanguage: "English",
                areaServed: "US",
              },
              email: "info@suasqrf.org",
              sameAs: [
                "https://www.facebook.com/suasqrf/",
                "https://www.instagram.com/suasqrf/",
                "https://x.com/SUAS_QRF",
                "https://www.tiktok.com/@jacob.sterling.si",
                "https://www.youtube.com/channel/UCD2gV2g7f6QHO0iWwusZZaw",
                "https://www.facebook.com/groups/451663376808281/",
              ],
              makesOffer: {
                "@type": "Offer",
                name: "Veteran Support Pilot Program",
                description:
                  "Structured pilot for 25-50 veterans with peer responder coordination",
                url: "https://suasqrf.org/pilot",
              },
              funding: {
                "@type": "MonetaryGrant",
                name: "Pilot Infrastructure Fund",
                description:
                  "Supports check-in workflows, trusted-circle tools, responder queues, privacy review",
              },
            }),
          }}
        />
        {/* If JavaScript never runs, Reveal sections must not stay invisible. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        <DonateClickTracker />
        <CrisisBar />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}