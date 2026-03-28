import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    useCache: true,
    serverActions: {
      allowedOrigins: ["*.ngrok-free.app", "localhost:3000"],
    },
  },
}

export default nextConfig
