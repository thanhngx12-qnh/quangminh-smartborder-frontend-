// dir: frontend/src/app/[locale]/news/[slug]/NewsDetailClient.tsx
'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/navigation';
import styled from 'styled-components';
import Image from 'next/image';
import parse from 'html-react-parser';
import { 
  RiCalendar2Line, RiUserLine, RiArrowLeftLine,
  RiFacebookCircleFill, RiTwitterFill, RiLinkedinBoxFill,
  RiShareForwardLine
} from 'react-icons/ri';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import { ButtonLink } from '@/components/ui/Button';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { News } from '@/types';
import { useState, useEffect } from 'react';

// --- Styled Components ---

const PageWrapper = styled.div` 
  background-color: ${({ theme }) => theme.colors.surfaceAlt}; 
  padding: 20px 20px 80px; 
  min-height: 100vh; 
`;

const Container = styled.div` 
  max-width: 900px; 
  margin: 0 auto; 
`;

const TopControl = styled.div` 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 20px; 
  @media (max-width: 768px) { flex-direction: column; align-items: flex-start; gap: 10px; } 
`;

const ArticleCard = styled.article` 
  background-color: ${({ theme }) => theme.colors.background}; 
  border-radius: 16px; 
  overflow: hidden; 
  box-shadow: ${({ theme }) => theme.shadows.lg}; 
  border: 1px solid ${({ theme }) => theme.colors.border}; 
`;

const ImageContainer = styled.div` 
  position: relative; 
  width: 100%; 
  height: 450px; 
  background-color: ${({ theme }) => theme.colors.surfaceAlt}; 
  @media (max-width: 768px) { height: 250px; } 
`;

const HeaderContent = styled.div` 
  padding: 40px 40px 20px; 
  text-align: left; 
  @media (max-width: 768px) { padding: 24px 20px 10px; } 
`;

const Title = styled.h1` 
  font-family: ${({ theme }) => theme.fonts.heading}; 
  font-size: clamp(24px, 4vw, 38px); 
  font-weight: 800; 
  line-height: 1.3; 
  margin-bottom: 20px; 
  color: ${({ theme }) => theme.colors.primary}; 
`;

const MetaInfo = styled.div` 
  display: flex; 
  flex-wrap: wrap; 
  gap: 20px; 
  font-size: 14px; 
  font-weight: 500; 
  color: ${({ theme }) => theme.colors.textSecondary}; 
  padding-bottom: 20px; 
  border-bottom: 1px solid ${({ theme }) => theme.colors.border}; 
  span { display: flex; align-items: center; gap: 6px; svg { color: ${({ theme }) => theme.colors.accent}; } } 
`;

const RichTextWrapper = styled.div` 
  padding: 30px 40px 40px; 
  font-size: 17px; 
  line-height: 1.8; 
  color: ${({ theme }) => theme.colors.text}; 

  /* Tối ưu hiển thị cho nội dung từ TinyMCE */
  p { margin-bottom: 18px; }
  strong { font-weight: 700; color: ${({ theme }) => theme.colors.primary}; }
  
  img { 
    max-width: 100% !important; 
    height: auto !important; 
    border-radius: 12px; 
    margin: 20px 0;
    display: block;
  }

  h2, h3 { 
    font-family: ${({ theme }) => theme.fonts.heading}; 
    color: ${({ theme }) => theme.colors.primary}; 
    margin: 35px 0 15px; 
    font-weight: 700; 
  }

  blockquote { 
    border-left: 4px solid ${({ theme }) => theme.colors.accent}; 
    padding: 20px 25px; 
    margin: 30px 0; 
    font-style: italic; 
    background-color: ${({ theme }) => theme.colors.surfaceAlt}; 
    border-radius: 0 12px 12px 0; 
  }

  @media (max-width: 768px) { padding: 20px; font-size: 16px; }
`;

const FooterActions = styled.div` 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  padding: 25px 40px; 
  border-top: 1px solid ${({ theme }) => theme.colors.border}; 
  background-color: ${({ theme }) => theme.colors.surfaceAlt}; 
  @media (max-width: 576px) { flex-direction: column; gap: 20px; padding: 20px; } 
`;

const ShareBox = styled.div` 
  display: flex; 
  align-items: center; 
  gap: 12px; 
  span { font-weight: 600; font-size: 14px; color: ${({ theme }) => theme.colors.textSecondary}; } 
  .icons { 
    display: flex; 
    gap: 10px; 
    a { 
      font-size: 24px; 
      color: ${({ theme }) => theme.colors.textMuted}; 
      transition: all 0.2s; 
      &:hover { transform: translateY(-3px); &.fb { color: #1877F2; } &.tw { color: #1DA1F2; } &.in { color: #0A66C2; } } 
    } 
  } 
`;

interface NewsDetailClientProps {
  newsData: News;
  locale: string;
}

export default function NewsDetailClient({ newsData, locale }: NewsDetailClientProps) {
  const tNav = useTranslations('Navigation');
  const tGeneral = useTranslations('General');
  const tNews = useTranslations('LatestNews');
  const [fullUrl, setFullUrl] = useState('');

  // Lấy URL thực tế chỉ sau khi đã mount (Client side) để tránh lỗi Hydration
  useEffect(() => {
    setFullUrl(window.location.href);
  }, []);

  const translation = newsData.translations.find(t => t.locale === locale) || newsData.translations[0];

  const formatDate = (dateString: string) => {
    try {
      return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateString));
    } catch { return dateString; }
  };

  return (
    <PageWrapper>
      <Container>
        <TopControl>
          <ButtonLink href="/news" variant="ghost" size="small" as="a">
            <RiArrowLeftLine style={{ marginRight: 8 }} /> {tGeneral('back')}
          </ButtonLink>
          
          <Breadcrumbs items={[{ label: tNav('news'), href: '/news' }, { label: translation.title }]} />
        </TopControl>

        {/* 1. HIỆN THỊ NGAY LẬP TỨC (BỎ FADE IN BỌC NGOÀI CÙNG) */}
        <ArticleCard>
          <ImageContainer>
            <Image 
              src={newsData.coverImage || '/images/placeholder.jpg'} 
              alt={translation.title} 
              fill 
              priority 
              sizes="(max-width: 900px) 100vw, 900px" 
              style={{ objectFit: 'cover' }} 
            />
          </ImageContainer>

          <HeaderContent>
            <Title>{translation.title}</Title>
            <MetaInfo>
              {newsData.publishedAt && (
                <span><RiCalendar2Line />{formatDate(newsData.publishedAt)}</span>
              )}
              <span><RiUserLine />Tà Lùng Logistics</span>
              <span><RiShareForwardLine />{tNav('newsSub.logistics')}</span>
            </MetaInfo>
          </HeaderContent>
          
          <RichTextWrapper>
            {/* Dùng parse cho nội dung TinyMCE */}
            {parse(translation.content || '')}
          </RichTextWrapper>

          <FooterActions>
            <ButtonLink href="/news" variant="outline" size="small" as="a">
              <RiArrowLeftLine style={{ marginRight: 8 }} /> {tNews('viewOther')}
            </ButtonLink>

            <ShareBox>
              <span>{tGeneral('share')}:</span>
              <div className="icons">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`} target="_blank" rel="noopener" className="fb"><RiFacebookCircleFill /></a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(translation.title)}`} target="_blank" rel="noopener" className="tw"><RiTwitterFill /></a>
                <a href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(fullUrl)}`} target="_blank" rel="noopener" className="in"><RiLinkedinBoxFill /></a>
              </div>
            </ShareBox>
          </FooterActions>
        </ArticleCard>
      </Container>
    </PageWrapper>
  );
}