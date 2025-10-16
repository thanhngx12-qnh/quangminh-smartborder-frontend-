// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/manifesto/page.tsx
'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { RiShieldCheckLine, RiRocketLine, RiLightbulbFlashLine, RiLeafLine } from 'react-icons/ri';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';

// --- Styled Components ---
const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  padding-bottom: 80px;
`;

const HeroSection = styled.section`
  padding: 100px 20px;
  background-color: ${({ theme }) => theme.colors.background};
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  h1 {
    font-size: 48px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 16px;
  }

  p {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.textSecondary};
    max-width: 700px;
    margin: 0 auto;
  }
`;

const ValuesGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px; // Tạo đường kẻ mảnh
  background-color: ${({ theme }) => theme.colors.divider};
  max-width: 1200px;
  margin: 80px auto;
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled.div`
  padding: 40px;
  background-color: ${({ theme }) => theme.colors.background};

  svg {
    font-size: 48px;
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: 24px;
  }
  
  h2 {
    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 16px;
  }

  p {
    font-size: 16px;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;


// --- Main Component ---
export default function ManifestoPage() {
  const t = useTranslations('ManifestoPage');
  
  const values = [
    { icon: <RiShieldCheckLine />, title: t('value1Title'), text: t('value1Text') },
    { icon: <RiRocketLine />, title: t('value2Title'), text: t('value2Text') },
    { icon: <RiLightbulbFlashLine />, title: t('value3Title'), text: t('value3Text') },
    { icon: <RiLeafLine />, title: t('value4Title'), text: t('value4Text') },
  ];

  return (
    <PageWrapper>
      <FadeInWhenVisible>
        <HeroSection>
          <h1>{t('title')}</h1>
          <p>{t('subtitle')}</p>
        </HeroSection>
      </FadeInWhenVisible>
      
      <FadeInWhenVisible>
        <ValuesGrid>
          {values.map((value, index) => (
            <ValueCard key={index}>
              {value.icon}
              <h2>{value.title}</h2>
              <p>{value.text}</p>
            </ValueCard>
          ))}
        </ValuesGrid>
      </FadeInWhenVisible>
    </PageWrapper>
  );
}