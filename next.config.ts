import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Allow testing the dev server from devices on the local network (e.g. a phone).
  allowedDevOrigins: ['192.168.110.90'],
};

export default nextConfig;
