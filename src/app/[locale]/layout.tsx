// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/layout.tsx
import StyledComponentsRegistry from "@/lib/registry";
import { Providers } from "@/app/providers";
import Header from "@/components/layout/Header"; // <-- THÊM LẠI IMPORT
import Footer from "@/components/layout/Footer"; // <-- THÊM LẠI IMPORT

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
    console.error(`Could not load messages for locale: ${locale}. Falling back to 'vi'.`);
    messages = (await import(`../../messages/vi.json`)).default;
  }

  return (
    <html lang={locale}>
      <body>
        <StyledComponentsRegistry>
          <Providers locale={locale} messages={messages} timeZone={timeZone}>
            {/* THÊM HEADER VÀ FOOTER VÀO ĐÂY */}
            <Header />
            <main>{children}</main>
            <Footer />
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}