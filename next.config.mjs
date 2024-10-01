/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "kawtech.sirv.com",
      "prod-files-secure.s3.us-west-2.amazonaws.com",
    ], // Whitelist Unsplash domain
  },
};

export default nextConfig;
