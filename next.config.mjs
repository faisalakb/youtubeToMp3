/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // mp3bat is a static-friendly app: all conversion happens client-side,
  // so no special server runtime or cross-origin isolation headers are needed.
};

export default nextConfig;
