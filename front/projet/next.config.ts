/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', // autorise toutes les URLs Supabase Storage
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com', // pour les avatars par défaut
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
  experimental: {
    appDir: true, // si tu utilises le dossier app/
  },
};

module.exports = nextConfig;


//import type { NextConfig } from "next";/

//const nextConfig: NextConfig = {
  /* config options here */
//};

//export default nextConfig;
