/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      // Tambahkan domain production Strapi nanti
      // {
      //   protocol: 'https',
      //   hostname: 'your-strapi-domain.com',
      //   pathname: '/uploads/**',
      // },
    ],
  },
};

module.exports = nextConfig;
