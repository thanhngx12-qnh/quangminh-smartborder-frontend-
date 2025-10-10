// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// Chúng ta sẽ không dùng bất kỳ hàm server nào của next-intl ở đây nữa
import StyledComponentsRegistry from "@/lib/registry";
import { Providers } from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = { /*...*/ };

// Chúng ta vẫn cần async để có thể await import
export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    // TỰ MÌNH IMPORT FILE MESSAGE DỰA TRÊN LOCALE TỪ PARAMS
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Could not load messages for locale: ${locale}`, error);
    // Nếu không tìm thấy file message, chúng ta có thể dùng một file mặc định hoặc báo lỗi
    // Ở đây, ta sẽ load file 'vi' làm fallback
    messages = (await import(`../../messages/vi.json`)).default;
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Providers locale={locale} messages={messages}>
            {children}
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}