// dir: frontend/src/app/sitemap.ts

import { MetadataRoute } from 'next';
import { getAllServicesForSitemap, getAllNewsForSitemap } from '@/lib/data-fetchers';

const baseUrl = 'https://talunglogistics.com';

const locales = ['vi', 'en', 'zh'] as const;
type Locale = typeof locales[number];

const pathnames: Record<string, Record<Locale, string>> = {
  '/': { vi: '/', en: '/', zh: '/' },
  '/about': { vi: '/gioi-thieu', en: '/about-us', zh: '/guanyu' },
  '/services': { vi: '/dich-vu', en: '/services', zh: '/fuwu' },
  '/news': { vi: '/tin-tuc', en: '/news', zh: '/xinwen' },
  '/careers': { vi: '/tuyen-dung', en: '/careers', zh: '/zhaopin' },
  '/contact': { vi: '/lien-he', en: '/contact', zh: '/lianxi' },
  '/manifesto': { vi: '/tuyen-ngon', en: '/manifesto', zh: '/xuanyan' }
};

// Helper để tạo URL chuẩn theo quy tắc: vi không có prefix, en/zh có prefix
const getFullUrl = (locale: Locale, path: string) => {
  const prefix = locale === 'vi' ? '' : `/${locale}`;
  // Xử lý trang chủ (path là '/') tránh bị trùng dấu gạch chéo
  const cleanPath = path === '/' ? '' : path;
  return `${baseUrl}${prefix}${cleanPath}`;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  
  // 1. Tạo URL cho các trang tĩnh
  const staticRoutes = Object.keys(pathnames).flatMap((route) => {
    return locales.map((locale) => {
      const path = pathnames[route][locale];
      
      const alternates: Record<string, string> = {};
      locales.forEach((l) => {
        alternates[l] = getFullUrl(l, pathnames[route][l]);
      });

      return {
        url: getFullUrl(locale, path),
        lastModified: new Date(),
        alternates: { languages: alternates }
      };
    });
  });

  // 2. Tạo URL cho các trang dịch vụ động
  const services = await getAllServicesForSitemap();
  const serviceRoutes = services.flatMap((service) => {
    const alternates: Record<string, string> = {};
    
    // Tạo danh sách link thay thế chuẩn cho bot Google
    service.translations.forEach((tr) => {
      const locale = tr.locale as Locale;
      const basePath = pathnames['/services'][locale];
      alternates[locale] = `${getFullUrl(locale, basePath)}/${tr.slug}`;
    });

    return service.translations.map((translation) => {
      const locale = translation.locale as Locale;
      const basePath = pathnames['/services'][locale];
      return {
        url: `${getFullUrl(locale, basePath)}/${translation.slug}`,
        lastModified: new Date(),
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
      alternates[locale] = `${getFullUrl(locale, basePath)}/${tr.slug}`;
    });
    
    return article.translations.map((translation) => {
      const locale = translation.locale as Locale;
      const basePath = pathnames['/news'][locale];
      return {
        url: `${getFullUrl(locale, basePath)}/${translation.slug}`,
        lastModified: article.publishedAt ? new Date(article.publishedAt) : new Date(),
        alternates: { languages: alternates }
      };
    });
  });

  return [...staticRoutes, ...serviceRoutes, ...newsRoutes];
}