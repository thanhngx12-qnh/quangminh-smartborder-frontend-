// dir: ~/quangminh-smart-border/frontend/src/components/sections/HomePage/LatestNewsSection.tsx
'use client';

import { useTranslations, useLocale } from 'next-intl';
import styled from 'styled-components';
import { Link } from '@/navigation';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { useFeaturedNews } from '@/hooks/useNews'; // Import Hook mới
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';

// --- Styled Components (Giữ nguyên, chỉ chỉnh nhẹ ImageWrapper) ---
const SectionWrapper = styled.section`
  padding: 80px 20px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin: 0 auto 60px auto;

  h2 {
    font-size: 36px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 10px;
  }
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const NewsCard = styled(Link)`
  display: flex; /* Chuyển sang flex để footer card đều nhau */
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  background-color: ${({ theme }) => theme.colors.background};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* Tỷ lệ 16:9 chuẩn đẹp */
  overflow: hidden;
`;

const CardContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  time {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textMuted};
    margin-bottom: 8px;
    display: block;
  }

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  p {
    font-size: 16px;
    color: #666;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: auto; /* Đẩy nội dung lên trên */
  }
`;

const ViewAllButtonWrapper = styled.div`
  text-align: center;
  margin-top: 60px;
`;

const LoadingState = styled.div`
  text-align: center; 
  padding: 40px; 
  color: #888;
`;

// Helper format ngày
const formatDate = (dateString: string, locale: string) => {
  try {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateString));
  } catch (e) {
    return '';
  }
};

// --- Main Component ---
// Bỏ props news, vì component tự fetch
export default function LatestNewsSection() { 
  const t = useTranslations('LatestNews');
  const locale = useLocale();
  
  // Gọi Hook lấy tin nổi bật
  const { news, isLoading, isError } = useFeaturedNews(locale);

  // Xử lý Loading
  if (isLoading) {
    return (
      <SectionWrapper>
        <SectionHeader><h2>{t('title')}</h2></SectionHeader>
        <LoadingState>Loading...</LoadingState>
      </SectionWrapper>
    );
  }

  // Nếu không có tin nào
  if (!news || news.length === 0) {
    return null; // Ẩn luôn section nếu không có bài nổi bật
  }

  return (
    <SectionWrapper>
      <FadeInWhenVisible>
        <SectionHeader>
          <h2>{t('title')}</h2>
          <p>{t('subtitle') || 'Những tin tức mới nhất và nổi bật từ chúng tôi'}</p>
        </SectionHeader>
      </FadeInWhenVisible>

      <NewsGrid>
        {news.map((article, index) => {
          // Logic tìm bản dịch an toàn
          const translation = article.translations?.find(t => t.locale === locale) 
                              || article.translations?.[0];

          if (!translation) return null;

          return (
            <FadeInWhenVisible key={article.id} transition={{ delay: index * 0.1 }}>
              {/* Đã thêm as="a" và prefetch={false} để tránh load quá nhiều */}
              <NewsCard href={`/news/${translation.slug}`} as="a">
                <ImageWrapper>
                  <Image 
                    src={article.coverImage || '/placeholder.jpg'} 
                    alt={translation.title || 'News'} 
                    fill 
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                  />
                </ImageWrapper>
                <CardContent>
                  {article.publishedAt && (
                    <time>{formatDate(article.publishedAt, locale)}</time>
                  )}
                  <h3>{translation.title}</h3>
                  <p>{translation.excerpt}</p>
                </CardContent>
              </NewsCard>
            </FadeInWhenVisible>
          );
        })}
      </NewsGrid>

      <FadeInWhenVisible>
        <ViewAllButtonWrapper>
          <Button as="a" href="/news" variant="secondary">
            {t('viewAll')}
          </Button>
        </ViewAllButtonWrapper>
      </FadeInWhenVisible>
    </SectionWrapper>
  );
}