/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  env: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY
  },
  ...nextConfig
};
