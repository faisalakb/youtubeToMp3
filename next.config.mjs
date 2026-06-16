/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // mp3bat is a static-friendly app: all conversion happens client-side,
  // so no special server runtime or cross-origin isolation headers are needed.

  // Canonical host: 301 any www.mp3bat.com request to the bare domain, matching
  // the canonical URLs (site.url) and avoiding duplicate-host indexing in Google.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.mp3bat.com" }],
        destination: "https://mp3bat.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
