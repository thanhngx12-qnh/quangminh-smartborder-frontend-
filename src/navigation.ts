// dir: frontend/src/navigation.ts
import { createNavigation } from 'next-intl/navigation';

export const locales = ['vi', 'en', 'zh'] as const;
export const localePrefix = 'always';

// Khai báo bản đồ URL (URL alias) cho từng ngôn ngữ
export const pathnames = {
  '/': '/',
  
  '/about': {
    vi: '/gioi-thieu',
    en: '/about-us',
    zh: '/guanyu'
  },
  
  '/services': {
    vi: '/dich-vu',
    en: '/services',
    zh: '/fuwu'
  },
  
  // URL động cho chi tiết dịch vụ: /services/[slug] -> /dich-vu/[slug]
  '/services/[slug]': {
    vi: '/dich-vu/[slug]',
    en: '/services/[slug]',
    zh: '/fuwu/[slug]'
  },

  '/news': {
    vi: '/tin-tuc',
    en: '/news',
    zh: '/xinwen'
  },
  
  // URL động cho chi tiết tin tức
  '/news/[slug]': {
    vi: '/tin-tuc/[slug]',
    en: '/news/[slug]',
    zh: '/xinwen/[slug]'
  },

  '/careers': {
    vi: '/tuyen-dung',
    en: '/careers',
    zh: '/zhaopin'
  },
  
  // URL động cho chi tiết tuyển dụng
  '/careers/[id]': {
    vi: '/tuyen-dung/[id]',
    en: '/careers/[id]',
    zh: '/zhaopin/[id]'
  },

  '/contact': {
    vi: '/lien-he',
    en: '/contact',
    zh: '/lianxi'
  },

  '/tracking': {
    vi: '/tra-cuu',
    en: '/tracking',
    zh: '/chaxun'
  },

  '/manifesto': {
    vi: '/tuyen-ngon',
    en: '/manifesto',
    zh: '/xuanyan'
  },

  '/terms': {
    vi: '/dieu-khoan',
    en: '/terms',
    zh: '/tiaokuan'
  },

  '/privacy': {
    vi: '/chinh-sach-bao-mat',
    en: '/privacy',
    zh: '/yinsi'
  }
} as const;

// Tạo navigation helpers với pathnames đã cấu hình
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation({
    locales,
    pathnames,
    localePrefix
  });