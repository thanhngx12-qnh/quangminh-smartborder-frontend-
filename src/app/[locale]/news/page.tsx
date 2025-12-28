// dir: frontend/src/app/[locale]/news/page.tsx
'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams, useRouter } from 'next/navigation';
import styled from 'styled-components';
import { usePaginatedNews } from '@/hooks/useNews';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import Pagination from '@/components/ui/Pagination';
import { Link } from '@/navigation';
import Image from 'next/image';
import CardSkeleton from '@/components/ui/CardSkeleton';
import ErrorState from '@/components/ui/ErrorState'; // Import ErrorState
import { RiCalendarLine, RiArrowRightLine } from 'react-icons/ri';


// --- Styled Components ---

const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
`;

// 1. Hero Section
const HeroSection = styled.section`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 100px 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  border-bottom: 4px solid ${({ theme }) => theme.colors.accent};

  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 800;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.white};
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  align-items: stretch; // Đảm bảo card cao bằng nhau

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const PaginationWrapper = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
`;

// 2. News Card (Tái sử dụng style từ LatestNewsSection)
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 60%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.border};

  img {
    object-fit: cover;
    transition: transform 0.5s ease;
  }
`;

const CardContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 12px;
  
  svg { color: ${({ theme }) => theme.colors.accent}; }
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
  line-height: 1.4;
  transition: color 0.2s ease;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Excerpt = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReadMore = styled.div`
  margin-top: auto;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 6px;
  transition: gap 0.2s ease;
  svg { transition: transform 0.2s ease; }
`;

const NewsCard = styled(Link)`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: all 0.3s ease;
  height: 100%;
  text-decoration: none;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.hover};
    ${ImageWrapper} img { transform: scale(1.1); }
    ${Title} { color: ${({ theme }) => theme.colors.accent}; }
    ${ReadMore} { gap: 10px; color: ${({ theme }) => theme.colors.accent}; }
  }
`;

// Helper format ngày
const formatDate = (dateString: string, locale: string) => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric', month: 'long', day: 'numeric',
  }).format(new Date(dateString));
};
// --- Main Component ---
export default function NewsPage() {
  const locale = useLocale();
  const t = useTranslations('LatestNews');
  const tErrors = useTranslations('Errors');
  const searchParams = useSearchParams();
  const router = useRouter(); // Khởi tạo router
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // Hook gốc (chưa có refetch)
  const { result, isLoading, isError } = usePaginatedNews(locale, currentPage);

  // SỬA LỖI Ở ĐÂY: Dùng window.location.reload() thay cho refetch()
  const handleRetry = () => {
    window.location.reload();
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <NewsGrid>
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} hasMeta={true} />
          ))}
        </NewsGrid>
      );
    } 
    
    if (isError) {
      return (
        <ErrorState
          title={tErrors('failedToLoad')}
          description="Có lỗi xảy ra khi tải tin tức. Vui lòng thử lại."
          actionText={tErrors('retry')}
          onAction={handleRetry} // Gọi hàm reload trang
        />
      );
    }
    
    if (!result || !Array.isArray(result.data) || result.data.length === 0) {
      return (
        <ErrorState
          title="Chưa có bài viết nào"
          description="Hiện tại chưa có tin tức nào được đăng tải. Vui lòng quay lại sau."
        />
      );
    }

    return (
      <>
        <NewsGrid>
          {result.data.map((article, index) => {
            const translation = article.translations?.find(t => t.locale === locale) 
                                || article.translations?.[0];

            if (!translation) return null;

            return (
              <FadeInWhenVisible key={article.id} delay={index * 0.1}>
                <NewsCard href={`/news/${translation.slug}`} as="a">
                  <ImageWrapper>
                    <Image 
                      src={article.coverImage || '/images/placeholder.jpg'} 
                      alt={translation.title || 'News'} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </ImageWrapper>
                  <CardContent>
                    <MetaInfo>
                      <RiCalendarLine />
                      <time>{article.publishedAt ? formatDate(article.publishedAt, locale) : ''}</time>
                    </MetaInfo>
                    <Title>{translation.title}</Title>
                    <Excerpt>{translation.excerpt}</Excerpt>
                    <ReadMore>
                      Đọc tiếp <RiArrowRightLine />
                    </ReadMore>
                  </CardContent>
                </NewsCard>
              </FadeInWhenVisible>
            );
          })}
        </NewsGrid>
        
        {result.lastPage > 1 && (
          <PaginationWrapper>
            <Pagination 
              currentPage={result.page} 
              totalPages={result.lastPage}
              basePath="/news"
            />
          </PaginationWrapper>
        )}
      </>
    );
  };

  return (
    <PageWrapper>
      <HeroSection>
        <FadeInWhenVisible>
          <h1>{t('title')}</h1>
        </FadeInWhenVisible>
      </HeroSection>
      <ContentContainer>
        {renderContent()}
      </ContentContainer>
    </PageWrapper>
  );
}