// dir: frontend/src/app/[locale]/layout.tsx
import StyledComponentsRegistry from "@/lib/registry";
import { Providers } from "@/app/providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/shared/FloatingButtons";
import { Inter, Montserrat } from "next/font/google";
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Cấu hình Font (giữ nguyên)
const inter = Inter({ subsets: ["latin", "vietnamese"], variable: "--font-inter", display: "swap" });
const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Định nghĩa Type cho props, giờ đây params là một Promise
type Props = {
  params: Promise<{ locale: string }>;
};

// Hàm generateMetadata (ĐÃ SỬA LỖI)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // SỬA Ở ĐÂY: Dùng `await` để lấy locale từ Promise
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://talunglogistics.com';
  const brandName = messages.Brand?.name || 'Tà Lùng Logistics';
  const defaultTitle = messages.Metadata?.defaultTitle || 'Tà Lùng Logistics';
  const defaultDescription = messages.Metadata?.defaultDescription || '';
  const keywords = messages.Metadata?.keywords || '';

  return {
    metadataBase: new URL(baseUrl),
    title: { template: `%s | ${brandName}`, default: defaultTitle },
    description: defaultDescription,
    keywords: keywords,
    icons: {
      icon: '/logo.png',  // Hoặc array nếu muốn nhiều kích thước
      apple: '/apple-touch-icon.png',  // Nếu có riêng cho iOS
    },
    openGraph: {
      title: defaultTitle,
      description: defaultDescription,
      url: baseUrl,
      siteName: brandName,
      images: [{ url: `${baseUrl}/og-image.jpg`, width: 1200, height: 630 }],
      locale: locale,
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}`,
      languages: { 'vi-VN': '/vi', 'en-US': '/en', 'zh-CN': '/zh', 'x-default': '/vi' },
    },
  };
}

// Layout Component (ĐÃ SỬA LỖI)
export default async function LocaleLayout({
  children,
  params, // Nhận params như một Promise
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // Định nghĩa type cho params là Promise
}) {
  // SỬA Ở ĐÂY: Dùng `await` để lấy locale từ Promise
  const { locale } = await params;
  const timeZone = "Asia/Ho_Chi_Minh";

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    messages = (await import(`../../messages/vi.json`)).default;
  }

  return (
    <html lang={locale} className={`${inter.variable} ${montserrat.variable}`}>
      <body>
        <StyledComponentsRegistry>
          <Providers locale={locale} messages={messages} timeZone={timeZone}>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Header />
              <main style={{ flex: 1 }}>
                {children}
              </main>
              <Footer />
            </div>
            <FloatingButtons />
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}