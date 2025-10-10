// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "@/lib/registry";
import { Providers } from "@/app/providers";
import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quang Minh Smart Border",
  description: "Modern Logistics Solutions at Ta Lung Border Gate",
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode; // <-- SỬA LỖI Ở ĐÂY: React.ReactNode (không có dấu gạch nối)
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
            {/* <Footer /> */}
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}