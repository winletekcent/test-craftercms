/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost'
    ]
  },
  reactStrictMode: true,
  transpilePackages: ['@craftercms/experience-builder', '@craftercms/studio-ui']
}

module.exports = nextConfig
