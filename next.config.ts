import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable strict mode for better error handling
  reactStrictMode: true,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "expontmind.com",
      },
    ],
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      // Redirect old paths to new structure (add as needed)
      {
        source: "/about",
        destination: "/company/about",
        permanent: true,
      },
      {
        source: "/team",
        destination: "/company/about",
        permanent: true,
      },
      // Ensure trailing slashes are consistent
      {
        source: "/services",
        destination: "/services/",
        permanent: true,
      },
      {
        source: "/industries",
        destination: "/industries/",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/blog/",
        permanent: true,
      },
      {
        source: "/work",
        destination: "/work/",
        permanent: true,
      },
    ];
  },

  // Rewrites for clean URLs (if needed)
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    };
  },

  // Experimental features
  experimental: {
    // Enable optimizations
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // Output configuration
  output: "standalone",

  // Compression
  compress: true,

  // Power by header removal
  poweredByHeader: false,

  // Trailing slash configuration
  trailingSlash: true,
};

export default nextConfig;
