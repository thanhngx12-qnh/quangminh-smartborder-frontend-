// dir: frontend/src/app/sitemap.ts

import { MetadataRoute } from 'next';
import { getAllServicesForSitemap, getAllNewsForSitemap } from '@/lib/data-fetchers';

const baseUrl = 'https://talunglogistics.com';

const locales = ['vi', 'en', 'zh'] as const;
type Locale = typeof locales[number];

// Bản đồ URL alias để khớp với middleware và navigation.ts
const pathnames: Record<string, Record<Locale, string>> = {
  '/': { vi: '/', en: '/', zh: '/' },
  '/about': { vi: '/gioi-thieu', en: '/about-us', zh: '/guanyu' },
  '/services': { vi: '/dich-vu', en: '/services', zh: '/fuwu' },
  '/news': { vi: '/tin-tuc', en: '/news', zh: '/xinwen' },
  '/careers': { vi: '/tuyen-dung', en: '/careers', zh: '/zhaopin' },
  '/contact': { vi: '/lien-he', en: '/contact', zh: '/lianxi' },
  '/manifesto': { vi: '/tuyen-ngon', en: '/manifesto', zh: '/xuanyan' }
};

const getFullUrl = (locale: Locale, path: string) => {
  const prefix = locale === 'vi' ? '' : `/${locale}`;
  const cleanPath = path === '/' ? '' : path;
  return `${baseUrl}${prefix}${cleanPath}`;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  
  // 1. URL TRANG TĨNH
  const staticRoutes = Object.keys(pathnames).flatMap((route) => {
    return locales.map((locale) => {
      const alternates: Record<string, string> = {};
      locales.forEach((l) => { alternates[l] = getFullUrl(l, pathnames[route][l]); });

      return {
        url: getFullUrl(locale, pathnames[route][locale]),
        lastModified: new Date(),
        alternates: { languages: alternates }
      };
    });
  });

  // 2. URL DỊCH VỤ ĐỘNG
  const services = await getAllServicesForSitemap();
  const serviceRoutes = services.flatMap((service) => {
    if (!service.translations) return [];
    
    const alternates: Record<string, string> = {};
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

  // 3. URL TIN TỨC ĐỘNG
  const news = await getAllNewsForSitemap();
  const newsRoutes = news.flatMap((article) => {
    if (!article.translations) return [];

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