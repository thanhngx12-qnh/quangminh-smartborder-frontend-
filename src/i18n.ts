// dir: frontend/src/i18n.ts
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales } from './navigation';

export default getRequestConfig(async ({ locale }) => {
  // 1. Kiểm tra nếu locale bị undefined hoặc không nằm trong danh sách hỗ trợ
  // Ép kiểu 'as never' là cách sạch nhất để check .includes mà không bị ESLint báo lỗi 'any'
  if (!locale || !locales.includes(locale as never)) {
    notFound();
  }

  return {
    // 2. Trả về locale. Lúc này TS đã hiểu locale chắc chắn là string nhờ lệnh check ở trên
    locale: locale, 
    messages: (await import(`./messages/${locale}.json`)).default,
    timeZone: 'Asia/Ho_Chi_Minh'
  };
});