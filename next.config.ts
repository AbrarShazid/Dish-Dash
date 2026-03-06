import { env } from "@/env";
import type { NextConfig } from "next";

const FRONTEND_URL=env.NEXT_PUBLIC_FRONTEND_URL
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${FRONTEND_URL}/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
