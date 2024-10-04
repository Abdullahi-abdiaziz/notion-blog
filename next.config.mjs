/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "kawtech.sirv.com",
      "prod-files-secure.s3.us-west-2.amazonaws.com",
      "vimeo.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kawtech.sirv.com",
        pathname: "/blog/img/**",
      },
      {
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
        pathname: "/blog/img/**",
      },

      {
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
        pathname: "/blog/media/**",
      },
      {
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
        pathname: "/blog/css/**",
      },
      {
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
        pathname: "/blog/js/**",
      },
      {
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
        pathname: "/blog/video/**",
      },
    ],
  },
};

export default nextConfig;
