import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components/ui': '/src/app/components/ui',
      '@/data': '/src/app/data',
      '@/services': '/src/app/services',
      '@/utils': '/src/app/utils',
      '@/config': '/src/app/config',
      '@/hooks': '/src/app/hooks',
    };
    return config;
  },
};

export default nextConfig;
