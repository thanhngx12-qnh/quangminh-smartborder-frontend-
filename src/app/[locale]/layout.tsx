// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "@/lib/registry";
import { Providers } from "@/app/providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer"; // <-- Import Footer

const inter = Inter({ subsets: ["latin"] });

export const metadata = { /*...*/ };

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;
  const timeZone = 'Asia/Ho_Chi_Minh';
  
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    messages = (await import(`../../messages/vi.json`)).default;
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Providers locale={locale} messages={messages} timeZone={timeZone}>
            <Header />
            <main>{children}</main>
            <Footer /> {/* <-- Thêm Footer vào đây */}
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}