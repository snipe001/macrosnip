/** @type {import('next').NextConfig} */
const nextConfig = {
  // Netlify ile çalışması için ayarlar
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'same-assets.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ext.same-assets.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ugc.same-assets.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true, // Netlify için
  },
  // Aşağıdaki yönlendirmeleri ekleyerek 404 hatalarını çözüyoruz
  async rewrites() {
    return [
      {
        source: '/macros/:path*',
        destination: '/macros',
      },
      {
        source: '/games/:game',
        destination: '/macros?game=:game',
      },
      {
        source: '/:locale/macros/:path*',
        destination: '/:locale/macros',
      },
      {
        source: '/:locale/games/:game',
        destination: '/:locale/macros?game=:game',
      },
    ];
  },
}

module.exports = nextConfig
