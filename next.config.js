/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'arweave.net',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '**.solana.com',
        pathname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  env: {
    PRIVATE_ALCHEMY_API_KEY: process.env.PRIVATE_ALCHEMY_API_KEY,
  },
  serverRuntimeConfig: {
    PRIVATE_ALCHEMY_API_KEY: process.env.PRIVATE_ALCHEMY_API_KEY,
  },
  publicRuntimeConfig: {
    // Empty, we don't want to expose our API key
  }
}

module.exports = nextConfig 