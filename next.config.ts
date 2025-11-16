import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/@:username", destination: "/@/:username" },
      { source: "/@:username/post/:postId", destination: "/@/:username/post/:postId" }
    ];
  }
};

export default nextConfig;
