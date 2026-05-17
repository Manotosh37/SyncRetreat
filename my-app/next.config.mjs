import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Silence the multiple-lockfiles workspace warning
  outputFileTracingRoot: __dirname,

  // Compress responses with gzip
  compress: true,

  images: {
    // Auto-convert images to AVIF then WebP for 50-80% smaller payloads
    formats: ["image/avif", "image/webp"],

    // Responsive breakpoints — matches Tailwind sm/md/lg/xl/2xl
    deviceSizes: [375, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 64, 96, 128, 256],

    // Aggressively cache optimised images (1 week)
    minimumCacheTTL: 604800,

    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'media-cdn.tripadvisor.com' },
      { protocol: 'https', hostname: 'a0.muscache.com' },
      { protocol: 'https', hostname: 'media.istockphoto.com' },
      { protocol: 'https', hostname: 'charzanholidays.com' },
      { protocol: 'https', hostname: 'topclassholidays.com' },
      { protocol: 'https', hostname: 'www.eladakhtourism.com' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: 'sandeepachetan.com' },
      { protocol: 'https', hostname: 'static2.tripoto.com' },
    ],
  },

  // Strict Content-Security and performance headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        // Cache static assets for 1 year
        source: '/(.*)\\.(png|jpg|jpeg|gif|ico|svg|woff2|woff|ttf)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;

