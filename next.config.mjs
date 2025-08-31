/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Ensure no service worker or PWA settings
  experimental: {
    // Disable any experimental features that might cause issues
  },
  // Remove any PWA or service worker configurations
}

export default nextConfig
