// dir: ~/quangminh-smart-border/frontend/src/components/sections/HomePage/PartnersSection.tsx
'use client';

import { useTranslations } from 'next-intl'; // <-- Import useTranslations
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';

// --- Styled Components (Không thay đổi) ---
const SectionWrapper = styled.section`
  padding: 60px 0;
  background-color: ${({ theme }) => theme.colors.surface};
  overflow: hidden;
`;

const Title = styled.h4`
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 40px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const slideAnimation = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
`;

const SliderTrack = styled.div`
  display: flex;
  // Chiều rộng = (chiều rộng 1 logo + gap) * tổng số logo
  // Chúng ta sẽ render mảng logo 2 lần
  width: calc((150px + 80px) * 14); 
  animation: ${slideAnimation} 40s linear infinite;
  gap: 80px;
`;

const PartnerLogo = styled.div`
  height: 40px;
  width: 150px;
  position: relative;
  
  img {
    object-fit: contain;
    filter: grayscale(100%);
    opacity: 0.6;
    transition: all 0.3s ease;
  }

  // Bỏ hover ở đây, vì slider chạy liên tục sẽ khó hover
`;

// --- Main Component ---
const partnerLogos = [
  '/partners/logo1.svg',
  '/partners/logo2.svg',
  '/partners/logo3.svg',
  '/partners/logo4.svg',
  '/partners/logo5.svg',
];

export default function PartnersSection() {
  const t = useTranslations('Partners'); // <-- Lấy translation

  // Để slider chạy mượt, chúng ta nhân đôi danh sách logo
  const duplicatedLogos = [...partnerLogos, ...partnerLogos];

  return (
    <SectionWrapper>
      <Title>{t('title')}</Title>
      {/* 
        Thêm một wrapper để che đi thanh cuộn ngang (nếu có)
        và tạo hiệu ứng 'fade' ở hai bên
      */}
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', overflow: 'hidden' }}>
            <SliderTrack>
              {duplicatedLogos.map((logoSrc, index) => (
                <PartnerLogo key={index}>
                  <Image src={logoSrc} alt={`Partner logo ${index + 1}`} fill sizes="150px" />
                </PartnerLogo>
              ))}
            </SliderTrack>
        </div>
      </div>
    </SectionWrapper>
  );
}