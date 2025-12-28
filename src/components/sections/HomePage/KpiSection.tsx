// dir: frontend/src/components/sections/HomePage/KpiSection.tsx
'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { RiBuilding2Line, RiTruckLine, RiFileList3Line } from 'react-icons/ri';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';

// --- Styled Components ---

const SectionWrapper = styled.section`
  // Sử dụng màu Primary (Xanh đậm) làm nền để nổi bật Text trắng
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 80px 20px;
  position: relative;
  overflow: hidden;

  // Thêm họa tiết trang trí mờ (optional)
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 60%);
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  
  // Đường kẻ phân cách giữa các cột trên Desktop
  & > div:not(:last-child) {
    border-right: 1px solid rgba(255, 255, 255, 0.15);
  }

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 60px;
    
    & > div:not(:last-child) {
      border-right: none;
      border-bottom: 1px solid rgba(255, 255, 255, 0.15);
      padding-bottom: 40px;
    }
  }
`;

const KpiItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  padding: 0 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const IconWrapper = styled.div`
  font-size: 56px;
  color: ${({ theme }) => theme.colors.accent}; // Icon màu Đỏ nổi bật trên nền Xanh
  margin-bottom: 20px;
  
  svg {
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));
  }
`;

const Value = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 48px;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 12px;
  background: linear-gradient(to right, #ffffff, #e0e0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.white};
  opacity: 0.9;
`;

const Description = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.footer.textSecondary}; // Màu xám nhạt dễ đọc
  max-width: 250px;
`;

// --- Main Component ---
export default function KpiSection() {
  const t = useTranslations('Kpi');

  const kpiItems = [
    {
      key: 'storage',
      icon: <RiBuilding2Line />,
      value: t('storageValue'),
      title: t('storageTitle'),
      description: t('storageDesc'),
    },
    {
      key: 'container',
      icon: <RiTruckLine />,
      value: t('containerValue'),
      title: t('containerTitle'),
      description: t('containerDesc'),
    },
    {
      key: 'customs',
      icon: <RiFileList3Line />,
      value: t('customsValue'),
      title: t('customsTitle'),
      description: t('customsDesc'),
    },
  ];

  return (
    <SectionWrapper>
      <Container>
        <KpiGrid>
          {kpiItems.map((item, index) => (
            // Sửa lỗi: dùng prop delay trực tiếp thay vì transition object
            <FadeInWhenVisible key={index} delay={index * 0.2}>
              <KpiItem>
                <IconWrapper>{item.icon}</IconWrapper>
                <Value>{item.value}</Value>
                <Title>{item.title}</Title>
                <Description>{item.description}</Description>
              </KpiItem>
            </FadeInWhenVisible>
          ))}
        </KpiGrid>
      </Container>
    </SectionWrapper>
  );
}