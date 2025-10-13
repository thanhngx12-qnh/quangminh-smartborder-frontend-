// dir: ~/quangminh-smart-border/frontend/middleware.ts
import createMiddleware from 'next-intl/middleware';
 
const locales = ['vi', 'en', 'zh'];
 
export default createMiddleware({
  locales: locales,
  defaultLocale: 'vi',
  localePrefix: 'always'
});
 
export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)']
};