// dir: frontend/src/app/[locale]/layout.tsx
import StyledComponentsRegistry from "@/lib/registry";
import { Providers } from "@/app/providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/shared/FloatingButtons";
import { Inter, Montserrat } from "next/font/google";
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
// THÊM IMPORT CHÍNH CHỦ TỪ GOOGLE
import { GoogleTagManager } from '@next/third-parties/google'; 

// Cấu hình Font 
const inter = Inter({ subsets: ["latin", "vietnamese"], variable: "--font-inter", display: "swap" });
const montserrat = Montserrat({
  subsets:["latin", "vietnamese"],
  variable: "--font-montserrat",
  weight:["400", "500", "600", "700", "800"],
  display: "swap",
});

// Định nghĩa Type cho props
type Props = {
  params: Promise<{ locale: string }>;
};

// Hàm generateMetadata 
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://talunglogistics.com';
  const brandName = messages.Brand?.name || 'Tà Lùng Logistics';
  const defaultTitle = messages.Metadata?.defaultTitle || 'Tà Lùng Logistics | Giải pháp Logistics biên mậu Việt - Trung';
  const defaultDescription = messages.Metadata?.defaultDescription || 'Giải pháp Logistics toàn diện Việt - Trung tại Cửa khẩu Quốc tế Tà Lùng: Kho bãi, Xuất nhập khẩu, Vận tải.';
  const keywords = messages.Metadata?.keywords || 'logistics việt trung, vận tải biên mậu, cửa khẩu tà lùng';

  return {
    metadataBase: new URL(baseUrl),
    title: { template: `%s | ${brandName}`, default: defaultTitle },
    description: defaultDescription,
    keywords: keywords,
    icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
    
    // Xác minh Google Search Console
    verification: {
      google: "BM5F0x2whCH1lpfr_LwSI3vUYoFj7FxW9XfPhwuf1YU", 
    },

    openGraph: {
      title: defaultTitle,
      description: defaultDescription,
      url: baseUrl,
      siteName: brandName,
      images:[{ url: `${baseUrl}/og-image.jpg`, width: 1200, height: 630 }],
      locale: locale,
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}`,
      languages: { 'vi-VN': '/vi', 'en-US': '/en', 'zh-CN': '/zh', 'x-default': '/vi' },
    },
  };
}

// Layout Component
export default async function LocaleLayout({
  children,
  params, 
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; 
}) {
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
      {/* SỬ DỤNG COMPONENT CHÍNH CHỦ VỚI ID CỦA ANH */}
      <GoogleTagManager gtmId="GTM-5BD4XCML" />
      
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