// dir: frontend/src/app/robots.ts

import { MetadataRoute } from 'next';

// URL gốc của website của bạn
const baseUrl = 'https://talunglogistics.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*', // Áp dụng cho tất cả các bot (Google, Bing, etc.)
        allow: '/',     // Cho phép truy cập tất cả các trang
        // disallow: '/admin/', // Ví dụ: nếu bạn có trang admin cần chặn
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`, // Chỉ đường cho bot đến file sitemap
  };
}