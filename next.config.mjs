/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["kawtech.sirv.com"], // Whitelist Unsplash domain
  },
};

export default nextConfig;
