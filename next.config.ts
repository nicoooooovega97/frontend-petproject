// next.config.js
import type { NextConfig } from "next";


const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Aún puedes restringir por protocolo (recomendado)
        hostname: '**',   // <-- El comodín que permite cualquier hostname
      },
      {
        protocol: 'http', // Si también necesitas permitir http
        hostname: '**',
      },
    ],
    // Las siguientes configuraciones son opcionales pero buenas de tener
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Otras configuraciones que puedas necesitar...
};

// Usamos module.exports para un archivo .js, que es el estándar más compatible
module.exports = nextConfig;