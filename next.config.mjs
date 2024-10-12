/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kawtech.sirv",
        port: "",
        pathname: "/kawtech-blog/thumbnails/**",
      },
    ],
  },
};

export default nextConfig;
