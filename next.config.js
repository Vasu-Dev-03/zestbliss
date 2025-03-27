/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dotpe.in',
      },
    ],
  },
  // Enable SWC minification
  swcMinify: true,
  // Optimize webpack for production only
  webpack: (config, { dev, isServer }) => {
    if (!dev) {
      // Enable tree shaking in production
      config.optimization = {
        ...config.optimization,
        usedExports: true,
      }
    }
    return config
  },
}

module.exports = nextConfig 