// dir: ~/quangminh-smart-border/frontend/next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  output: 'standalone',

  async redirects() {
    return [
      {
        source: '/quote',
        destination: '/contact',
        permanent: true,
      },
    ]
  },
};
 
export default withNextIntl(nextConfig);