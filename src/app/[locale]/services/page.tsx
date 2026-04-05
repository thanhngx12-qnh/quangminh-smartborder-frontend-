// dir: frontend/src/app/[locale]/services/page.tsx
'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation'; 
import styled from 'styled-components';
import { useAllServices } from '@/hooks/useServices';
import ServiceCard from '@/components/shared/ServiceCard';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import CardSkeleton from '@/components/ui/CardSkeleton';
import Pagination from '@/components/ui/Pagination';
import ErrorState from '@/components/ui/ErrorState';
import { ButtonLink } from '@/components/ui/Button';
import { RiArrowRightLine, RiInformationLine } from 'react-icons/ri';

// --- Styled Components ---
const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%);
  padding: 120px 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};

  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 800;
    text-transform: uppercase;
    margin-bottom: 16px;
    color: ${({ theme }) => theme.colors.white};
  }

  p {
    font-size: clamp(16px, 2vw, 20px);
    max-width: 800px;
    margin: 0 auto;
    opacity: 0.9;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  align-items: stretch;

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

// --- NEW SEO CONTENT STYLES ---
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
    align-items: center;
    gap: 12px;
    
    svg { color: ${({ theme }) => theme.colors.accent}; }
  }

  p {
    font-size: 16px;
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.textSecondary};
    white-space: pre-line;
    text-align: justify;

    strong, b {
      color: ${({ theme }) => theme.colors.primary};
      font-weight: 600;
    }
  }
`;

const CtaBanner = styled.div`
  margin-top: 80px;
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  padding: 60px;
  border-radius: 20px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border};

  h3 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 28px;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 16px;
  }

  p {
    margin-bottom: 32px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

// --- Main Component ---
export default function ServicesPage() {
  const locale = useLocale();
  const t = useTranslations('ServicesPage');
  const tErrors = useTranslations('Errors');
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const { result, isLoading, isError } = useAllServices(locale, currentPage);

  const handleRetry = () => {
    window.location.reload();
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <ServicesGrid>
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </ServicesGrid>
      );
    }
    
    if (isError) {
      return (
        <ErrorState 
          title={tErrors('failedToLoad')}
          description="Có lỗi xảy ra khi tải danh sách dịch vụ. Vui lòng thử lại."
          actionText={tErrors('retry')}
          onAction={handleRetry}
        />
      );
    }

    const servicesWithTranslation = result?.data.filter(service => 
      service.translations.some(translation => translation.locale === locale)
    ) || [];

    if (!servicesWithTranslation || servicesWithTranslation.length === 0) {
      return (
        <ErrorState 
          title={t('noServices')}
          description="Chúng tôi đang cập nhật thông tin dịch vụ. Vui lòng quay lại sau."
        />
      );
    }

    return (
      <>
        <ServicesGrid>
          {servicesWithTranslation.map((service, index) => (
            <FadeInWhenVisible key={service.id} delay={index * 0.1}>
              <ServiceCard service={service} />
            </FadeInWhenVisible>
          ))}
        </ServicesGrid>
        
        {result && result.lastPage > 1 && (
          <PaginationWrapper>
            <Pagination 
              currentPage={result.page} 
              totalPages={result.lastPage}
              basePath="/services"
            />
          </PaginationWrapper>
        )}

        {/* THÊM KHỐI SEO CONTENT (MỤC 13 TRONG CHECKLIST) */}
        <FadeInWhenVisible delay={0.3}>
          <SeoContentSection>
            <SeoTextWrapper>
              <h2><RiInformationLine /> {t('seoTitle')}</h2>
              <p>
                {t.rich('seoContent', {
                  bold: (chunks) => <strong>{chunks}</strong>
                })}
              </p>
            </SeoTextWrapper>
          </SeoContentSection>
        </FadeInWhenVisible>

        {/* THÊM CTA BANNER CUỐI TRANG */}
        <FadeInWhenVisible delay={0.4}>
          <CtaBanner>
            <h3>{t('ctaTitle')}</h3>
            <p>Nhận tư vấn giải pháp Logistics và báo giá cạnh tranh nhất ngay hôm nay.</p>
            <ButtonLink href="/contact" variant="primary" size="large" as="a">
              {t('ctaButton')} <RiArrowRightLine style={{marginLeft: 8}} />
            </ButtonLink>
          </CtaBanner>
        </FadeInWhenVisible>
      </>
    );
  };

  return (
    <PageWrapper>
      <FadeInWhenVisible>
        <HeroSection>
          <h1>{t('title')}</h1>
          <p>{t('description')}</p>
        </HeroSection>
      </FadeInWhenVisible>
      
      <ContentContainer>
        {renderContent()}
      </ContentContainer>
    </PageWrapper>
  );
}