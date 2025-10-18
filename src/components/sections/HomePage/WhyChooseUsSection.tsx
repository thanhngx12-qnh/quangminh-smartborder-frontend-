// dir: ~/quangminh-smart-border/frontend/src/components/sections/HomePage/WhyChooseUsSection.tsx
'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import Image from 'next/image';
import { RiRocketLine, RiTeamLine, RiRoadMapLine } from 'react-icons/ri';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';

// --- Styled Components ---
const SectionWrapper = styled.section`
  padding: 80px 20px;
`;

const SectionHeader = styled.h2`
  text-align: center;
  font-size: 36px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 60px;
`;

const FeatureItem = styled.div<{ $reverse?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto 80px auto;
  
  // Đảo ngược vị trí cho item thứ hai
  grid-template-areas: ${({ $reverse }) => $reverse ? '"text image"' : '"image text"'};

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    grid-template-areas: "image" "text"; // Luôn là ảnh ở trên
    gap: 40px;
  }
`;

const FeatureImageWrapper = styled.div`
  grid-area: image;
  position: relative;
  width: 100%;
  padding-top: 66.66%; // Tỷ lệ 3:2
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);

  img {
    object-fit: cover;
  }
`;

const FeatureText = styled.div`
  grid-area: text;
  
  h3 {
    font-size: 28px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 16px;
  }
  
  p {
    font-size: 18px;
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

// --- Main Component ---
export default function WhyChooseUsSection() {
  const t = useTranslations('WhyChooseUs');

  const features = [
    { title: t('point1Title'), text: t('point1Text'), image: '/about/why-choose-us-1.jpg' },
    { title: t('point2Title'), text: t('point2Text'), image: '/about/why-choose-us-2.jpg' },
    { title: t('point3Title'), text: t('point3Text'), image: '/about/why-choose-us-3.jpg' },
  ];

  return (
    <SectionWrapper>
      <FadeInWhenVisible>
        <SectionHeader>{t('title')}</SectionHeader>
      </FadeInWhenVisible>
      
      {features.map((feature, index) => (
        <FadeInWhenVisible key={index}>
          <FeatureItem $reverse={index % 2 !== 0}>
            <FeatureImageWrapper>
              <Image src={feature.image} alt={feature.title} fill sizes="(max-width: 992px) 100vw, 50vw"/>
            </FeatureImageWrapper>
            <FeatureText>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </FeatureText>
          </FeatureItem>
        </FadeInWhenVisible>
      ))}
    </SectionWrapper>
  );
}