/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  compress: false, // 禁用gzip压缩
  async rewrites() {
    return [
      {
        source: '/ai/:path*',
        destination: `${process.env.MODEL_API_BASE_URL}${process.env.QWEN_APP_ID}/:path*`, // 你想要代理的外部 API
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/ai/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
          {
            key: 'Authorization',
            value: `Bearer ${process.env.QWEN_AUTH}`,
          },
          {
            key: 'Accept',
            value: `text/event-stream`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
