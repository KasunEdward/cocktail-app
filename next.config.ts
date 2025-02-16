// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.thecocktaildb.com"], // Allow images from this domain
  },
  experimental: {
    turbopack: false, // Disable Turbopack
  },
};

module.exports = nextConfig;

