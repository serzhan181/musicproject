/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  images: {
    remotePatterns: [
      { hostname: "i1.sndcdn.com", port: "", protocol: "https" },
    ],
  },
};

module.exports = nextConfig;
