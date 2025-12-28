// dir: frontend/src/components/sections/HomePage/PartnersSection.tsx
'use client';

import { useTranslations } from 'next-intl';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';

// --- Styled Components ---
const SectionWrapper = styled.section`
  padding: 60px 0;
  background-color: ${({ theme }) => theme.colors.white}; // Nền trắng sạch sẽ
  border-top: 1px solid ${({ theme }) => theme.colors.border}; // Đường kẻ nhẹ ngăn cách
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled.h4`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 40px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); } /* Di chuyển 50% vì ta nhân đôi danh sách */
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  
  // Hiệu ứng làm mờ 2 bên (Fade edges)
  mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );

  // Pause on hover
  &:hover .track {
    animation-play-state: paused;
  }
`;

const SliderTrack = styled.div`
  display: flex;
  width: fit-content;
  gap: 80px;
  animation: ${scroll} 30s linear infinite;
  padding: 20px 0; // Padding để tránh shadow bị cắt (nếu có)
  
  @media (max-width: 768px) {
    gap: 40px;
    animation-duration: 20s; // Chạy nhanh hơn chút trên mobile
  }
`;

const PartnerLogo = styled.div`
  position: relative;
  width: 160px;
  height: 60px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    object-fit: contain;
    filter: grayscale(100%);
    opacity: 0.5;
    transition: all 0.3s ease;
  }

  &:hover img {
    filter: grayscale(0%);
    opacity: 1;
    transform: scale(1.1);
  }
`;

// --- Main Component ---
// Placeholder logos (Bạn hãy thay thế bằng ảnh thật trong public/partners/)
const partnerLogos = [
  '/partners/logo1.svg',
  '/partners/logo1.svg',
  '/partners/logo1.svg',
  '/partners/logo1.svg',
  '/partners/logo1.svg',
  '/partners/logo1.svg',
  '/partners/logo1.svg',
];

export default function PartnersSection() {
  const t = useTranslations('Partners');

  // Nhân đôi danh sách logo đủ nhiều để tạo hiệu ứng vô tận mượt mà
  // (Nhân 4 lần để đảm bảo lấp đầy màn hình rộng nhất)
  const duplicatedLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos];

  return (
    <SectionWrapper>
      <Container>
        <FadeInWhenVisible>
          <Title>{t('title')}</Title>
          <SliderContainer>
            <SliderTrack className="track">
              {duplicatedLogos.map((logoSrc, index) => (
                <PartnerLogo key={index}>
                  {/* Sử dụng ảnh thật hoặc fallback text nếu chưa có ảnh */}
                  <Image 
                    src={logoSrc} 
                    alt={`Partner ${index}`} 
                    width={160} 
                    height={60}
                    style={{ width: 'auto', height: '100%' }}
                  />
                </PartnerLogo>
              ))}
            </SliderTrack>
          </SliderContainer>
        </FadeInWhenVisible>
      </Container>
    </SectionWrapper>
  );
}