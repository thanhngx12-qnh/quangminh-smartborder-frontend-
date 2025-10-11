// dir: ~/quangminh-smart-border/frontend/src/components/sections/HomePage/FeaturedServicesSection.tsx
'use client';

import { useTranslations, useLocale } from 'next-intl';
import styled from 'styled-components';
import { Link } from '@/navigation';
import Image from 'next/image';
import { Service } from '@/types'; // Import "hợp đồng"

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

const ServiceCard = styled(Link)`
  display: block;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: ${({ theme }) => theme.colors.surface};

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  
  img {
    object-fit: cover; // Đảm bảo ảnh luôn vừa vặn
  }
`;

const CardContent = styled.div`
  padding: 24px;

  h3 {
    font-size: 22px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
    color: #666;
    line-height: 1.6;
  }
`;

// --- Main Component ---

// Component này nhận một mảng các dịch vụ làm prop
interface FeaturedServicesSectionProps {
  services: Service[];
}

export default function FeaturedServicesSection({ services }: FeaturedServicesSectionProps) {
  const t = useTranslations('FeaturedServices');
  const locale = useLocale();

  return (
    <SectionWrapper>
      <SectionHeader>
        <h2>{t('title')}</h2>
        <p>{t('description')}</p>
      </SectionHeader>
      <ServicesGrid>
        {services.map((service) => {
          // Tìm bản dịch phù hợp với ngôn ngữ hiện tại
          const translation = service.translations.find(t => t.locale === locale) || service.translations[0];
          
          return (
            <ServiceCard key={service.id} href={`/services/${translation.slug}`}>
              <ImageWrapper>
                <Image 
                  src={service.coverImage || '/placeholder.jpg'} 
                  alt={translation.title} 
                  fill // Thuộc tính 'fill' giúp ảnh tự lấp đầy container
                />
              </ImageWrapper>
              <CardContent>
                <h3>{translation.title}</h3>
                <p>{translation.shortDesc}</p>
              </CardContent>
            </ServiceCard>
          );
        })}
      </ServicesGrid>
    </SectionWrapper>
  );
}