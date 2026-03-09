import { env } from "@/env";
import type { NextConfig } from "next";

const BACKEND_URL=env.NEXT_PUBLIC_BACKEND_URL
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
        destination: `${BACKEND_URL}/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
