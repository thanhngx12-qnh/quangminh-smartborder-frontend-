// dir: frontend/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { locales, pathnames, localePrefix, defaultLocale } from './navigation'; 
 
export default createMiddleware({
  locales,
  pathnames,
  defaultLocale,
  localePrefix,
  // Tắt tự động đoán ngôn ngữ để luôn ưu tiên Tiếng Việt ở tên miền gốc
  localeDetection: false 
});
 
export const config = {
  // Matcher cho phép chạy trên tất cả các trang, trừ file tĩnh và api
  matcher: ['/((?!api|_next|.*\\..*).*)']
};