/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: process.env.NODE_ENV === 'production',
  
  swcMinify: true,

  images: {
    domains: ['via.placeholder.com'],
    unoptimized: process.env.NODE_ENV === 'development',
  },

  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = 'eval-cheap-module-source-map';
      
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      }
    }
    return config;
  },

  onDemandEntries: {
    maxInactiveAge: 10 * 1000,
    pagesBufferLength: 1,
  },

  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },

  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
}

module.exports = nextConfig 