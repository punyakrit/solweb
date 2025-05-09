import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    PRIVATE_ALCHEMY_API_KEY: process.env.PRIVATE_ALCHEMY_API_KEY,

  },
  strictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
