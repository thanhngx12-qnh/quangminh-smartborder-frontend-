// dir: ~/quangminh-smart-border/frontend/src/components/sections/ServiceDetailPage/OtherServicesSection.tsx
'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { Service } from '@/types';
import ServiceCard from '@/components/shared/ServiceCard';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';

const SectionWrapper = styled.section`
  padding: 80px 20px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const SectionHeader = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: 60px;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

interface OtherServicesSectionProps {
  services: Service[];
}

export default function OtherServicesSection({ services }: OtherServicesSectionProps) {
  const t = useTranslations('ServiceDetail');

  return (
    <SectionWrapper>
      <SectionHeader>{t('otherServicesTitle')}</SectionHeader>
      <ServicesGrid>
        {services.map((service, index) => (
          <FadeInWhenVisible key={service.id} transition={{ delay: index * 0.1 }}>
            <ServiceCard service={service} />
          </FadeInWhenVisible>
        ))}
      </ServicesGrid>
    </SectionWrapper>
  );
}