// dir: ~/quangminh-smart-border/frontend/src/i18n.ts
import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
 
export const locales = ['vi', 'en', 'zh'];
 
export default getRequestConfig(async ({locale}) => {
  if (!locale) notFound();
  const baseLocale = new Intl.Locale(locale).baseName;
  if (!locales.includes(baseLocale)) notFound();
 
  return {
    locale: baseLocale,
    messages: (await import(`./messages/${baseLocale}.json`)).default,
    // THÊM CẤU HÌNH TIMEZONE Ở ĐÂY
    timeZone: 'Asia/Ho_Chi_Minh'
  };
});