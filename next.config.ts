import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: '*.cdninstagram.com' },
      { hostname: '*.fbcdn.net' },
    ],
  },
};

export default nextConfig;
