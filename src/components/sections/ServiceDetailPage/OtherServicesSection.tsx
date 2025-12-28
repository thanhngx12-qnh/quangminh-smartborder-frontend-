// dir: frontend/src/components/sections/ServiceDetailPage/OtherServicesSection.tsx
'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { Service } from '@/types';
import ServiceCard from '@/components/shared/ServiceCard';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';

// --- Styled Components ---

const SectionWrapper = styled.section`
  padding: 80px 20px;
  background-color: ${({ theme }) => theme.colors.surfaceAlt}; // Nền xám nhẹ tách biệt với nội dung chính
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;

  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 32px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 16px;
    position: relative;
    display: inline-block;

    // Gạch chân đỏ trang trí
    &::after {
      content: '';
      display: block;
      width: 60px;
      height: 4px;
      background-color: ${({ theme }) => theme.colors.accent};
      margin: 12px auto 0;
      border-radius: 2px;
    }
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  // Đảm bảo card cao bằng nhau
  align-items: stretch;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

interface OtherServicesSectionProps {
  services: Service[];
}

export default function OtherServicesSection({ services }: OtherServicesSectionProps) {
  const t = useTranslations('ServiceDetail');

  // Nếu không có dịch vụ nào khác thì ẩn section này đi
  if (!services || services.length === 0) return null;

  return (
    <SectionWrapper>
      <Container>
        <FadeInWhenVisible>
          <SectionHeader>
            <h2>{t('otherServicesTitle')}</h2>
          </SectionHeader>
        </FadeInWhenVisible>
        
        <ServicesGrid>
          {services.map((service, index) => (
            // SỬA LỖI: dùng prop delay trực tiếp
            <FadeInWhenVisible key={service.id} delay={index * 0.1}>
              <ServiceCard service={service} />
            </FadeInWhenVisible>
          ))}
        </ServicesGrid>
      </Container>
    </SectionWrapper>
  );
}