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
      <body>
        <CrisisBar />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
