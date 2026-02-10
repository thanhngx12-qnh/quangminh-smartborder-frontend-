// dir: frontend/src/components/sections/HomePage/PartnersSection.tsx
'use client';

import { useTranslations } from 'next-intl';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';

// --- Styled Components ---
const SectionWrapper = styled.section`
  padding: 80px 0;
  background-color: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled.h2`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 60px;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  
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

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  
  mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent);

  &:hover .track {
    animation-play-state: paused;
  }
`;

const SliderTrack = styled.div`
  display: flex;
  align-items: center; // Quan trọng: Căn giữa các logo theo chiều dọc
  width: fit-content;
  gap: 80px;
  animation: ${scroll} 40s linear infinite;
  
  @media (max-width: 768px) {
    gap: 60px;
    animation-duration: 25s;
  }
`;

// SỬA ĐỔI: Bỏ chiều cao và chiều rộng cố định
const PartnerLogo = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  // Cho phép container co giãn theo nội dung
  height: 60px; // Giữ lại chiều cao để các item trên track thẳng hàng
  
  img {
    filter: grayscale(100%) brightness(1.2);
    opacity: 0.7;
    transition: all 0.3s ease;
  }

  &:hover img {
    filter: grayscale(0%) brightness(1);
    opacity: 1;
    transform: scale(1.1);
  }
`;

// --- Main Component ---
const partnerLogos = [
  '/partners/bhtscm.png',
  '/partners/mn-shipping.png',
  '/partners/vla.png',
  '/partners/vinafco.png',
  '/partners/fm-logistics.png',
  '/partners/hpl.png',
  '/partners/hankyu-hanshin.png',
  '/partners/capitaland.png',
  '/partners/glotrans.png',
  '/partners/chimahtt.png',
  '/partners/xnk-logistics.png',
];

const generateAltText = (src: string) => {
  const fileName = src.split('/').pop()?.split('.')[0] || 'partner logo';
  return fileName.replace(/-/g, ' ').toUpperCase();
};

export default function PartnersSection() {
  const t = useTranslations('Partners');
  const duplicatedLogos = [...partnerLogos, ...partnerLogos];

  return (
    <SectionWrapper>
      <Container>
        <FadeInWhenVisible>
          <Title>{t('title')}</Title>
          <SliderContainer>
            <SliderTrack className="track">
              {duplicatedLogos.map((logoSrc, index) => (
                <PartnerLogo key={index} href="#" target="_blank" rel="noopener noreferrer">
                  {/* SỬA ĐỔI: Áp style trực tiếp vào Image component */}
                  <Image 
                    src={logoSrc} 
                    alt={generateAltText(logoSrc)} 
                    width={160} // Giữ lại để gợi ý aspect ratio
                    height={60} // Giữ lại để gợi ý aspect ratio
                    style={{
                      objectFit: 'contain', // Đảm bảo toàn bộ ảnh được hiển thị
                      width: 'auto',      // Để chiều rộng tự điều chỉnh
                      maxHeight: '60px'     // Giới hạn chiều cao tối đa của ảnh
                    }}
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