// dir: ~/quangminh-smart-border/frontend/src/navigation.ts
import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from './i18n';

// Định nghĩa các pathnames (nếu muốn dịch URL sau này)
export const pathnames = {};

// Sử dụng đúng tên hàm để tạo navigation helpers
export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames,
  });
