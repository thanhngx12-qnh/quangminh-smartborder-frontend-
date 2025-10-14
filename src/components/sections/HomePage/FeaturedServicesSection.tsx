// dir: ~/quangminh-smart-border/frontend/src/components/sections/HomePage/FeaturedServicesSection.tsx
'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { Service } from '@/types';
import ServiceCard from '@/components/shared/ServiceCard'; // <-- Import component mới

// --- Styled Components ---
const SectionWrapper = styled.section`
  padding: 80px 20px;
  background-color: ${({ theme }) => theme.colors.background}; 
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 60px auto;

  h2 {
    font-size: 36px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 16px;
  }

  p {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.textSecondary}; 
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

// --- Main Component ---
interface FeaturedServicesSectionProps {
  services: Service[];
}

export default function FeaturedServicesSection({ services }: FeaturedServicesSectionProps) {
  const t = useTranslations('FeaturedServices');

  return (
    <SectionWrapper>
      <SectionHeader>
        <h2>{t('title')}</h2>
        <p>{t('description')}</p>
      </SectionHeader>
      <ServicesGrid>
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </ServicesGrid>
    </SectionWrapper>
  );
}