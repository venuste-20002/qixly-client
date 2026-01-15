import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BASE_BACKEND_URL: process.env.BASE_BACKEND_URL,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
