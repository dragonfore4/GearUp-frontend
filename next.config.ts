import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns : [
        {
            protocol : 'https',
            hostname : 'placehold.co',
        },
        {
            protocol : 'https',
            hostname : 'res.cloudinary.com',
        },
        {
            protocol : 'https',
            hostname : 'placeholder.co',
        },
    ],
    dangerouslyAllowSVG: true,
  }
};

export default nextConfig;
