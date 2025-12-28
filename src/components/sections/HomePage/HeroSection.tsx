// dir: frontend/src/components/sections/HomePage/HeroSection.tsx
'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion'; 
import { ButtonLink } from '@/components/ui/Button'; 
import { RiArrowRightLine, RiServiceLine } from 'react-icons/ri';

// --- Styled Components ---

const HeroWrapper = styled.section`
  position: relative;
  // Chiều cao tự động theo viewport nhưng tối thiểu 600px
  height: 85vh; 
  min-height: 600px;
  max-height: 900px;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // Bạn nhớ thay ảnh này bằng ảnh Container/Cửa khẩu chất lượng cao
  background-image: url('https://chimahtt.com/wp-content/uploads/2025/11/chima-htt-banner-anh-2.jpg'); 
  background-size: cover;
  background-position: center;
  z-index: -2;
  
  // Animation zoom nhẹ cho background
  animation: zoomEffect 20s infinite alternate;

  @keyframes zoomEffect {
    from { transform: scale(1); }
    to { transform: scale(1.1); }
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  // Gradient màu thương hiệu: Xanh đậm -> Trong suốt -> Xanh đậm
  background: linear-gradient(
    90deg, 
    rgba(0, 51, 102, 0.9) 0%, 
    rgba(0, 51, 102, 0.7) 50%, 
    rgba(0, 51, 102, 0.4) 100%
  );
`;

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  z-index: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }
`;

const HeroContent = styled(motion.div)`
  max-width: 800px;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 992px) {
    max-width: 100%;
    text-align: center;
    align-items: center;
  }
`;

const CompanyLabel = styled.span`
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent}; // Màu đỏ thương hiệu
  display: inline-flex;
  align-items: center;
  gap: 12px;
  
  &::before {
    content: '';
    width: 40px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.accent};
  }

  @media (max-width: 992px) {
    justify-content: center;
    &::after {
      content: '';
      width: 40px;
      height: 2px;
      background-color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(32px, 5vw, 64px); // Responsive font size
  font-weight: 800;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  margin: 0;
  
  // Hiệu ứng text-shadow để chữ nổi bật hơn
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
`;

const Subtitle = styled.p`
  font-size: clamp(16px, 2vw, 20px);
  font-weight: 400;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin-bottom: 16px;
`;

const CtaGroup = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
    
    a {
      width: 100%;
    }
  }
`;

// --- Main Component ---
export default function HeroSection() {
  const t = useTranslations('Hero');

  // Cấu hình animation
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2, // Các phần tử con hiện lần lượt
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <HeroWrapper>
      <BackgroundImage />
      <Overlay />
      
      <Container>
        <HeroContent
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <CompanyLabel>{t('label')}</CompanyLabel>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Title>
              {t.rich('title', {
                br: () => <br /> // Hỗ trợ xuống dòng từ JSON
              })}
            </Title>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Subtitle>{t('subtitle')}</Subtitle>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <CtaGroup>
              <ButtonLink href="/services" variant="primary" size="large" as="a">
                {t('ctaServices')} <RiServiceLine style={{ marginLeft: 8 }} />
              </ButtonLink>
              
              <ButtonLink href="/contact" variant="outline" size="large" as="a" style={{ color: 'white', borderColor: 'white' }}>
                {t('ctaContact')} <RiArrowRightLine style={{ marginLeft: 8 }} />
              </ButtonLink>
            </CtaGroup>
          </motion.div>
        </HeroContent>
      </Container>
    </HeroWrapper>
  );
}