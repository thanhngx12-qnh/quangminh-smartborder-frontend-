// dir: frontend/src/app/[locale]/news/[slug]/page.tsx
import { Metadata } from 'next';
import { getNewsBySlug } from '@/lib/data-fetchers';
import { notFound } from 'next/navigation';
import NewsDetailClient from './NewsDetailClient';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

/**
 * PHẦN QUAN TRỌNG NHẤT: XỬ LÝ SEO VÀ SHARE ẢNH ĐẸP
 * Hàm này chạy trên Server, Bot Facebook/Zalo sẽ đọc được ngay.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const news = await getNewsBySlug(slug, locale);

  if (!news) return {};

  const translation = news.translations.find((t) => t.locale === locale) || news.translations[0];
  const baseUrl = 'https://talunglogistics.com';
  
  // Tự động lấy Title bài viết làm SEO Title
  const seoTitle = `${translation.title} | Tà Lùng Logistics`;
  
  // Tự động lấy Excerpt làm Meta Description
  const seoDescription = translation.excerpt || "Tin tức logistics biên mậu Việt - Trung mới nhất tại Cửa khẩu Quốc tế Tà Lùng.";
  
  // Tự động lấy CoverImage làm ảnh Share (Zalo/FB)
  const ogImage = news.coverImage || `${baseUrl}/og-image.jpg`;

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `${baseUrl}/${locale}/news/${translation.slug}`,
      siteName: 'Tà Lùng Logistics',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: translation.title,
        },
      ],
      type: 'article',
      publishedTime: news.publishedAt,
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
 * Component chính (Server side)
 */
export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  const news = await getNewsBySlug(slug, locale);

  if (!news) {
    notFound();
  }

  // Truyền toàn bộ cục dữ liệu news xuống cho Client Component xử lý giao diện
  return <NewsDetailClient newsData={news} locale={locale} slug={slug} />;
}