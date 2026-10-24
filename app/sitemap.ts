import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://suasqrf.org";
const ROUTES = [
  "", "help", "about", "programs", "how-it-works", "veterans", "families", "nonprofits", "counties",
  "app", "pilot", "campaign", "donate", "safety", "transparency", "privacy", "contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((r) => ({
    url: r ? `${BASE}/${r}/` : `${BASE}/`,
    lastModified,
    changeFrequency: r === "" ? "weekly" : "monthly",
    priority: r === "" ? 1 : r === "donate" || r === "help" || r === "programs" ? 0.9 : 0.7,
  }));
}
