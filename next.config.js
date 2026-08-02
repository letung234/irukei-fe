/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strict mode helps surface bugs early
  reactStrictMode: true,

  // All API calls go through /api/* proxy → no CORS issues in dev
  // Only add rewrites if API base URL is configured
  async rewrites() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBaseUrl) {
      return [];
    }
    return [
      {
        source: "/api/:path*",
        destination: `${apiBaseUrl}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
