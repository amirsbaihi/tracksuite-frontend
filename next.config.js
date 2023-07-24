/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
    async rewrites() {
      return [
        {
          source: '/backend/:path*',
          destination: process.env.BACKEND_URL||"http://localhost:4000"+'/:path*',
        },
      ]
    },
  }

module.exports = nextConfig
