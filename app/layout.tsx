import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import CrisisBar from "@/components/CrisisBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PwaInstaller from "@/components/PwaInstaller";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const viewport: Viewport = {
  themeColor: "#0A1628",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://suasqrf.org"),
  title: {
    default: "SUAS Veteran Crisis Q.R.F.",
    template: "%s | SUAS Veteran Crisis Q.R.F.",
  },
  description:
    "Nonprofit veteran support: private check-ins, trusted-circle alerts, and resource routing before crisis. Demo and pilot — not emergency care.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SUAS QRF",
  },
  icons: {
    apple: `${BASE}/icons/apple-touch-icon.png`,
  },
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
        width: 3200,
        height: 4800,
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
              name: "S.U.A.S. Veteran Crisis Q.R.F.",
              alternateName: "SUAS Veteran Crisis Quick Reaction Force",
              url: "https://suasqrf.org/",
              logo: "https://suasqrf.org/icon.png",
              description:
                "Nonprofit veteran crisis-prevention and care-coordination platform. Early-warning support through check-ins, trusted-circle alerts, resource routing, and responder follow-up.",
              foundingDate: "2022-07-08",
              taxID: "88-3249428",
              legalName: "S.U.A.S. Veteran Crisis Q.R.F.",
              nonprofitStatus: "501(c)(3) Public Charity",
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
              email: "jacobsilver@suasqrf.org",
              sameAs: [
                "https://www.facebook.com/suasqrf/",
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
      </head>
      <body>
        <CrisisBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <PwaInstaller />
        <Script
          id="sw-register"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('${BASE}/sw.js', { scope: '${BASE}/' })
                  .catch(function() {});
              }
            `,
          }}
        />
      </body>
    </html>
  );
}