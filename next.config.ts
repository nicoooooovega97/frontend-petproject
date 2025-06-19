// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',       // Para las imágenes de ejemplo
      'lh3.googleusercontent.com', // Si usas autenticación con Google
      'res.cloudinary.com',       // Si usas Cloudinary
      'localhost'                 // Para desarrollo local
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
    ],
    minimumCacheTTL: 60, // Tiempo mínimo de caché en segundos
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Otras configuraciones que puedas necesitar
};

export default nextConfig;