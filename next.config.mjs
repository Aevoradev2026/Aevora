/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['three', 'framer-motion'],
  },
}
export default nextConfig
