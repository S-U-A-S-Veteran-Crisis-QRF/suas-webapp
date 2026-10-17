import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return {
    name: "SUAS Veteran Crisis Q.R.F.",
    short_name: "SUAS QRF",
    description:
      "Crisis-prevention infrastructure for veterans — private check-ins, trusted-circle alerts, and resource routing.",
    start_url: `${base}/`,
    scope: `${base}/`,
    display: "standalone",
    background_color: "#0A1628",
    theme_color: "#0A1628",
    orientation: "any",
    categories: ["health", "social"],
    icons: [
      {
        src: `${base}/icons/icon-192.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${base}/icons/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
