/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['theway4business.27lashabab.com'],
    unoptimized: true,  // Disable image optimization for static export
  },
  output: 'export',  // This tells Next.js to export the app as static files
};

export default nextConfig;
