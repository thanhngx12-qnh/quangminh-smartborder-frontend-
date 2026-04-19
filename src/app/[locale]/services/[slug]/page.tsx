// dir: frontend/src/app/[locale]/services/[slug]/page.tsx
import { Metadata } from 'next';
import { getServiceBySlug } from '@/lib/data-fetchers';
import { notFound } from 'next/navigation';
import ServiceDetailClient from './ServiceDetailClient';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

/**
 * NÂNG CẤP V2.0: XỬ LÝ SEO THEO CƠ CHẾ FALLBACK & ĐA NGÔN NGỮ
 * Giúp Zalo/Facebook lấy được ảnh và mô tả chuẩn xác từ Admin.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await getServiceBySlug(slug, locale);

  if (!service) return { title: 'Dịch vụ - Tà Lùng Logistics' };

  // Tìm bản dịch hiện tại
  const t = service.translations.find((tr) => tr.locale === locale) || service.translations[0];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://talunglogistics.com';

  // --- LOGIC LẤY DỮ LIỆU SEO THEO THỨ TỰ ƯU TIÊN (FALLBACK THEO DOC V2.0) ---
  const title = t.metaTitle || t.title;
  const description = t.metaDescription || t.shortDesc || "";
  const keywords = t.metaKeywords || "";
  const image = t.ogImage || service.coverImage || `${baseUrl}/og-image.jpg`;

  // --- CẤU HÌNH HREFLANG (SEO ĐA NGÔN NGỮ) ---
  const languages: Record<string, string> = {};
  service.translations.forEach((tr) => {
    const langCode = tr.locale === 'vi' ? 'vi-VN' : tr.locale === 'en' ? 'en-US' : 'zh-CN';
    const prefix = tr.locale === 'vi' ? '' : `/${tr.locale}`;
    languages[langCode] = `${prefix}/services/${tr.slug}`;
  });

  // URL hiện tại (xử lý bỏ /vi nếu là tiếng Việt để khớp cấu hình as-needed)
  const currentPathPrefix = locale === 'vi' ? '' : `/${locale}`;
  const currentUrl = `${baseUrl}${currentPathPrefix}/services/${t.slug}`;

  return {
    metadataBase: new URL(baseUrl),
    title: `${title} | Tà Lùng Logistics`,
    description: description,
    keywords: keywords,
    alternates: {
      canonical: currentUrl,
      languages: languages,
    },
    openGraph: {
      title: title,
      description: description,
      url: currentUrl,
      siteName: 'Tà Lùng Logistics',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [image],
    },
  };
}

/**
 * SERVER COMPONENT
 */
export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  
  // 1. Thử fetch với locale hiện tại của trình duyệt/người dùng
  let service = await getServiceBySlug(slug, locale);

  // 2. CƠ CHẾ DÒ TÌM THÔNG MINH (TRÁNH LỖI 404 KHI BOT QUÉT NHẦM SLUG)
  if (!service) {
    const otherLocales = (['vi', 'en', 'zh'] as const).filter(l => l !== locale);
    for (const l of otherLocales) {
      service = await getServiceBySlug(slug, l);
      if (service) break;
    }
  }

  if (!service) {
    notFound();
  }

  // Truyền dữ liệu xuống Client Component để xử lý giao diện
  return <ServiceDetailClient serviceData={service} locale={locale} slug={slug} />;
}