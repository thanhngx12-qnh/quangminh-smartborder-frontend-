// dir: frontend/src/app/[locale]/services/[slug]/page.tsx
import { Metadata } from 'next';
import { getServiceBySlug } from '@/lib/data-fetchers';
import { notFound } from 'next/navigation';
import ServiceDetailClient from './ServiceDetailClient';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

/**
 * CẤU HÌNH SEO & SHARE ẢNH ĐẸP (SERVER SIDE)
 * Giúp Zalo/Facebook lấy được ảnh và mô tả ngay lập tức
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await getServiceBySlug(slug, locale);

  if (!service) return {};

  const translation = service.translations.find((t) => t.locale === locale) || service.translations[0];
  const baseUrl = 'https://talunglogistics.com';

  // Tự động lấy dữ liệu từ Admin để làm SEO
  const seoTitle = `${translation.title} | Tà Lùng Logistics`;
  const seoDescription = translation.shortDesc || "Dịch vụ logistics chuyên nghiệp tại Cửa khẩu Quốc tế Tà Lùng.";
  const ogImage = service.coverImage || `${baseUrl}/og-image.jpg`;

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `${baseUrl}/${locale}/services/${translation.slug}`,
      siteName: 'Tà Lùng Logistics',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: translation.title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [ogImage],
    },
  };
}

/**
 * SERVER COMPONENT
 */
export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  const service = await getServiceBySlug(slug, locale);

  if (!service) {
    notFound();
  }

  // Truyền dữ liệu xuống Client Component
  return <ServiceDetailClient serviceData={service} locale={locale} slug={slug} />;
}