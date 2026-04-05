// dir: frontend/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { locales, pathnames, localePrefix } from './navigation'; 
 
export default createMiddleware({
  locales,
  pathnames,
  // Đảm bảo mặc định là tiếng Việt
  defaultLocale: 'vi',
  
  // SỬA Ở ĐÂY 1: Phải khớp với cấu hình trong navigation.ts
  localePrefix: 'as-needed',
  
  // SỬA Ở ĐÂY 2: Quan trọng nhất để không bị nhảy sang /en
  // Tắt tính năng tự động phát hiện ngôn ngữ trình duyệt
  localeDetection: false 
});
 
export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)']
};