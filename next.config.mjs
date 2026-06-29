// Old static site used .html URLs; forward them to the clean routes.
const HTML_ROUTES = [
  "app",
  "families",
  "veterans",
  "nonprofits",
  "counties",
  "how-it-works",
  "pilot",
  "donate",
  "safety",
  "about",
  "contact",
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      ...HTML_ROUTES.map((slug) => ({
        source: `/${slug}.html`,
        destination: `/${slug}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
