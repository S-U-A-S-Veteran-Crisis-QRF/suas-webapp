import type { Metadata } from "next";
import "./globals.css";
import CrisisBar from "@/components/CrisisBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://suasqrf.org"),
  title: {
    default: "SUAS Veteran Crisis Q.R.F.",
    template: "%s | SUAS Veteran Crisis Q.R.F.",
  },
  description:
    "Nonprofit veteran support: private check-ins, trusted-circle alerts, and resource routing before crisis. Demo and pilot — not emergency care.",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* GitHub Pages can't send HTTP headers, so this meta tag is the only
            place a CSP can live. 'unsafe-inline' is unavoidable: the static
            export ships an inline bootstrap script and no server exists to
            issue nonces. frame-ancestors and report-only are ignored in meta,
            so framing can't be blocked here. */}
        <meta
          httpEquiv="Content-Security-Policy"
          content={[
            "default-src 'self'",
            "connect-src 'self' https://api.web3forms.com",
            "img-src 'self' data:",
            "style-src 'self' 'unsafe-inline'",
            "script-src 'self' 'unsafe-inline'",
            "frame-src 'self'",
            "object-src 'none'",
            "base-uri 'none'",
            "form-action 'self' https://api.web3forms.com",
            "upgrade-insecure-requests",
          ].join("; ")}
        />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body>
        <CrisisBar />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
