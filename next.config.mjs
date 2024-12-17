/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kawtech.sirv.com",
        port: "",
        pathname: "/kawtech-blog/**",
      },
    ],
  },
};

export default nextConfig;
