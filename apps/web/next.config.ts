import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configurazione immagini remote (Strapi CMS)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "capibara-1z0m.onrender.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
