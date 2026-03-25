// dir: frontend/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { locales, pathnames, localePrefix } from './navigation'; // Đường dẫn import có thể thay đổi tùy vị trí thư mục của bạn
 
export default createMiddleware({
  locales,
  defaultLocale: 'vi',
  localePrefix,
  pathnames // QUAN TRỌNG: Truyền pathnames vào middleware để nó biết cách chuyển hướng URL
});
 
export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)']
};