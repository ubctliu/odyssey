/** @type {import('next').NextConfig} */
const nextConfig = {}
const withImages = require('next-images');
const withVideos = require('next-videos');

module.exports = withImages(withVideos({
  webpack(config, options) {
    return config;
  },
  env: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY
  },
  images: {
    domains: ['maps.googleapis.com'],
  },
  ...nextConfig
  },
));