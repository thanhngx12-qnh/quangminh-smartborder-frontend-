// dir: frontend/src/app/sitemap.ts

import { MetadataRoute } from 'next';
import { getAllServicesForSitemap, getAllNewsForSitemap } from '@/lib/data-fetchers';

const baseUrl = 'https://talunglogistics.com';

// 1. Định nghĩa trực tiếp để tránh lỗi import và kiểu dữ liệu (any)
const locales = ['vi', 'en', 'zh'] as const;
type Locale = typeof locales[number];

const pathnames: Record<string, Record<Locale, string>> = {
  '/': { vi: '/', en: '/', zh: '/' },
  '/about': { vi: '/gioi-thieu', en: '/about-us', zh: '/guanyu' },
  '/services': { vi: '/dich-vu', en: '/services', zh: '/fuwu' },
  '/news': { vi: '/tin-tuc', en: '/news', zh: '/xinwen' },
  '/careers': { vi: '/tuyen-dung', en: '/careers', zh: '/zhaopin' },
  '/contact': { vi: '/lien-he', en: '/contact', zh: '/lianxi' }
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  
  // 1. Tạo URL cho các trang tĩnh
  const staticRoutes = Object.keys(pathnames).flatMap((route) => {
    return locales.map((locale) => {
      const path = pathnames[route][locale];
      // Nếu là trang chủ '/', ta không thêm dấu / thừa ở cuối
      const finalPath = path === '/' ? '' : path; 
      
      return {
        url: `${baseUrl}/${locale}${finalPath}`,
        lastModified: new Date(),
        alternates: {
          languages: {
            'vi': `${baseUrl}/vi${pathnames[route]['vi'] === '/' ? '' : pathnames[route]['vi']}`,
            'en': `${baseUrl}/en${pathnames[route]['en'] === '/' ? '' : pathnames[route]['en']}`,
            'zh': `${baseUrl}/zh${pathnames[route]['zh'] === '/' ? '' : pathnames[route]['zh']}`,
          }
        }
      };
    });
  });

  // 2. Tạo URL cho các trang dịch vụ động
  const services = await getAllServicesForSitemap();
  const serviceRoutes = services.flatMap((service) => {
    const alternates: Record<string, string> = {};
    
    // Gom các URL thay thế
    service.translations.forEach((tr) => {
      const locale = tr.locale as Locale;
      const basePath = pathnames['/services'][locale];
      alternates[locale] = `${baseUrl}/${locale}${basePath}/${tr.slug}`;
    });

    // Tạo route cho từng ngôn ngữ
    return service.translations.map((translation) => {
      const locale = translation.locale as Locale;
      const basePath = pathnames['/services'][locale];
      return {
        url: `${baseUrl}/${locale}${basePath}/${translation.slug}`,
        lastModified: new Date(), // Vì interface Service không có updatedAt nên dùng ngày hiện tại
        alternates: { languages: alternates }
      };
    });
  });

  // 3. Tạo URL cho các trang tin tức động
  const news = await getAllNewsForSitemap();
  const newsRoutes = news.flatMap((article) => {
    const alternates: Record<string, string> = {};
    
    article.translations.forEach((tr) => {
      const locale = tr.locale as Locale;
      const basePath = pathnames['/news'][locale];
      alternates[locale] = `${baseUrl}/${locale}${basePath}/${tr.slug}`;
    });
    
    return article.translations.map((translation) => {
      const locale = translation.locale as Locale;
      const basePath = pathnames['/news'][locale];
      return {
        url: `${baseUrl}/${locale}${basePath}/${translation.slug}`,
        lastModified: article.publishedAt ? new Date(article.publishedAt) : new Date(),
        alternates: { languages: alternates }
      };
    });
  });

  // 4. Kết hợp tất cả các URL
  return [...staticRoutes, ...serviceRoutes, ...newsRoutes];
}