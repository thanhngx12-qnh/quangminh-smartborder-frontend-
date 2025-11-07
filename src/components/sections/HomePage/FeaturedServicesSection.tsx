// dir: ~/quangminh-smart-border/frontend/src/components/sections/HomePage/FeaturedServicesSection.tsx
'use client';

import { useTranslations, useLocale } from 'next-intl';
import styled from 'styled-components';
import { Service } from '@/types';
import ServiceCard from '@/components/shared/ServiceCard';
import { Link } from '@/navigation';
import { RiArrowRightLine } from 'react-icons/ri';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import { ButtonLink } from '@/components/ui/Button';

// --- Styled Components ---
const SectionWrapper = styled.section`
  padding: 80px 20px;
  background-color: ${({ theme }) => theme.colors.background}; 
`;

const SectionHeader = styled.div`
  display: flex; // Chuyển sang flex
  justify-content: space-between; // Đặt title và nút ở 2 đầu
  align-items: center;
  max-width: 1200px;
  margin: 0 auto 60px auto;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column; // Xếp chồng trên mobile
    text-align: center;
  }
`;

const HeaderText = styled.div`
  max-width: 700px;

  h2 {
    font-size: 36px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text}; // Sử dụng màu text từ theme
    margin-bottom: 16px;
  }

  p {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.textSecondary}; // Sử dụng màu textSecondary từ theme
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  // Cải thiện grid để đẹp hơn: 3 cột trên desktop, 2 trên tablet, 1 trên mobile
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

// THẺ XEM THÊM ĐẶC BIỆT
const SeeMoreCard = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  border: 2px dashed ${({ theme }) => theme.colors.border};
  padding: 40px;
  transition: all 0.3s ease;
  color: ${({ theme }) => theme.colors.textSecondary};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
    margin-top: 16px;
  }

  svg {
    font-size: 48px;
  }
`;

const DesktopViewAllButton = styled(ButtonLink)`
  @media (max-width: 768px) {
    display: none; // Ẩn nút này trên mobile, chỉ hiển thị card
  }
`;

// --- Main Component ---
interface FeaturedServicesSectionProps {
  services?: Service[]; // Dữ liệu có thể là undefined trong lúc loading
}

export default function FeaturedServicesSection({ services }: FeaturedServicesSectionProps) {
  const t = useTranslations('FeaturedServices');
  const t_general = useTranslations('General'); // Thêm "General" vào file message
  const locale = useLocale();

  // 1. Lọc các dịch vụ không có bản dịch
  const servicesWithTranslation = services?.filter(service => 
    service.translations.some(t => t.locale === locale)
  ) || [];

  // 2. Chỉ lấy tối đa 5 dịch vụ để hiển thị, để dành 1 ô cho "Xem thêm"
  const servicesToShow = servicesWithTranslation.slice(0, 5);

  return (
    <SectionWrapper>
      <FadeInWhenVisible>
        <SectionHeader>
          <HeaderText>
            <h2>{t('title')}</h2>
            <p>{t('description')}</p>
          </HeaderText>
          <DesktopViewAllButton href="/services" variant="secondary" as="a">
            {t_general('viewAll')}
          </DesktopViewAllButton>
        </SectionHeader>
      </FadeInWhenVisible>
      
      <ServicesGrid>
        {servicesToShow.map((service, index) => (
          <FadeInWhenVisible key={service.id} transition={{ delay: index * 0.1 }}>
            <ServiceCard service={service} />
          </FadeInWhenVisible>
        ))}

        {/* 3. Thẻ "Xem tất cả" */}
        <FadeInWhenVisible transition={{ delay: servicesToShow.length * 0.1 }}>
          <SeeMoreCard href="/services" as="a">
            <RiArrowRightLine />
            <h3>{t_general('viewAllServices')}</h3>
          </SeeMoreCard>
        </FadeInWhenVisible>
      </ServicesGrid>
    </SectionWrapper>
  );
}