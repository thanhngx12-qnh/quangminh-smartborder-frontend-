// dir: frontend/src/navigation.ts
import { createNavigation } from 'next-intl/navigation';

export const locales = ['vi', 'en', 'zh'] as const;

// SỬA Ở ĐÂY: Đổi từ 'always' sang 'as-needed'
// Điều này giúp tiếng Việt (defaultLocale) biến mất khỏi thanh địa chỉ
export const localePrefix = 'as-needed';

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