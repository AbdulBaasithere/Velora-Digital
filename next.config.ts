import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Allow local network IP address for testing on phone/other devices
  allowedDevOrigins: ["10.33.119.243"],
};

export default nextConfig;
