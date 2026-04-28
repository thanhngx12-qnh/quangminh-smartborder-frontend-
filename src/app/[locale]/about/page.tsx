// dir: frontend/src/app/[locale]/about/page.tsx
'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import Image from 'next/image';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import { 
  RiStore3Line, 
  RiTruckLine, 
  RiMapPin2Line, 
  RiBuilding4Line, 
  RiFlagLine 
} from 'react-icons/ri';

// --- Styled Components ---

const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
`;

// 1. Hero Section (Parallax)
const HeroSection = styled.section`
  position: relative;
  padding: 140px 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: url('/images/about-hero.jpg'); 
    background-size: cover;
    background-position: center;
    opacity: 0.3;
    z-index: 0;
  }

  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: clamp(36px, 5vw, 56px);
    font-weight: 800;
    margin-bottom: 24px;
    position: relative;
    z-index: 1;
    text-transform: uppercase;
    text-shadow: 0 2px 10px rgba(0,0,0,0.3);
    color: ${({ theme }) => theme.colors.white};
  }

  p {
    font-size: 18px;
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    opacity: 0.95;
    line-height: 1.6;
  }
`;

// 2. Intro Section
const IntroSection = styled.section`
  padding: 100px 20px;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const IntroText = styled.div`
  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 32px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 24px;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      display: block;
      width: 60px;
      height: 4px;
      background-color: ${({ theme }) => theme.colors.accent};
      margin-top: 10px;
    }
  }

  p {
    font-size: 16px;
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.textSecondary};
    white-space: pre-line;
    text-align: justify;
  }
`;

const IntroImage = styled.div`
  position: relative;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  
  img {
    object-fit: cover;
  }
`;

// 3. Mission Section
const MissionSection = styled.section`
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  padding: 80px 20px;
  text-align: center;
`;

const MissionContent = styled.div`
  max-width: 900px;
  margin: 0 auto;

  .icon {
    font-size: 48px;
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: 20px;
  }

  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 32px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

// 4. Timeline Section
const TimelineSection = styled.section`
  padding: 100px 20px;
  background-color: ${({ theme }) => theme.colors.background};
  position: relative;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 32px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.border};
    @media (max-width: 768px) { left: 20px; }
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 60px;
  width: 50%;
  padding: 0 40px;
  
  &:nth-child(odd) {
    left: 0;
    text-align: right;
    .dot { right: -6px; }
  }

  &:nth-child(even) {
    left: 50%;
    text-align: left;
    .dot { left: -6px; }
  }

  .dot {
    position: absolute;
    top: 0;
    width: 14px;
    height: 14px;
    background-color: ${({ theme }) => theme.colors.accent};
    border-radius: 50%;
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.background}, 0 0 0 6px ${({ theme }) => theme.colors.accent};
  }

  @media (max-width: 768px) {
    width: 100%;
    left: 0 !important;
    text-align: left !important;
    padding-left: 50px;
    padding-right: 0;
    .dot { left: 14px !important; }
  }
`;

const Year = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 8px;
`;

const EventText = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

// 5. Facilities Section
const FacilitiesSection = styled.section`
  padding: 80px 20px;
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
`;

const FacilitiesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FacilityCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 40px;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.hover};
  }

  .icon {
    font-size: 48px;
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: 20px;
  }

  h3 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 22px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 16px;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.6;
  }
`;

// 6. Process Section
const ProcessSection = styled.section`
  padding: 100px 20px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const StepsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 25px;
    left: 50px;
    right: 50px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.secondary};
    z-index: 0;
  }

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 40px;
    &::before { top: 0; bottom: 0; left: 25px; width: 3px; height: auto; }
  }
`;

const StepItem = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  flex: 1;
  padding: 0 10px;

  @media (max-width: 992px) {
    display: flex;
    text-align: left;
    gap: 20px;
    padding: 0;
  }
`;

const StepNumber = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  font-weight: 700;
  font-size: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px auto;
  box-shadow: 0 0 0 8px ${({ theme }) => theme.colors.background};

  @media (max-width: 992px) { margin: 0; flex-shrink: 0; }
`;

const StepContent = styled.div`
  h4 {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 8px;
    font-size: 18px;
  }
  p { font-size: 14px; color: ${({ theme }) => theme.colors.textSecondary}; line-height: 1.5; }
`;

// 7. Vision Section
const VisionSection = styled.section`
  padding: 100px 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  position: relative;
  overflow: hidden;
  background-image: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 60%);
`;

const VisionContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 36px;
    margin-bottom: 30px;
    color: ${({ theme }) => theme.colors.accent};
    text-transform: uppercase;
  }

  p { font-size: 18px; line-height: 1.8; opacity: 0.9; white-space: pre-line; }
`;

// 8. Offices & Map
const OfficeSection = styled.section`
  padding: 80px 20px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const OfficeGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto 40px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const OfficeCard = styled.div`
  background: ${({ theme }) => theme.colors.surfaceAlt};
  padding: 30px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: flex-start;
  gap: 16px;

  svg { font-size: 24px; color: ${({ theme }) => theme.colors.accent}; flex-shrink: 0; margin-top: 4px; }

  div {
    strong { display: block; color: ${({ theme }) => theme.colors.primary}; font-size: 18px; margin-bottom: 8px; font-weight: 700; }
    p { color: ${({ theme }) => theme.colors.textSecondary}; line-height: 1.5; }
  }
`;

const MapContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 450px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  
  iframe { width: 100%; height: 100%; border: 0; filter: grayscale(0.2); }
`;

// --- Main Component ---
export default function AboutPage() {
  const t = useTranslations('AboutPage');

  // Cập nhật key timeline để khớp với nội dung chính xác
  const timelineData = [
    { year: t('timeline.stage1_year'), text: t('timeline.stage1_text') }, // 2008
    { year: t('timeline.stage2_year'), text: t('timeline.stage2_text') }, // Hiện tại
    { year: t('timeline.stage3_year'), text: t('timeline.stage3_text') }, // Tương lai
  ];

  const processSteps = [1, 2, 3, 4, 5];

  return (
    <PageWrapper>
      {/* 1. Hero */}
      <FadeInWhenVisible>
        <HeroSection>
          <h1>{t('heroTitle')}</h1>
          <p>{t('heroSubtitle')}</p>
        </HeroSection>
      </FadeInWhenVisible>

      {/* 2. Intro */}
      <IntroSection>
        <FadeInWhenVisible>
          <IntroText>
            <h2>{t('intro.title')}</h2>
            <p>{t('intro.content')}</p>
          </IntroText>
        </FadeInWhenVisible>
        <FadeInWhenVisible delay={0.2}>
          <IntroImage>
            <Image 
              src="/images/image.png" 
              alt="Giới thiệu Phú Anh" 
              fill 
              sizes="(max-width: 992px) 100vw, 50vw"
            />
          </IntroImage>
        </FadeInWhenVisible>
      </IntroSection>

      {/* 3. Mission */}
      <MissionSection>
        <FadeInWhenVisible>
          <MissionContent>
            <RiFlagLine className="icon"/>
            <h2>{t('missionTitle')}</h2>
            <p>{t('missionText')}</p>
          </MissionContent>
        </FadeInWhenVisible>
      </MissionSection>

      {/* 4. Timeline */}
      <TimelineSection>
        <FadeInWhenVisible>
          <SectionHeader>
            <h2>{t('timelineTitle')}</h2>
          </SectionHeader>
          <TimelineContainer>
            {timelineData.map((item, index) => (
              <TimelineItem key={index}>
                <FadeInWhenVisible delay={index * 0.1}>
                  <div className="dot" />
                  <Year>{item.year}</Year>
                  <EventText>{item.text}</EventText>
                </FadeInWhenVisible>
              </TimelineItem>
            ))}
          </TimelineContainer>
        </FadeInWhenVisible>
      </TimelineSection>

      {/* 5. Facilities */}
      <FacilitiesSection>
        <FacilitiesGrid>
          <FadeInWhenVisible delay={0.1}>
            <FacilityCard>
              <RiStore3Line className="icon" />
              <h3>{t('facilities.warehouseTitle')}</h3>
              <p>{t('facilities.warehouseContent')}</p>
            </FacilityCard>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.2}>
            <FacilityCard>
              <RiTruckLine className="icon" />
              <h3>{t('facilities.transportTitle')}</h3>
              <p>{t('facilities.transportContent')}</p>
            </FacilityCard>
          </FadeInWhenVisible>
        </FacilitiesGrid>
      </FacilitiesSection>

      {/* 6. Process */}
      <ProcessSection>
        <FadeInWhenVisible>
          <SectionHeader>
            <h2>{t('process.title')}</h2>
          </SectionHeader>
          <StepsContainer>
            {processSteps.map((step) => (
              <StepItem key={step}>
                <StepNumber>{step}</StepNumber>
                <StepContent>
                  <h4>{t(`process.steps.${step}.title`)}</h4>
                  <p>{t(`process.steps.${step}.desc`)}</p>
                </StepContent>
              </StepItem>
            ))}
          </StepsContainer>
        </FadeInWhenVisible>
      </ProcessSection>

      {/* 7. Vision */}
      <VisionSection>
        <FadeInWhenVisible>
          <VisionContent>
            <h2>{t('vision.title')}</h2>
            <p>{t('vision.content')}</p>
          </VisionContent>
        </FadeInWhenVisible>
      </VisionSection>

      {/* 8. Offices & Map */}
      <OfficeSection>
        <FadeInWhenVisible>
          <SectionHeader>
            <h2>{t('offices.title')}</h2>
          </SectionHeader>
          <OfficeGrid>
            <OfficeCard>
              <RiBuilding4Line />
              <div>
                <strong>{t('offices.addressCB')}</strong>
                <p>{t('offices.caobang')}</p>
              </div>
            </OfficeCard>
            <OfficeCard>
              <RiMapPin2Line />
              <div>
                <strong>{t('offices.addressQN')}</strong>
                <p>{t('offices.halong')}</p>
              </div>
            </OfficeCard>
          </OfficeGrid>

          <MapContainer>
            <iframe
              src="https://maps.google.com/maps?q=22.477244,106.582163&t=k&z=16&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              title="Vị trí Tà Lùng Logistics"
            ></iframe>
          </MapContainer>
        </FadeInWhenVisible>
      </OfficeSection>
    </PageWrapper>
  );
}