// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/layout.tsx
import StyledComponentsRegistry from "@/lib/registry";
import { Providers } from "@/app/providers";

// BỎ TẤT CẢ CÁC IMPORT KHÔNG DÙNG ĐẾN
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";

// Bỏ metadata và Inter đi vì chúng ta đã xóa chúng ở bước trước
// export const metadata = { ... };
// const inter = ...;

// Props bây giờ phải nhận một Promise
type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// Hàm vẫn là async
export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  
  // AWAIT PARAMS Ở ĐÂY
  const { locale } = await params;
  
  const timeZone = 'Asia/Ho_Chi_Minh';
  
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    // Bỏ biến 'error' đi để tránh warning
    console.error(`Could not load messages for locale: ${locale}. Falling back to 'vi'.`);
    messages = (await import(`../../messages/vi.json`)).default;
  }

  return (
    <html lang={locale}>
      {/* Bỏ className đi vì không còn 'inter' nữa */}
      <body>
        <StyledComponentsRegistry>
          <Providers locale={locale} messages={messages} timeZone={timeZone}>
            {children}
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}