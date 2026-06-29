// Custom next/image loader for static export.
// Prepends the deploy base path (e.g. "/suas-webapp" on GitHub Pages) to local
// image URLs so they resolve under a sub-path. Empty locally / on a root domain.
export default function imageLoader({ src }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (/^https?:\/\//.test(src)) return src;
  return `${base}${src}`;
}
