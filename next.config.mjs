/** @type {import('next').NextConfig} */
import { withNextDevtools } from '@next-devtools/core/plugin';

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withNextDevtools(nextConfig);
