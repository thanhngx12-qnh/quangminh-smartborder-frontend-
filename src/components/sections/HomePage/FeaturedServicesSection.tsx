// dir: frontend/src/components/sections/HomePage/FeaturedServicesSection.tsx
'use client';

import { useTranslations, useLocale } from 'next-intl';
import styled from 'styled-components';
import { Service } from '@/types';
import { Link } from '@/navigation';
import { RiArrowLeftSLine, RiArrowRightSLine, RiArrowRightLine, RiDashboardLine, RiArrowRightUpLine } from 'react-icons/ri';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import { ButtonLink } from '@/components/ui/Button';
import Image from 'next/image';
import { useMemo } from 'react';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// --- Styled Components ---

const SectionWrapper = styled.section`
  padding: 100px 0;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative; /* Cần thiết để các nút Nav bám vào */
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 50px;
  gap: 40px;
  @media (max-width: 768px) { flex-direction: column; align-items: center; text-align: center; }
`;

const HeaderText = styled.div`
  max-width: 700px;
  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: clamp(30px, 4vw, 40px);
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 16px;
    position: relative;
    &::after { content: ''; display: block; width: 60px; height: 5px; background-color: ${({ theme }) => theme.colors.accent}; margin-top: 10px; border-radius: 2px; @media (max-width: 768px) { margin: 12px auto 0; } }
  }
  p { font-size: 17px; color: ${({ theme }) => theme.colors.textSecondary}; }
`;

const SliderWrapper = styled.div`
  position: relative;
  /* THÊM PADDING DỰ PHÒNG: Để khi nút scale lên không bị che khuất */
  padding: 20px 0 80px; 
  
  .swiper-pagination-bullet { background: ${({ theme }) => theme.colors.primary}; width: 12px; height: 12px; opacity: 0.15; }
  .swiper-pagination-bullet-active { background: ${({ theme }) => theme.colors.accent} !important; width: 40px; border-radius: 6px; opacity: 1; }
  
  .swiper-slide { 
    height: auto; 
    display: flex; 
    transition: opacity 0.4s ease;
    &:not(.swiper-slide-active):not(.swiper-slide-next) { opacity: 0.5; }
  }
`;

/* --- NÂNG CẤP BỘ NÚT ĐIỀU HƯỚNG --- */
const NavButton = styled.div`
  position: absolute;
  top: calc(50% - 30px); /* Căn giữa dọc trừ đi phần pagination bên dưới */
  width: 54px;
  height: 54px;
  background-color: #FFFFFF;
  /* THÊM BORDER */
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 30px;
  cursor: pointer;
  z-index: 50; /* Tăng z-index cao hẳn lên */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
    color: #FFFFFF;
    transform: scale(1.15); /* To lên mượt mà */
    box-shadow: 0 10px 20px rgba(230, 0, 0, 0.2);
  }

  &.prev-btn { left: -20px; }
  &.next-btn { right: -20px; }

  &.swiper-button-disabled {
    opacity: 0.2;
    cursor: not-allowed;
    border-color: #ddd;
    color: #ddd;
    background-color: #f5f5f5;
  }

  @media (max-width: 1400px) {
    &.prev-btn { left: 0; }
    &.next-btn { right: 0; }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const CardWrapper = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  background-color: #001529;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    .card-img { transform: scale(1.08); }
    .overlay { background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%); }
    .icon-btn { background-color: ${({ theme }) => theme.colors.accent}; transform: rotate(45deg); color: #fff; }
  }
`;

const CardImage = styled.div`
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  z-index: 1;
  img { object-fit: cover; transition: transform 0.8s ease; }
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  z-index: 2;
  background: linear-gradient(to top, rgba(0, 10, 20, 0.75) 0%, rgba(0, 10, 20, 0.1) 60%, transparent 100%);
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 0; left: 0; width: 100%;
  padding: 32px;
  z-index: 3;
  color: #FFFFFF;
`;

const IconBtn = styled.div`
  position: absolute;
  top: 25px; right: 25px;
  width: 48px; height: 48px;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 24px;
  z-index: 3;
  transition: all 0.3s ease;
`;

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(20px, 2.5vw, 26px);
  font-weight: 800;
  margin: 0;
  line-height: 1.2;
  color: #FFFFFF;
  text-shadow: 0 2px 8px rgba(0,0,0,0.6);
`;

const CardActionText = styled.div`
  margin-top: 15px;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 14px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

function LocalServiceCard({ service }: { service: Service }) {
  const locale = useLocale();
  const t_general = useTranslations('General');
  const translation = useMemo(() => {
    if (!service || !Array.isArray(service.translations)) return null;
    return service.translations.find(t => t.locale === locale) || service.translations[0];
  }, [service, locale]);
  if (!translation || !translation.slug) return null;
  return (
    <CardWrapper href={{ pathname: '/services/[slug]', params: { slug: translation.slug } }}>
      <CardImage className="card-img"><Image src={service.coverImage || '/images/placeholder.jpg'} alt={translation.title} fill sizes="(max-width: 1024px) 100vw, 600px" /></CardImage>
      <GradientOverlay className="overlay" />
      <IconBtn className="icon-btn"><RiArrowRightUpLine /></IconBtn>
      <CardContent>
        <CardTitle>{translation.title}</CardTitle>
        <CardActionText>{t_general('viewDetails')} <RiArrowRightLine /></CardActionText>
      </CardContent>
    </CardWrapper>
  );
}

const SeeMoreCard = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: #f8fafc;
  border-radius: 20px;
  border: 2px dashed #cbd5e1;
  padding: 32px;
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover { border-color: ${({ theme }) => theme.colors.accent}; background-color: #fff; transform: translateY(-8px); }
  .icon-box { width: 70px; height: 70px; border-radius: 50%; background-color: #fff; display: flex; align-items: center; justify-content: center; font-size: 32px; color: ${({ theme }) => theme.colors.primary}; box-shadow: ${({ theme }) => theme.shadows.sm}; margin-bottom: 20px; }
`;

export default function FeaturedServicesSection({ services }: { services?: Service[] }) {
  const t = useTranslations('FeaturedServices');
  const t_general = useTranslations('General');
  const locale = useLocale();

  const validServices = useMemo(() => {
    if (!Array.isArray(services)) return [];
    return services.filter(s => s && Array.isArray(s.translations) && s.translations.some(trans => trans.locale === locale));
  }, [services, locale]);

  return (
    <SectionWrapper>
      <Container>
        <FadeInWhenVisible>
          <SectionHeader>
            <HeaderText>
              <h2>{t('title')}</h2>
              <p>{t('description')}</p>
            </HeaderText>
            <div className="hidden-mobile">
              <ButtonLink href={{ pathname: '/services' }} variant="outline" size="medium">
                {t_general('viewAll')} <RiArrowRightLine style={{ marginLeft: 6 }}/>
              </ButtonLink>
            </div>
          </SectionHeader>
        </FadeInWhenVisible>

        <SliderWrapper>
          <NavButton className="prev-btn"><RiArrowLeftSLine /></NavButton>
          <NavButton className="next-btn"><RiArrowRightSLine /></NavButton>

          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            navigation={{
              prevEl: '.prev-btn',
              nextEl: '.next-btn',
            }}
            spaceBetween={30}
            slidesPerView={1.1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1280: { slidesPerView: 2, spaceBetween: 40 },
            }}
          >
            {validServices.slice(0, 10).map((service) => (
              <SwiperSlide key={service.id}>
                <LocalServiceCard service={service} />
              </SwiperSlide>
            ))}

            <SwiperSlide>
              <SeeMoreCard href={{ pathname: '/services' }}>
                <div className="icon-box"><RiDashboardLine /></div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#003366', margin: '0 0 8px' }}>{t_general('viewAllServices')}</h3>
                <span style={{ fontSize: '14px', color: '#64748b' }}>{t_general('exploreMore')}</span>
              </SeeMoreCard>
            </SwiperSlide>
          </Swiper>
        </SliderWrapper>
      </Container>
    </SectionWrapper>
  );
}