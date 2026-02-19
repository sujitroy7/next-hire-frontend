import { envRequired } from "@/lib/envRequired";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: envRequired("WHITE_LISTED_IMAGE_WEBSITES")
      .split(",")
      .map((hostname) => ({ protocol: "https", hostname })),
  },
  reactCompiler: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};
export default nextConfig;
