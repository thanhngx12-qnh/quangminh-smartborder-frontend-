// dir: frontend/src/app/[locale]/news/page.tsx
'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams, useRouter } from 'next/navigation';
import styled from 'styled-components';
import { usePaginatedNews } from '@/hooks/useNews';
import { useCategories } from '@/hooks/useCategories';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import Pagination from '@/components/ui/Pagination';
import { Link } from '@/navigation';
import Image from 'next/image';
import CardSkeleton from '@/components/ui/CardSkeleton';
import ErrorState from '@/components/ui/ErrorState';
import { ButtonLink } from '@/components/ui/Button';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { RiCalendarLine, RiArrowRightLine, RiInformationLine, RiHashtag } from 'react-icons/ri';

// --- Styled Components (Giữ nguyên giao diện cao cấp) ---
const PageWrapper = styled.div` background-color: ${({ theme }) => theme.colors.background}; min-height: 100vh; `;
const HeroSection = styled.section` background-color: ${({ theme }) => theme.colors.primary}; padding: 80px 20px; text-align: center; color: ${({ theme }) => theme.colors.white}; border-bottom: 4px solid ${({ theme }) => theme.colors.accent}; h1 { font-family: ${({ theme }) => theme.fonts.heading}; font-size: clamp(28px, 5vw, 48px); font-weight: 800; text-transform: uppercase; color: ${({ theme }) => theme.colors.white}; margin: 0; } .category-badge { display: inline-flex; align-items: center; gap: 8px; background-color: ${({ theme }) => theme.colors.accent}; padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; margin-top: 15px; text-transform: uppercase; } `;
const ContentContainer = styled.div` max-width: 1200px; margin: 0 auto; padding: 40px 20px 80px; `;
const NewsGrid = styled.div` display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; align-items: stretch; @media (max-width: 992px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 640px) { grid-template-columns: 1fr; } `;
const PaginationWrapper = styled.div` margin-top: 60px; display: flex; justify-content: center; `;
const SeoContentSection = styled.section` margin-top: 80px; padding-top: 60px; border-top: 1px solid ${({ theme }) => theme.colors.border}; `;
const SeoTextWrapper = styled.div` max-width: 900px; margin: 0 auto; h2 { font-family: ${({ theme }) => theme.fonts.heading}; font-size: 28px; color: ${({ theme }) => theme.colors.primary}; margin-bottom: 24px; display: flex; align-items: center; gap: 12px; svg { color: ${({ theme }) => theme.colors.accent}; } } p { font-size: 16px; line-height: 1.8; color: ${({ theme }) => theme.colors.textSecondary}; white-space: pre-line; text-align: justify; strong, b { color: ${({ theme }) => theme.colors.primary}; font-weight: 600; } } `;
const CtaBanner = styled.div` margin-top: 80px; background-color: ${({ theme }) => theme.colors.surfaceAlt}; padding: 60px; border-radius: 20px; text-align: center; border: 1px solid ${({ theme }) => theme.colors.border}; h3 { font-family: ${({ theme }) => theme.fonts.heading}; font-size: 28px; color: ${({ theme }) => theme.colors.primary}; margin-bottom: 16px; } p { margin-bottom: 32px; color: ${({ theme }) => theme.colors.textSecondary}; } @media (max-width: 768px) { padding: 40px 20px; } `;
const NewsCard = styled(Link)` display: flex; flex-direction: column; border-radius: 12px; overflow: hidden; background-color: ${({ theme }) => theme.colors.surface}; box-shadow: ${({ theme }) => theme.shadows.card}; transition: all 0.3s ease; height: 100%; text-decoration: none; border-bottom: 3px solid transparent; &:hover { transform: translateY(-8px); box-shadow: ${({ theme }) => theme.shadows.hover}; border-bottom-color: ${({ theme }) => theme.colors.accent}; .card-title { color: ${({ theme }) => theme.colors.accent}; } .card-image img { transform: scale(1.1); } } `;
const ImageWrapper = styled.div` position: relative; width: 100%; padding-top: 60%; overflow: hidden; background-color: ${({ theme }) => theme.colors.border}; img { object-fit: cover; transition: transform 0.5s ease; } `;
const CardContent = styled.div` padding: 24px; display: flex; flex-direction: column; flex-grow: 1; `;
const MetaInfo = styled.div` display: flex; align-items: center; gap: 6px; font-size: 13px; color: ${({ theme }) => theme.colors.textMuted}; margin-bottom: 12px; svg { color: ${({ theme }) => theme.colors.accent}; } `;

// --- Main Component ---
export default function NewsPage() {
  const locale = useLocale();
  const t = useTranslations('LatestNews');
  const tNav = useTranslations('Navigation');
  const tErrors = useTranslations('Errors');
  const tGeneral = useTranslations('General');
  const tNotFound = useTranslations('NotFound');
  const searchParams = useSearchParams();
  const router = useRouter(); 

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const categoryId = searchParams.get('categoryId') || undefined;

  // 1. SỬA LỖI TS2554: Gọi hook đúng số lượng tham số quy định (2 args)
  const { result, isLoading, isError } = usePaginatedNews(locale, currentPage);
  
  const { categories } = useCategories('NEWS');
  const currentCategory = categories.find(c => c.id.toString() === categoryId);

  // --- LOGIC LỌC DỮ LIỆU TẠI FRONTEND (Vì không sửa được Hook) ---
  const displayData = categoryId && result?.data 
    ? result.data.filter(item => item.categoryId?.toString() === categoryId)
    : result?.data;

  const handleRetry = () => window.location.reload();

  const formatDate = (dateString: string) => {
    try {
      return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateString));
    } catch { return dateString; }
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
      return <ErrorState title={tErrors('failedToLoad')} description="Error fetching news" actionText={tErrors('retry')} onAction={handleRetry} />;
    }
    
    if (!displayData || displayData.length === 0) {
      // SỬA LỖI ESLINT: đổi as any thành as never
      return <ErrorState title={t('noNewsInCategory')} description={tNotFound('description')} actionText={tGeneral('viewAll')} onAction={() => router.push('/news' as never)} />;
    }

    return (
      <>
        <NewsGrid>
          {displayData.map((article, index) => {
            const translation = article.translations?.find(t => t.locale === locale) || article.translations?.[0];
            if (!translation) return null;

            return (
              <FadeInWhenVisible key={article.id} delay={index * 0.1}>
                <NewsCard href={`/news/${translation.slug}`} as="a">
                  <ImageWrapper className="card-image">
                    <Image src={article.coverImage || '/images/placeholder.jpg'} alt={translation.title} fill sizes="(max-width: 768px) 100vw, 33vw" />
                  </ImageWrapper>
                  <CardContent>
                    <MetaInfo>
                      <RiCalendarLine />
                      <time>{article.publishedAt ? formatDate(article.publishedAt) : ''}</time>
                    </MetaInfo>
                    <h3 className="card-title" style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, transition: 'color 0.2s' }}>
                      {translation.title}
                    </h3>
                    <p style={{ fontSize: 15, color: '#666', lineHeight: 1.6, marginBottom: 20 }}>{translation.excerpt}</p>
                    <div style={{ marginTop: 'auto', fontWeight: 600, fontSize: 14, color: '#003366', display: 'flex', alignItems: 'center', gap: 6 }}>
                      {t('readMore')} <RiArrowRightLine />
                    </div>
                  </CardContent>
                </NewsCard>
              </FadeInWhenVisible>
            );
          })}
        </NewsGrid>
        
        {result && result.lastPage > 1 && (
          <PaginationWrapper>
            <Pagination currentPage={result.page} totalPages={result.lastPage} basePath="/news" />
          </PaginationWrapper>
        )}
      </>
    );
  };

  return (
    <PageWrapper>
      <HeroSection>
        <FadeInWhenVisible>
          <Breadcrumbs items={[{ label: tNav('news'), href: categoryId ? '/news' : undefined }, ...(currentCategory ? [{ label: currentCategory.name }] : [])]} />
          <h1>{currentCategory ? currentCategory.name : t('title')}</h1>
          {currentCategory && (
            <div className="category-badge">
              <RiHashtag /> {t('categoryPrefix')}
            </div>
          )}
        </FadeInWhenVisible>
      </HeroSection>

      <ContentContainer>
        {renderContent()}

        {!categoryId && (
          <>
            <FadeInWhenVisible delay={0.3}>
              <SeoContentSection>
                <SeoTextWrapper>
                  <h2><RiInformationLine /> {t('seoTitle')}</h2>
                  <p>{t.rich('seoContent', { bold: (c) => <strong>{c}</strong> })}</p>
                </SeoTextWrapper>
              </SeoContentSection>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.4}>
              <CtaBanner>
                <h3>{t('ctaTitle')}</h3>
                <p>{t('ctaDescription')}</p>
                <ButtonLink href="/contact" variant="primary" size="large" as="a">
                  {t('ctaButton')} <RiArrowRightLine style={{marginLeft: 8}} />
                </ButtonLink>
              </CtaBanner>
            </FadeInWhenVisible>
          </>
        )}
      </ContentContainer>
    </PageWrapper>
  );
}