import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Autorise l'accès au serveur de dev depuis une autre machine du réseau (HMR). Sans effet en production.
  allowedDevOrigins: ["172.25.13.160"],
};

export default nextConfig;
