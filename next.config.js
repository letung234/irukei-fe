/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strict mode helps surface bugs early
  reactStrictMode: true,

  // All API calls go through /api/* proxy → no CORS issues in dev
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
