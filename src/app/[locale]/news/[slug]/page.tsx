// dir: frontend/src/app/[locale]/news/[slug]/page.tsx
import { Metadata } from 'next';
import { getNewsBySlug } from '@/lib/data-fetchers';
import { notFound } from 'next/navigation';
import NewsDetailClient from './NewsDetailClient';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

/**
 * NÂNG CẤP V3.0: XỬ LÝ SEO THEO CƠ CHẾ FALLBACK
 * Chạy hoàn toàn trên Server giúp Bot MXH lấy được thông tin ngay lập tức.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const news = await getNewsBySlug(slug, locale);

  if (!news) return { title: 'Tin tức - Tà Lùng Logistics' };

  // Tìm bản dịch hiện tại
  const t = news.translations.find((tr) => tr.locale === locale) || news.translations[0];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://talunglogistics.com';

  // --- LOGIC LẤY DỮ LIỆU SEO THEO THỨ TỰ ƯU TIÊN (FALLBACK) ---
  const title = t.metaTitle || t.title;
  const description = t.metaDescription || t.excerpt || "";
  const keywords = t.metaKeywords || "";
  const image = t.ogImage || news.coverImage || `${baseUrl}/og-image.jpg`;

  // --- CẤU HÌNH HREFLANG (SEO ĐA NGÔN NGỮ) ---
  const languages: Record<string, string> = {};
  news.translations.forEach((tr) => {
    const langCode = tr.locale === 'vi' ? 'vi-VN' : tr.locale === 'en' ? 'en-US' : 'zh-CN';
    const prefix = tr.locale === 'vi' ? '' : `/${tr.locale}`;
    languages[langCode] = `${prefix}/news/${tr.slug}`;
  });

  // URL hiện tại (xử lý bỏ /vi nếu là tiếng Việt)
  const currentPathPrefix = locale === 'vi' ? '' : `/${locale}`;
  const currentUrl = `${baseUrl}${currentPathPrefix}/news/${t.slug}`;

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
      type: 'article',
      publishedTime: news.publishedAt,
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
 * Component chính (Server side)
 */
export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  
  // Dò tìm slug thông minh giữa các ngôn ngữ (Phòng lỗi 404 khi Bot quét nhầm)
  let news = await getNewsBySlug(slug, locale);

  if (!news) {
    const otherLocales = (['vi', 'en', 'zh'] as const).filter(l => l !== locale);
    for (const l of otherLocales) {
      news = await getNewsBySlug(slug, l);
      if (news) break;
    }
  }

  if (!news) {
    notFound();
  }

  const t = news.translations.find((tr) => tr.locale === locale) || news.translations[0];

  // --- THÊM SCHEMA NEWSARTICLE CHO GOOGLE BOT ---
  const newsSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": t.title,
    "image": [news.coverImage || 'https://talunglogistics.com/og-image.jpg'],
    "datePublished": news.publishedAt,
    "author": [{
        "@type": "Organization",
        "name": "Tà Lùng Logistics",
        "url": "https://talunglogistics.com"
      }]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsSchema) }}
      />
      {/* ĐÃ FIX LỖI: Chỉ truyền newsData và locale, không truyền slug dư thừa */}
      <NewsDetailClient newsData={news} locale={locale} />
    </>
  );
}