// dir: frontend/src/app/[locale]/not-found.tsx
'use client';

import styled from 'styled-components';
import { useTranslations } from 'next-intl';
import { ButtonLink } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { RiCompassDiscoverLine, RiArrowRightLine } from 'react-icons/ri';

// --- Styled Components ---

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  // Chiều cao tối thiểu đảm bảo footer luôn ở dưới cùng
  min-height: 60vh; 
  padding: 80px 20px;
  background-color: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow: hidden;

  // Họa tiết nền mờ (Grid pattern)
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: radial-gradient(${({ theme }) => theme.colors.border} 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.5;
    z-index: 0;
  }
`;

const ContentBox = styled(motion.div)`
  position: relative;
  z-index: 1;
  max-width: 600px;
  background: ${({ theme }) => theme.colors.surface};
  padding: 60px 40px;
  border-radius: 24px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const IconWrapper = styled.div`
  font-size: 80px;
  color: ${({ theme }) => theme.colors.primaryLight};
  margin-bottom: 20px;
  
  svg {
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
  }
`;

const ErrorCode = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 100px;
  font-weight: 800;
  line-height: 1;
  color: ${({ theme }) => theme.colors.accent}; // Màu đỏ cảnh báo
  margin: 0;
  letter-spacing: -2px;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.05);

  @media (max-width: 768px) {
    font-size: 80px;
  }
`;

const Subtitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 10px;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 32px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;

  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
    
    a {
      width: 100%;
    }
  }
`;

// --- Main Component ---

export default function NotFoundPage() {
  const t = useTranslations('NotFound');
  const tGeneral = useTranslations('Navigation'); // Lấy text cho nút Liên hệ

  return (
    <NotFoundWrapper>
      <ContentBox
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <IconWrapper>
          <RiCompassDiscoverLine />
        </IconWrapper>
        
        <ErrorCode>404</ErrorCode>
        
        <Subtitle>{t('title')}</Subtitle>
        
        <Description>
          {t('description')}
        </Description>
        
        <ButtonGroup>
          <ButtonLink href="/" variant="primary" size="medium" as="a">
            {t('goHome')}
          </ButtonLink>
          
          <ButtonLink href="/contact" variant="outline" size="medium" as="a">
            {tGeneral('contact')} <RiArrowRightLine style={{ marginLeft: 8 }} />
          </ButtonLink>
        </ButtonGroup>
      </ContentBox>
    </NotFoundWrapper>
  );
}