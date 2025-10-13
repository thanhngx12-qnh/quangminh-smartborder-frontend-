// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/test-api/page.tsx
'use client';

import { useLocale } from 'next-intl';
import styled from 'styled-components';
import { useAllServices } from '@/hooks/useServices';
import { Service } from '@/types';

// --- Styled Components ---
const PageWrapper = styled.div`
  padding: 40px;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.primary};
`;

const LoadingState = styled.p`
  font-size: 18px;
  color: #888;
`;

const ErrorState = styled.p`
  font-size: 18px;
  color: #e53e3e;
  background-color: #fff5f5;
  padding: 16px;
  border-radius: 8px;
`;

const ServiceList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ServiceItem = styled.li`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.surface};

  h2 {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
    color: #666;
  }
`;

// --- Main Component ---
export default function TestApiPage() {
  const locale = useLocale();
  const { services, isLoading, isError } = useAllServices(locale);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingState>Loading services from backend...</LoadingState>;
    }

    if (isError) {
      return <ErrorState>Failed to load services. Check API connection and console for errors.</ErrorState>;
    }

    if (!services || services.length === 0) {
      return <p>No services found in the database. Please add some data via API.</p>;
    }

    return (
      <ServiceList>
        {services.map((service) => {
          const translation = service.translations.find(t => t.locale === locale) || service.translations[0];
          return (
            <ServiceItem key={service.id}>
              <h2>{translation.title} (ID: {service.id})</h2>
              <p>{translation.shortDesc}</p>
            </ServiceItem>
          );
        })}
      </ServiceList>
    );
  };

  return (
    <PageWrapper>
      <Title>API Test Page: All Services</Title>
      {renderContent()}
    </PageWrapper>
  );
}