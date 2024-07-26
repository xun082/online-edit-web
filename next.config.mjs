/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  experimental: {
    optimizePackageImports: ['shiki'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
      {
        source: '/public/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: '',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: '',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
