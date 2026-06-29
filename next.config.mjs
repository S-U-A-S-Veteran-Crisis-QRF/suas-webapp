// Static export for free hosting on GitHub Pages.
// The project site is served from a /<repo> sub-path, so we set basePath +
// assetPrefix + a custom image loader from one env var (NEXT_PUBLIC_BASE_PATH).
// Empty locally and on a root custom domain.
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath: base || undefined,
  assetPrefix: base || undefined,
  images: {
    loader: "custom",
    loaderFile: "./image-loader.js",
  },
};

export default nextConfig;
