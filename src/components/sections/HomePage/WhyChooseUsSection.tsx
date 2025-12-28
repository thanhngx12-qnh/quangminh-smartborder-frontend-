// dir: frontend/src/components/sections/HomePage/WhyChooseUsSection.tsx
'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { RiRocketLine, RiTeamLine, RiMapPinRangeLine } from 'react-icons/ri'; // Dùng icon Map Pin cho vị trí
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';

// --- Styled Components ---

const SectionWrapper = styled.section`
  padding: 100px 20px;
  background-color: ${({ theme }) => theme.colors.surfaceAlt}; // Màu nền xám nhẹ (#F8F9FA) để tách biệt
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const HeaderWrapper = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 60px;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 36px;
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
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadows.card}; // Shadow nhẹ
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadows.hover};
    border-color: ${({ theme }) => theme.colors.primaryLight};
    
    // Hiệu ứng icon khi hover card
    .icon-wrapper {
      background-color: ${({ theme }) => theme.colors.accent};
      color: ${({ theme }) => theme.colors.white};
      transform: scale(1.1) rotate(5deg);
    }
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.secondary}; // Nền xanh nhạt
  color: ${({ theme }) => theme.colors.primary}; // Icon xanh đậm
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  font-size: 36px;
  transition: all 0.3s ease;
`;

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
`;

const CardText = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// --- Main Component ---
export default function WhyChooseUsSection() {
  const t = useTranslations('WhyChooseUs');

  // Mapping đúng nội dung JSON với Icon phù hợp
  const features = [
    { 
      key: 'point1',
      icon: <RiRocketLine />, // Công nghệ tiên phong -> Tên lửa
    },
    { 
      key: 'point2',
      icon: <RiTeamLine />, // Đội ngũ tận tâm -> Team
    },
    { 
      key: 'point3',
      icon: <RiMapPinRangeLine />, // Vị trí chiến lược -> Map Pin
    },
  ];

  return (
    <SectionWrapper>
      <Container>
        <FadeInWhenVisible>
          <HeaderWrapper>
            <Title>{t('title')}</Title>
            {/* Nếu có subtitle chung thì thêm vào đây, hiện tại JSON chưa có nên để trống hoặc thêm sau */}
          </HeaderWrapper>
        </FadeInWhenVisible>
        
        <Grid>
          {features.map((feature, index) => (
            <FadeInWhenVisible key={index} delay={index * 0.1}>
              <Card>
                <IconWrapper className="icon-wrapper">
                  {feature.icon}
                </IconWrapper>
                <CardTitle>{t(`${feature.key}Title`)}</CardTitle>
                <CardText>{t(`${feature.key}Text`)}</CardText>
              </Card>
            </FadeInWhenVisible>
          ))}
        </Grid>
      </Container>
    </SectionWrapper>
  );
}