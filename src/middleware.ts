// dir: ~/quangminh-smart-border/frontend/middleware.ts
import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['vi', 'en', 'zh'],
  defaultLocale: 'vi',
  localePrefix: 'always' // <-- THÊM DÒNG NÀY
});
 
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};