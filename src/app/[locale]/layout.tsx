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
const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Hàm tạo Metadata động (ĐÃ SỬA LỖI THEO CÁCH CHUẨN)
type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  let messages;
  try {
    // SỬA Ở ĐÂY: Import trực tiếp file JSON, không cần hàm của next-intl
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://talunglogistics.com';
  
  // Lấy dữ liệu trực tiếp từ file JSON đã import
  const brandName = messages.Brand?.name || 'Tà Lùng Logistics';
  const defaultTitle = messages.Metadata?.defaultTitle || 'Tà Lùng Logistics | Giải pháp Logistics biên mậu Việt - Trung';
  const defaultDescription = messages.Metadata?.defaultDescription || 'Giải pháp Logistics toàn diện Việt - Trung.';
  const keywords = messages.Metadata?.keywords || 'logistics, tà lùng, việt trung';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: `%s | ${brandName}`,
      default: defaultTitle,
    },
    description: defaultDescription,
    keywords: keywords,
    
    icons: {
      icon: '/images/logo.png',
      apple: '/apple-touch-icon.png',
    },
    
    openGraph: {
      title: defaultTitle,
      description: defaultDescription,
      url: baseUrl,
      siteName: brandName,
      images: [
        {
          url: `${baseUrl}/images/logo.png`,
          width: 1200,
          height: 630,
          alt: `${brandName} Banner`,
        },
      ],
      locale: locale,
      type: 'website',
    },

    alternates: {
      canonical: `/${locale}`,
      languages: {
        'vi-VN': '/vi',
        'en-US': '/en',
        'zh-CN': '/zh',
        'x-default': '/vi',
      },
    },
  };
}

// Layout Component (giữ nguyên)
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
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