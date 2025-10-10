// dir: ~/quangminh-smart-border/frontend/src/components/sections/HomePage/HeroSection.tsx
'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { RiSearchLine } from 'react-icons/ri';
import Button from '@/components/ui/Button';

// --- Styled Components ---
const HeroWrapper = styled.section`
  position: relative;
  height: 600px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start; // Căn nội dung sang trái
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
  background-image: url('/hero-background.webp'); // Thay bằng ảnh thật của bạn
  background-size: cover;
  background-position: center;
  z-index: -2;
  
  // Lớp phủ tối để làm nổi bật chữ
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(11, 46, 74, 0.6); // Màu Navy với độ mờ
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
  margin-bottom: -16px; // Giảm khoảng cách với subtitle

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

const TrackingWidget = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 8px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  input {
    flex-grow: 1;
    border: none;
    background: transparent;
    padding: 8px 12px;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.primary};

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: #888;
    }
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;
    color: ${({ theme }) => theme.colors.primary};
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;


// --- Main Component ---
export default function HeroSection() {
  const t = useTranslations('Hero');

  return (
    <HeroWrapper>
      <BackgroundImage />
      <HeroContent>
        <Title>{t('title')}</Title>
        <Subtitle>{t('subtitle')}</Subtitle>
        <CtaGroup>
          <Button variant="primary">{t('ctaQuote')}</Button>
          <Button variant="secondary">{t('ctaTrack')}</Button>
        </CtaGroup>
        <TrackingWidget>
          <input type="text" placeholder={t('trackingPlaceholder')} />
          <button aria-label="Track Shipment">
            <RiSearchLine />
          </button>
        </TrackingWidget>
      </HeroContent>
    </HeroWrapper>
  );
}