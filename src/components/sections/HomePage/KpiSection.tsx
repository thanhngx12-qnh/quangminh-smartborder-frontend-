// dir: ~/quangminh-smart-border/frontend/src/components/sections/HomePage/KpiSection.tsx
'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { RiBuilding2Line, RiTruckLine, RiFileList3Line } from 'react-icons/ri';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';

// --- Styled Components ---
const KpiWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 80px 20px;
  display: flex;
  justify-content: center;
`;

const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1000px;
  width: 100%;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
`;

const KpiCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid #e0e0e0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const IconWrapper = styled.div`
  font-size: 48px;
  color: ${({ theme }) => theme.colors.accent};
  flex-shrink: 0; // Đảm bảo icon không bị co lại
`;

const TextContent = styled.div`
  h3 {
    font-size: 36px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    line-height: 1.2;
  }

  p {
    font-size: 16px;
    color: #666;
  }
  
  span {
    font-size: 14px;
    color: #999;
  }
`;


// --- Main Component ---
export default function KpiSection() {
  const t = useTranslations('Kpi');

  const kpiItems = [
    {
      icon: <RiBuilding2Line />,
      value: t('storageValue'),
      title: t('storageTitle'),
      description: t('storageDesc'),
    },
    {
      icon: <RiTruckLine />,
      value: t('containerValue'),
      title: t('containerTitle'),
      description: t('containerDesc'),
    },
    {
      icon: <RiFileList3Line />,
      value: t('customsValue'),
      title: t('customsTitle'),
      description: t('customsDesc'),
    },
  ];

    return (
    <KpiWrapper>
      <KpiGrid>
        {kpiItems.map((item, index) => (
          // Áp dụng animation cho từng thẻ với một độ trễ nhỏ tăng dần
          <FadeInWhenVisible key={index} transition={{ duration: 0.5, delay: index * 0.2 }}>
            <KpiCard>
              <IconWrapper>{item.icon}</IconWrapper>
              <TextContent>
                <h3>{item.value}</h3>
                <p>{item.title}</p>
                <span>{item.description}</span>
              </TextContent>
            </KpiCard>
          </FadeInWhenVisible>
        ))}
      </KpiGrid>
    </KpiWrapper>
  );
}