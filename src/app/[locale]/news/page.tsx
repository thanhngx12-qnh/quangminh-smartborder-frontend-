// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/news/page.tsx
'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { usePaginatedNews } from '@/hooks/useNews';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import Pagination from '@/components/ui/Pagination';
import { Link } from '@/navigation';
import Image from 'next/image';

// --- Styled Components ---
const PageWrapper = styled.div`
  padding: 80px 20px;
  background-color: ${({ theme }) => theme.colors.surface};
  min-height: 80vh;
`;

const PageHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px auto;

  h1 {
    font-size: 48px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 16px;
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
  display: flex; // <-- Quan trọng: Chuyển sang flexbox
  flex-direction: column; // <-- Quan trọng: Hướng cột
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  background-color: ${({ theme }) => theme.colors.background};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; // <-- Quan trọng: Dùng tỷ lệ 16:9
  overflow: hidden;
`;

const CardContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1; // <-- Quan trọng: Cho phép content co giãn

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  p {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: auto; // <-- Quan trọng: Đẩy các phần tử khác xuống
  }
`;

const LoadingState = styled.p`
  text-align: center;
  font-size: 18px;
  padding: 40px;
`;
const ErrorState = styled.p`
  text-align: center;
  font-size: 18px;
  padding: 40px;
  color: ${({ theme }) => theme.colors.error};
`;

// Helper để format ngày tháng (nếu bạn muốn thêm lại)
const formatDate = (dateString: string, locale: string) => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString));
};

// --- Main Component ---
export default function NewsPage() {
  const locale = useLocale();
  const t = useTranslations('LatestNews');
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const { result, isLoading, isError } = usePaginatedNews(locale, currentPage);

  const renderContent = () => {
    if (isLoading) return <LoadingState>Loading news...</LoadingState>;
    if (isError) return <ErrorState>Failed to load news.</ErrorState>;
    if (!result || result.data.length === 0) return <p style={{textAlign: 'center'}}>No news articles found.</p>;

    return (
      <>
        <NewsGrid>
          {result.data.map((article, index) => {
            const translation = article.translations.find(t => t.locale === locale) || article.translations[0];
            return (
              <FadeInWhenVisible key={article.id} transition={{ delay: index * 0.1 }}>
                <NewsCard href={`/news/${translation.slug}`} as="a">
                  <ImageWrapper>
                    <Image 
                      src={article.coverImage || '/placeholder.jpg'} 
                      alt={translation.title} 
                      fill 
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </ImageWrapper>
                  <CardContent>
                    {article.publishedAt && <time style={{fontSize: '14px', color: '#999', marginBottom: '8px'}}>{formatDate(article.publishedAt, locale)}</time>}
                    <h3>{translation.title}</h3>
                    <p>{translation.excerpt}</p>
                  </CardContent>
                </NewsCard>
              </FadeInWhenVisible>
            );
          })}
        </NewsGrid>
        <Pagination 
          currentPage={result.page} 
          totalPages={result.lastPage}
          basePath="/news"
        />
      </>
    );
  };

  return (
    <PageWrapper>
      <FadeInWhenVisible>
        <PageHeader>
          <h1>{t('title')}</h1>
        </PageHeader>
      </FadeInWhenVisible>
      {renderContent()}
    </PageWrapper>
  );
}