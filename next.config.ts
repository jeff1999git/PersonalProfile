import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack configuration
  turbopack: {
    // Root directory for monorepo support
    root: ".",
  },

  // Enable React Strict Mode for better development experience
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Compression for better performance
  compress: true,

  // Disable x-powered-by header for security
  poweredByHeader: false,
};

export default nextConfig;
