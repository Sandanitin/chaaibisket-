/** @type {import("next").NextConfig} */
const nextConfig = { 
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['resend']
  }
};

module.exports = nextConfig;