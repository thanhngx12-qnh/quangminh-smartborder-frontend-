// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/services/page.tsx
'use client';

import { useLocale, useTranslations } from 'next-intl';
import styled from 'styled-components';
import { useAllServices } from '@/hooks/useServices';
import ServiceCard from '@/components/shared/ServiceCard';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import CardSkeleton from '@/components/ui/CardSkeleton';
import { useSearchParams } from 'next/navigation'; 
import Pagination from '@/components/ui/Pagination'; // <-- Import

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

  p {
    font-size: 18px;
    color: #666;
    line-height: 1.6;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const LoadingState = styled.p` /* ... */ `;
const ErrorState = styled.p` /* ... */ `;

// --- Main Component ---
export default function ServicesPage() {
  const locale = useLocale();
  const t = useTranslations('ServicesPage');
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const { result, isLoading, isError } = useAllServices(locale, currentPage);

  const renderContent = () => {
    // Cập nhật lại logic loading để hiển thị skeleton
    if (isLoading) {
      return (
        <ServicesGrid>
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </ServicesGrid>
      );
    }
    
    if (isError) return <ErrorState>Failed to load services.</ErrorState>;
    if (!result || result.data.length === 0) return <p style={{textAlign: 'center'}}>No services available.</p>;

    return (
      <>
        <ServicesGrid>
          {result.data.map((service, index) => (
            <FadeInWhenVisible key={service.id} transition={{ delay: index * 0.1 }}>
              <ServiceCard service={service} />
            </FadeInWhenVisible>
          ))}
        </ServicesGrid>
        
        {/* THÊM COMPONENT PAGINATION */}
        <Pagination 
          currentPage={result.page} 
          totalPages={result.lastPage}
          basePath="/services"
        />
      </>
    );
  };

  return (
    <PageWrapper>
      <FadeInWhenVisible>
        <PageHeader>
          <h1>{t('title')}</h1>
          <p>{t('description')}</p>
        </PageHeader>
      </FadeInWhenVisible>
      {renderContent()}
    </PageWrapper>
  );
}