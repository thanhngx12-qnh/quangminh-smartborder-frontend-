// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/about/page.tsx
'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import Image from 'next/image';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';

// --- Styled Components ---
const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
`;

// --- Hero Section ---
const HeroSection = styled.section`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 100px 20px;
  text-align: center;

  h1 {
    font-size: 48px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 16px;
  }

  p {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.textSecondary};
    max-width: 700px;
    margin: 0 auto;
  }
`;

// --- Mission Section ---
const MissionSection = styled.section`
  padding: 80px 20px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;

  h2 {
    font-size: 36px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 24px;
  }

  p {
    font-size: 18px;
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

// --- Timeline Section ---
const TimelineSectionWrapper = styled.section`
  padding: 80px 20px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const TimelineHeader = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: 60px;
`;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;

  &::after {
    content: '';
    position: absolute;
    width: 4px;
    background-color: ${({ theme }) => theme.colors.accent};
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -2px;
  }

  @media (max-width: 768px) {
    &::after {
      left: 30px;
    }
  }
`;

const TimelineItem = styled.div`
  padding: 10px 40px;
  position: relative;
  width: 50%;

  &:nth-child(odd) {
    left: 0;
  }

  &:nth-child(even) {
    left: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    right: -10px;
    background-color: ${({ theme }) => theme.colors.white};
    border: 4px solid ${({ theme }) => theme.colors.accent};
    top: 15px;
    border-radius: 50%;
    z-index: 1;
  }

  &:nth-child(even)::after {
    left: -10px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;

    &:nth-child(even) {
      left: 0%;
    }

    &::after {
      left: 20px;
    }
  }
`;

const TimelineContent = styled.div`
  padding: 20px 30px;
  background-color: ${({ theme }) => theme.colors.background};
  position: relative;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 24px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: 8px;
  }
`;

// --- Leadership Section ---
const LeadershipSection = styled.section`
  padding: 80px 20px;
`;

const LeadershipHeader = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: 60px;
`;

const LeadershipGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  max-width: 1000px;
  margin: 0 auto;
`;

const MemberCard = styled.div`
  text-align: center;
`;

const MemberImageWrapper = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 24px auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  img {
    object-fit: cover;
  }
`;

const MemberInfo = styled.div`
  h3 {
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }
  p {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.accent};
  }
`;


// --- Main Component ---
export default function AboutPage() {
  const t = useTranslations('AboutPage');

  const timelineItems = [
    { year: '2025', text: t('timeline.y2025') },
    { year: '2026', text: t('timeline.y2026') },
    { year: '2027', text: t('timeline.y2027') },
  ];

  const leadershipMembers = [
    { name: t('leadership.person1Name'), title: t('leadership.person1Title'), image: '/team/leader-1.jpg' },
    { name: t('leadership.person2Name'), title: t('leadership.person2Title'), image: '/team/leader-2.jpg' },
    { name: t('leadership.person3Name'), title: t('leadership.person3Title'), image: '/team/leader-3.jpg' },
  ];

  return (
    <PageWrapper>
      <FadeInWhenVisible>
        <HeroSection>
          <h1>{t('heroTitle')}</h1>
          <p>{t('heroSubtitle')}</p>
        </HeroSection>
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        <MissionSection>
          <h2>{t('missionTitle')}</h2>
          <p>{t('missionText')}</p>
        </MissionSection>
      </FadeInWhenVisible>

      <TimelineSectionWrapper>
        <FadeInWhenVisible>
          <TimelineHeader>{t('timelineTitle')}</TimelineHeader>
          <TimelineContainer>
            {timelineItems.map((item, index) => (
              <TimelineItem key={index}>
                <FadeInWhenVisible>
                  <TimelineContent>
                    <h3>{item.year}</h3>
                    <p>{item.text}</p>
                  </TimelineContent>
                </FadeInWhenVisible>
              </TimelineItem>
            ))}
          </TimelineContainer>
        </FadeInWhenVisible>
      </TimelineSectionWrapper>

      <LeadershipSection>
        <FadeInWhenVisible>
          <LeadershipHeader>{t('leadershipTitle')}</LeadershipHeader>
          <LeadershipGrid>
            {leadershipMembers.map((member, index) => (
              <FadeInWhenVisible key={index} transition={{ delay: index * 0.2 }}>
                <MemberCard>
                  <MemberImageWrapper>
                    <Image src={member.image} alt={member.name} fill sizes="180px" />
                  </MemberImageWrapper>
                  <MemberInfo>
                    <h3>{member.name}</h3>
                    <p>{member.title}</p>
                  </MemberInfo>
                </MemberCard>
              </FadeInWhenVisible>
            ))}
          </LeadershipGrid>
        </FadeInWhenVisible>
      </LeadershipSection>
    </PageWrapper>
  );
}