/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["videodelivery.net", "imagedelivery.net"],
  },
};

export default nextConfig;
