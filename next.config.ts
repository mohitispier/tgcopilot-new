import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // The old vercel.json allowed any site to frame tgcopilot.com. Only same-origin framing is allowed now.
  { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
  // Keep every URL of the old static site working.
  async redirects() {
    return [
      { source: '/channels', destination: '/marketplace', permanent: true },
      { source: '/engine', destination: '/ad-engine', permanent: true },
      { source: '/ads-creater', destination: '/ad-engine', permanent: true },
      { source: '/test', destination: '/ad-engine', permanent: true },
      { source: '/aniamtion', destination: '/', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/:page(marketplace|channels|engine).html', destination: '/:page', permanent: true },
    ];
  },
};

export default nextConfig;
