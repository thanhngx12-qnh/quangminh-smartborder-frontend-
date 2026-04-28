// dir: frontend/src/app/[locale]/services/page.tsx
'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams, useRouter } from 'next/navigation'; 
import styled from 'styled-components';
import { useAllServices } from '@/hooks/useServices';
import { useCategories } from '@/hooks/useCategories'; 
import ServiceCard from '@/components/shared/ServiceCard';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import CardSkeleton from '@/components/ui/CardSkeleton';
import Pagination from '@/components/ui/Pagination';
import ErrorState from '@/components/ui/ErrorState';
import { ButtonLink } from '@/components/ui/Button';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { RiArrowRightLine, RiInformationLine, RiHashtag } from 'react-icons/ri';
import { useMemo } from 'react';

// --- Styled Components ---
const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%);
  padding: 80px 20px 100px;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  border-bottom: 4px solid ${({ theme }) => theme.colors.accent};

  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: clamp(28px, 5vw, 48px);
    font-weight: 800;
    text-transform: uppercase;
    margin: 0;
    color: #FFFFFF;
  }

  .category-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background-color: ${({ theme }) => theme.colors.accent};
    padding: 6px 18px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    margin-top: 20px;
    text-transform: uppercase;
  }
`;

const BreadcrumbHeaderWrapper = styled.div`
  margin-bottom: 20px;
  nav ol li a { color: rgba(255, 255, 255, 0.8) !important; }
  nav ol li span.current { color: #FFFFFF !important; }
  nav ol li .separator { color: rgba(255, 255, 255, 0.4) !important; }
  nav ol li .home-icon { color: rgba(255, 255, 255, 0.8) !important; }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px 80px;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  align-items: stretch;

  @media (max-width: 992px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const PaginationWrapper = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
`;

const SeoContentSection = styled.section`
  margin-top: 80px;
  padding-top: 60px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const SeoTextWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 28px;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 24px;
    display: flex;
    align-items: center; gap: 12px;
    svg { color: ${({ theme }) => theme.colors.accent}; }
  }
  p {
    font-size: 16px; line-height: 1.8; color: ${({ theme }) => theme.colors.textSecondary};
    white-space: pre-line; text-align: justify;
    strong, b { color: ${({ theme }) => theme.colors.primary}; font-weight: 600; }
  }
`;

const CtaBanner = styled.div`
  margin-top: 80px;
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  padding: 60px;
  border-radius: 20px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  h3 { font-family: ${({ theme }) => theme.fonts.heading}; font-size: 28px; color: ${({ theme }) => theme.colors.primary}; margin-bottom: 16px; }
  p { margin-bottom: 32px; color: ${({ theme }) => theme.colors.textSecondary}; }
  @media (max-width: 768px) { padding: 40px 20px; }
`;

// --- Main Component ---
export default function ServicesPage() {
  const locale = useLocale();
  const t = useTranslations('ServicesPage');
  const tNav = useTranslations('Navigation');
  const tErrors = useTranslations('Errors');
  const tGeneral = useTranslations('General');
  const searchParams = useSearchParams();
  const router = useRouter(); 

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const categoryId = searchParams.get('categoryId') || undefined;

  // 1. Fetch dữ liệu
  const { result, isLoading, isError } = useAllServices(locale, currentPage);
  const { categories } = useCategories('SERVICE');

  // 2. Logic Category V3.0 (Tìm bản dịch danh mục)
  const currentCategoryName = useMemo(() => {
    if (!categoryId || !Array.isArray(categories)) return undefined;
    const cat = categories.find(c => c.id.toString() === categoryId);
    const trans = cat?.translations?.find(t => t.locale === locale) || cat?.translations?.[0];
    return trans?.name;
  }, [categories, categoryId, locale]);

  // 3. FIX LỖI VỊ TRÍ: Lọc dịch vụ "sạch" trước khi Render
  const displayServices = useMemo(() => {
    if (!result?.data) return [];
    return result.data.filter(service => {
      // Chỉ lấy bài có bản dịch cho ngôn ngữ hiện tại
      const hasTranslation = service.translations.some(t => t.locale === locale);
      // Lọc theo CategoryId nếu có tham số truyền vào
      const matchesCategory = categoryId ? service.categoryId?.toString() === categoryId : true;
      return hasTranslation && matchesCategory;
    });
  }, [result?.data, categoryId, locale]);

  const handleRetry = () => window.location.reload();

  const renderContent = () => {
    if (isLoading) {
      return (
        <ServicesGrid>
          {Array.from({ length: 6 }).map((_, index) => <CardSkeleton key={index} />)}
        </ServicesGrid>
      );
    }
    
    if (isError) {
      return <ErrorState title={tErrors('failedToLoad')} description="Error loading services" actionText={tErrors('retry')} onAction={handleRetry} />;
    }

    if (displayServices.length === 0) {
      return (
        <ErrorState 
          title={t('noServices')}
          description="Content in this language is being updated."
          actionText={tGeneral('viewAll')}
          onAction={() => router.push('/services' as never)}
        />
      );
    }

    return (
      <>
        <ServicesGrid>
          {displayServices.map((service, index) => (
            <FadeInWhenVisible key={service.id} delay={index * 0.05}>
              <ServiceCard service={service} />
            </FadeInWhenVisible>
          ))}
        </ServicesGrid>
        
        {result && result.lastPage > 1 && (
          <PaginationWrapper>
            <Pagination currentPage={result.page} totalPages={result.lastPage} basePath="/services" />
          </PaginationWrapper>
        )}
      </>
    );
  };

  return (
    <PageWrapper>
      <HeroSection>
        <div className="container">
          <BreadcrumbHeaderWrapper>
            <Breadcrumbs 
              items={[
                { label: tNav('services'), href: categoryId ? '/services' : undefined },
                ...(currentCategoryName ? [{ label: currentCategoryName }] : [])
              ]} 
            />
          </BreadcrumbHeaderWrapper>
          <FadeInWhenVisible>
            <h1>{currentCategoryName ? currentCategoryName : t('title')}</h1>
            {currentCategoryName && (
              <div className="category-badge">
                <RiHashtag /> {t('categoryPrefix')}
              </div>
            )}
          </FadeInWhenVisible>
        </div>
      </HeroSection>
      
      <ContentContainer>
        {renderContent()}

        {/* Khối SEO chỉ hiện ở trang chính, không hiện khi đang lọc category */}
        {!categoryId && displayServices.length > 0 && (
          <>
            <FadeInWhenVisible delay={0.2}>
              <SeoContentSection>
                <SeoTextWrapper>
                  <h2><RiInformationLine /> {t('seoTitle')}</h2>
                  <p>{t.rich('seoContent', { bold: (chunks) => <strong>{chunks}</strong> })}</p>
                </SeoTextWrapper>
              </SeoContentSection>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.3}>
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