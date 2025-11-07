// dir: ~/quangminh-smart-border/frontend/src/components/sections/HomePage/HeroSection.tsx
'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { RiSearchLine } from 'react-icons/ri';
import Button, { ButtonLink } from '@/components/ui/Button'; // <-- Import cả Button và ButtonLink
import { useRouter } from '@/navigation';
import { useForm } from 'react-hook-form';
import TrackingSearchForm from '@/components/shared/TrackingSearchForm'; 

// --- Styled Components ---
const HeroWrapper = styled.section`
  position: relative;
  height: 600px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: ${({ theme }) => theme.colors.white};
  padding: 0 100px;

  @media (max-width: 992px) {
    padding: 0 40px;
    height: 500px;
    justify-content: center;
    text-align: center;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/hero-background.webp');
  background-size: cover;
  background-position: center;
  z-index: -2;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(11, 46, 74, 0.6);
    z-index: -1;
  }
`;

const HeroContent = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h1`
  font-size: 64px;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: -16px;

  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

const Subtitle = styled.p`
  font-size: 48px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.accent};

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const CtaGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;

  @media (max-width: 992px) {
    justify-content: center;
  }
`;

// --- Main Component ---
export default function HeroSection() {
  const t = useTranslations('Hero');
  const router = useRouter();

  // Hàm này sẽ được truyền xuống TrackingSearchForm
  const handleSearch = (awbs: string) => {
    // Luôn URL encode chuỗi query để đảm bảo an toàn
    const encodedAwbs = encodeURIComponent(awbs);
    router.push(`/tracking?awbs=${encodedAwbs}` as never);
  };

  return (
    <HeroWrapper>
      <BackgroundImage />
      <HeroContent>
        <Title>{t('title')}</Title>
        <Subtitle>{t('subtitle')}</Subtitle>
        <CtaGroup>
          <ButtonLink href="/tracking" variant="primary" as="a">{t('ctaTrack')}</ButtonLink>
        </CtaGroup>
        
      </HeroContent>
    </HeroWrapper>
  );
}