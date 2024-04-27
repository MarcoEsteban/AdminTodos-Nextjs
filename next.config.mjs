/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuracion de la Imagen cuando sea de google, Aqui se especifica el dominio del servidor de la imagen.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailus.io',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      }
    ]
  }
};

export default nextConfig;
