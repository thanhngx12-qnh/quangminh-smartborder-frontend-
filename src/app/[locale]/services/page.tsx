// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/services/page.tsx
'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation'; 
import styled from 'styled-components';
import { useAllServices } from '@/hooks/useServices';
import ServiceCard from '@/components/shared/ServiceCard';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import CardSkeleton from '@/components/ui/CardSkeleton';
import Pagination from '@/components/ui/Pagination';

// --- Styled Components ---
const PageWrapper = styled.div`
  width: 100%; // Ngăn tràn màn hình
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
    color: ${({ theme }) => theme.colors.text}; // Sử dụng màu text từ theme
    margin-bottom: 16px;
  }

  p {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.textSecondary}; // Sử dụng màu textSecondary từ theme
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

const ErrorState = styled.p`
  text-align: center;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.error};
`;

const NoDataState = styled.p`
  text-align: center;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;


// --- Main Component ---
export default function ServicesPage() {
  const locale = useLocale();
  const t = useTranslations('ServicesPage');
  const t_errors = useTranslations('Errors'); // Lấy translation cho lỗi chung
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const { result, isLoading, isError } = useAllServices(locale, currentPage); // Lấy thêm `mutate`

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
        return <ErrorState 
            title={t_errors('failedToLoad')}
        />
    };

    // SỬA LỖI Ở ĐÂY: Lọc dữ liệu trước khi render
    const servicesWithTranslation = result?.data.filter(service => 
      service.translations.some(translation => translation.locale === locale)
    ) || [];

    if (!servicesWithTranslation || servicesWithTranslation.length === 0) {
      return <NoDataState>Không có dịch vụ nào phù hợp.</NoDataState>;
    }

    return (
      <>
        <ServicesGrid>
          {servicesWithTranslation.map((service, index) => (
            <FadeInWhenVisible key={service.id} transition={{ delay: index * 0.1 }}>
              <ServiceCard service={service} />
            </FadeInWhenVisible>
          ))}
        </ServicesGrid>
        
        {result && (
            <Pagination 
                currentPage={result.page} 
                totalPages={result.lastPage}
                basePath="/services"
            />
        )}
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