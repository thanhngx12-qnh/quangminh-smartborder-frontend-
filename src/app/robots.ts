// dir: frontend/src/app/robots.ts

import { MetadataRoute } from 'next';

const baseUrl = 'https://talunglogistics.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*', // Áp dụng cho tất cả các bot
        allow: '/',     // Cho phép truy cập toàn bộ trang web công khai
        
        // CHẶN CÁC ĐƯỜNG DẪN KHÔNG CẦN INDEX (NÂNG CẤP)
        disallow: [
          '/admin/',      // Chặn bot vào trang quản trị
          '/api/',        // Chặn bot vào các đường dẫn API nội bộ
          '/_next/',      // Chặn bot vào các file hệ thống của Next.js
          '/tracking/',   // Chặn bot vào trang tra cứu (vì trang này chỉ có form, không có nội dung SEO)
          '/*?*',         // Chặn bot vào các URL có chứa tham số (query strings) để tránh nội dung trùng lặp
        ],
      },
      {
        // CHẶN CÁC BOT THU THẬP DỮ LIỆU RÁC (Tùy chọn)
        userAgent: ['AdsBot-Google', 'Mediapartners-Google'],
        allow: '/',
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}