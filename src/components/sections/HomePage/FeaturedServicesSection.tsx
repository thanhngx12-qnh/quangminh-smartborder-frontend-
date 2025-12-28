// dir: frontend/src/components/sections/HomePage/FeaturedServicesSection.tsx
'use client';

import { useTranslations, useLocale } from 'next-intl';
import styled from 'styled-components';
import { Service } from '@/types';
import ServiceCard from '@/components/shared/ServiceCard'; // Component đã nâng cấp
import { Link } from '@/navigation';
import { RiArrowRightLine, RiDashboardLine } from 'react-icons/ri';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import { ButtonLink } from '@/components/ui/Button';

// --- Styled Components ---

const SectionWrapper = styled.section`
  padding: 100px 20px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end; // Căn đáy để nút thẳng hàng với dòng cuối của text
  margin-bottom: 60px;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const HeaderText = styled.div`
  max-width: 700px;

  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 36px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 16px;
    position: relative;
    
    // Gạch chân đỏ trang trí (Đồng bộ với WhyChooseUs)
    &::after {
      content: '';
      display: block;
      width: 60px;
      height: 4px;
      background-color: ${({ theme }) => theme.colors.accent};
      margin-top: 12px;
      border-radius: 2px;
      
      @media (max-width: 768px) {
        margin: 12px auto 0;
      }
    }
  }

  p {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.6;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  // Grid 3 cột chuẩn
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  // Đảm bảo các item trong grid có chiều cao bằng nhau
  align-items: stretch; 

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

// Thẻ "Xem thêm" được thiết kế lại
const SeeMoreCard = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%; // Full chiều cao
  min-height: 350px; // Chiều cao tối thiểu tương đương ServiceCard
  
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  border-radius: 12px;
  border: 2px dashed ${({ theme }) => theme.colors.border};
  padding: 40px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  color: ${({ theme }) => theme.colors.textSecondary};

  h3 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 20px;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.colors.primary};
    transition: color 0.3s;
  }
  
  span {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  .icon-box {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.sm};
    transition: all 0.3s;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    background-color: ${({ theme }) => theme.colors.surface};
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.md};

    h3 { color: ${({ theme }) => theme.colors.accent}; }
    
    .icon-box {
      background-color: ${({ theme }) => theme.colors.accent};
      color: ${({ theme }) => theme.colors.white};
      transform: scale(1.1);
    }
  }
`;

const DesktopViewAllButton = styled(ButtonLink)`
  flex-shrink: 0;
  @media (max-width: 768px) {
    display: none;
  }
`;

// --- Main Component ---
interface FeaturedServicesSectionProps {
  services?: Service[];
}

export default function FeaturedServicesSection({ services }: FeaturedServicesSectionProps) {
  const t = useTranslations('FeaturedServices');
  const t_general = useTranslations('General');
  const locale = useLocale();

  // Lọc và lấy data
  const servicesWithTranslation = services?.filter(service => 
    service.translations.some(t => t.locale === locale)
  ) || [];

  // Lấy 5 dịch vụ đầu tiên
  const servicesToShow = servicesWithTranslation.slice(0, 5);

  return (
    <SectionWrapper>
      <Container>
        <FadeInWhenVisible>
          <SectionHeader>
            <HeaderText>
              <h2>{t('title')}</h2>
              <p>{t('description')}</p>
            </HeaderText>
            <DesktopViewAllButton href="/services" variant="secondary" as="a">
              {t_general('viewAll')} <RiArrowRightLine style={{ marginLeft: 8 }}/>
            </DesktopViewAllButton>
          </SectionHeader>
        </FadeInWhenVisible>
        
        <ServicesGrid>
          {servicesToShow.map((service, index) => (
            // SỬA LỖI: dùng prop `delay` thay vì `transition`
            <FadeInWhenVisible key={service.id} delay={index * 0.1}>
              <ServiceCard service={service} />
            </FadeInWhenVisible>
          ))}

          {/* Thẻ "Xem tất cả" luôn xuất hiện cuối cùng */}
          <FadeInWhenVisible delay={servicesToShow.length * 0.1}>
            <SeeMoreCard href="/services" as="a">
              <div className="icon-box">
                <RiDashboardLine />
              </div>
              <h3>{t_general('viewAllServices')}</h3>
              <span>Khám phá thêm {servicesWithTranslation.length - servicesToShow.length > 0 ? `+${servicesWithTranslation.length - servicesToShow.length}` : ''} dịch vụ khác</span>
            </SeeMoreCard>
          </FadeInWhenVisible>
        </ServicesGrid>
      </Container>
    </SectionWrapper>
  );
}