// dir: frontend/src/app/[locale]/manifesto/page.tsx
'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { RiShieldCheckLine, RiRocketLine, RiLightbulbFlashLine, RiLeafLine } from 'react-icons/ri';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';

// --- Styled Components ---

const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
`;

const HeroSection = styled.section`
  position: relative;
  padding: 120px 20px;
  text-align: center;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%);
  color: ${({ theme }) => theme.colors.white};
  overflow: hidden;

  // Họa tiết nền mờ
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background-image: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%);
    pointer-events: none;
  }

  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: clamp(36px, 5vw, 56px);
    font-weight: 800;
    margin-bottom: 24px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  p {
    font-size: 20px;
    opacity: 0.9;
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
    font-weight: 300;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
`;

const ValuesGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  margin-bottom: 24px;
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ValueCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 48px 40px;
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.hover};
    border-color: ${({ theme }) => theme.colors.accent};

    ${IconWrapper} {
      background-color: ${({ theme }) => theme.colors.accent};
      color: ${({ theme }) => theme.colors.white};
      border-color: ${({ theme }) => theme.colors.accent};
      transform: scale(1.1) rotate(10deg);
    }
  }
  
  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 24px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary}; // Tiêu đề xanh
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
    { 
      key: 'transparency', 
      icon: <RiShieldCheckLine />, 
      title: t('value1Title'), 
      text: t('value1Text') 
    },
    { 
      key: 'efficiency', 
      icon: <RiRocketLine />, 
      title: t('value2Title'), 
      text: t('value2Text') 
    },
    { 
      key: 'innovation', 
      icon: <RiLightbulbFlashLine />, 
      title: t('value3Title'), 
      text: t('value3Text') 
    },
    { 
      key: 'sustainability', 
      icon: <RiLeafLine />, 
      title: t('value4Title'), 
      text: t('value4Text') 
    },
  ];

  return (
    <PageWrapper>
      <FadeInWhenVisible>
        <HeroSection>
          <h1>{t('title')}</h1>
          <p>{t('subtitle')}</p>
        </HeroSection>
      </FadeInWhenVisible>
      
      <Container>
        <ValuesGrid>
          {values.map((value, index) => (
            // Sửa lỗi: dùng prop delay thay vì transition
            <FadeInWhenVisible key={index} delay={index * 0.1}>
              <ValueCard>
                <IconWrapper>
                  {value.icon}
                </IconWrapper>
                <h2>{value.title}</h2>
                <p>{value.text}</p>
              </ValueCard>
            </FadeInWhenVisible>
          ))}
        </ValuesGrid>
      </Container>
    </PageWrapper>
  );
}