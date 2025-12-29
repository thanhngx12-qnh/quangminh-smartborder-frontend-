// dir: frontend/src/app/[locale]/layout.tsx
import StyledComponentsRegistry from "@/lib/registry";
import { Providers } from "@/app/providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/shared/FloatingButtons";
import { Inter, Montserrat } from "next/font/google"; // Import Font Google
import type { Metadata } from 'next';

// Cấu hình Font: Inter cho văn bản thường
const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

// Cấu hình Font: Montserrat cho tiêu đề (Mạnh mẽ, hiện đại)
const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: '%s | Tà Lùng Logistics',
    default: 'Công ty TNHH Thương mại Vận tải Phú Anh - Tà Lùng Logistics',
  },
  description: 'Giải pháp Logistics toàn diện Việt - Trung: Kho bãi, Xuất nhập khẩu, Vận tải',
};

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  const timeZone = "Asia/Ho_Chi_Minh";

  // Load file ngôn ngữ, fallback về tiếng Việt nếu lỗi
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Missing messages for locale: ${locale}`, error);
    messages = (await import(`../../messages/vi.json`)).default;
  }

  return (
    <html lang={locale} className={`${inter.variable} ${montserrat.variable}`}>
      <body>
        <StyledComponentsRegistry>
          <Providers locale={locale} messages={messages} timeZone={timeZone}>
            {/* Wrapper flex column để footer luôn ở đáy */}
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