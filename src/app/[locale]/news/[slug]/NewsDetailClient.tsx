// dir: frontend/src/app/[locale]/news/[slug]/NewsDetailClient.tsx
'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import Image from 'next/image';
import parse from 'html-react-parser';
import { 
  RiCalendar2Line, 
  RiUserLine, 
  RiArrowLeftLine,
  RiFacebookCircleFill, 
  RiTwitterFill, 
  RiLinkedinBoxFill,
  RiPriceTag3Line, 
  RiArrowRightLine
} from 'react-icons/ri';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import { ButtonLink } from '@/components/ui/Button';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { News } from '@/types';
import { useState, useEffect, useMemo } from 'react';
import { usePaginatedNews } from '@/hooks/useNews';
import { Link } from '@/navigation'; 

// --- Styled Components (Giữ nguyên) ---
const PageWrapper = styled.div` background-color: ${({ theme }) => theme.colors.surfaceAlt}; padding: 20px 20px 80px; min-height: 100vh; `;
const Container = styled.div` max-width: 900px; margin: 0 auto; `;
const TopControl = styled.div` display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; @media (max-width: 768px) { flex-direction: column; align-items: flex-start; gap: 10px; } `;
const ArticleCard = styled.article` background-color: ${({ theme }) => theme.colors.background}; border-radius: 16px; overflow: hidden; box-shadow: ${({ theme }) => theme.shadows.lg}; border: 1px solid ${({ theme }) => theme.colors.border}; `;
const ImageContainer = styled.div` position: relative; width: 100%; height: 450px; background-color: ${({ theme }) => theme.colors.surfaceAlt}; @media (max-width: 768px) { height: 250px; } `;
const HeaderContent = styled.div` padding: 40px 40px 20px; text-align: left; @media (max-width: 768px) { padding: 24px 20px 10px; } `;
const Title = styled.h1` font-family: ${({ theme }) => theme.fonts.heading}; font-size: clamp(24px, 4vw, 38px); font-weight: 800; line-height: 1.3; margin-bottom: 20px; color: ${({ theme }) => theme.colors.primary}; `;
const MetaInfo = styled.div` display: flex; flex-wrap: wrap; gap: 20px; font-size: 14px; font-weight: 500; color: ${({ theme }) => theme.colors.textSecondary}; padding-bottom: 20px; border-bottom: 1px solid ${({ theme }) => theme.colors.border}; span { display: flex; align-items: center; gap: 6px; svg { color: ${({ theme }) => theme.colors.accent}; } } .category-tag { color: ${({ theme }) => theme.colors.primary}; background-color: ${({ theme }) => theme.colors.secondary}; padding: 4px 12px; border-radius: 4px; font-weight: 600; display: flex; align-items: center; gap: 6px; } `;
const RichTextWrapper = styled.div` padding: 30px 40px 40px; font-size: 17px; line-height: 1.8; color: ${({ theme }) => theme.colors.text}; p { margin-bottom: 18px; } strong { font-weight: 700; color: ${({ theme }) => theme.colors.primary}; } img { max-width: 100% !important; height: auto !important; border-radius: 12px; margin: 20px 0; display: block; } h2, h3 { font-family: ${({ theme }) => theme.fonts.heading}; color: ${({ theme }) => theme.colors.primary}; margin: 35px 0 15px; font-weight: 700; } blockquote { border-left: 4px solid ${({ theme }) => theme.colors.accent}; padding: 20px 25px; margin: 30px 0; font-style: italic; background-color: ${({ theme }) => theme.colors.surfaceAlt}; border-radius: 0 12px 12px 0; } @media (max-width: 768px) { padding: 20px; font-size: 16px; } `;
const FooterActions = styled.div` display: flex; justify-content: space-between; align-items: center; padding: 25px 40px; border-top: 1px solid ${({ theme }) => theme.colors.border}; background-color: ${({ theme }) => theme.colors.surfaceAlt}; @media (max-width: 576px) { flex-direction: column; gap: 20px; padding: 20px; } `;
const ShareBox = styled.div` display: flex; align-items: center; gap: 12px; span { font-weight: 600; font-size: 14px; color: ${({ theme }) => theme.colors.textSecondary}; } .icons { display: flex; gap: 10px; a { font-size: 24px; color: ${({ theme }) => theme.colors.textMuted}; transition: all 0.2s; &:hover { transform: translateY(-3px); &.fb { color: #1877F2; } &.tw { color: #1DA1F2; } &.in { color: #0A66C2; } } } } `;

// SỬA LỖI 2: Loại bỏ 'slug' không sử dụng khỏi interface và tham số hàm
interface NewsDetailClientProps {
  newsData: News;
  locale: string;
}

export default function NewsDetailClient({ newsData, locale }: NewsDetailClientProps) {
  const tNav = useTranslations('Navigation');
  const tGeneral = useTranslations('General');
  const tNews = useTranslations('LatestNews');
  const [fullUrl, setFullUrl] = useState('');

  useEffect(() => {
    setFullUrl(window.location.href);
  }, []);

  const translation = newsData.translations.find(t => t.locale === locale) || newsData.translations[0];

  const categoryName = useMemo(() => {
    if (!newsData.category || !newsData.category.translations) return null;
    const catTrans = newsData.category.translations.find(t => t.locale === locale) 
                     || newsData.category.translations[0];
    return catTrans?.name || null;
  }, [newsData.category, locale]);

  const formatDate = (dateString: string) => {
    try {
      return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateString));
    } catch { return dateString; }
  };

  const { result: relatedResult } = usePaginatedNews(locale, 1);
  const relatedNews = relatedResult?.data
    ?.filter(item => item.id !== newsData.id)
    .slice(0, 3) || [];

  return (
    <PageWrapper>
      <Container>
        <TopControl>
          <ButtonLink href="/news" variant="ghost" size="small" as="a">
            <RiArrowLeftLine style={{ marginRight: 8 }} /> {tGeneral('back')}
          </ButtonLink>
          
          <Breadcrumbs 
            items={[
              { label: tNav('news'), href: '/news' }, 
              { label: translation.title }
            ]} 
          />
        </TopControl>

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
              {categoryName && (
                <span className="category-tag">
                  <RiPriceTag3Line /> {categoryName}
                </span>
              )}
              {newsData.publishedAt && (
                <span><RiCalendar2Line />{formatDate(newsData.publishedAt)}</span>
              )}
              <span><RiUserLine />Tà Lùng Logistics</span>
            </MetaInfo>
          </HeaderContent>
          
          <RichTextWrapper>
            {parse(translation.content || '')}
          </RichTextWrapper>

          <FooterActions>
            <ButtonLink href="/news" variant="outline" size="small" as="a">
              <RiArrowLeftLine style={{ marginRight: 8 }} /> {tNews('viewOther')}
            </ButtonLink>

            <ShareBox>
              <span>{tGeneral('share')}:</span>
              <div className="icons">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`} target="_blank" rel="noopener" className="fb" aria-label="Share on Facebook"><RiFacebookCircleFill /></a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(translation.title)}`} target="_blank" rel="noopener" className="tw" aria-label="Share on Twitter"><RiTwitterFill /></a>
                <a href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(fullUrl)}`} target="_blank" rel="noopener" className="in" aria-label="Share on LinkedIn"><RiLinkedinBoxFill /></a>
              </div>
            </ShareBox>
          </FooterActions>
        </ArticleCard>

        {relatedNews.length > 0 && (
          <div style={{ marginTop: '60px' }}>
            <h3 style={{ 
              fontFamily: 'var(--font-montserrat)', 
              fontSize: '24px', 
              fontWeight: 700, 
              color: '#003366',
              marginBottom: '30px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <RiArrowRightLine style={{ color: '#FF0000' }} />
              {tNews('viewOther')}
            </h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '20px' 
            }}>
              {relatedNews.map((item) => {
                const tr = item.translations.find(t => t.locale === locale) || item.translations[0];
                return (
                  // SỬA LỖI 1: Chuyển href sang dạng Object { pathname, params }
                  <Link 
                    key={item.id} 
                    href={{
                      pathname: '/news/[slug]',
                      params: { slug: tr.slug }
                    }}
                    style={{ 
                      background: '#fff', 
                      borderRadius: '12px', 
                      overflow: 'hidden', 
                      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                      textDecoration: 'none'
                    }}
                  >
                    <div style={{ position: 'relative', height: '160px' }}>
                      <Image src={item.coverImage || '/images/placeholder.jpg'} alt={tr.title} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '15px' }}>
                      <h4 style={{ fontSize: '16px', color: '#333', fontWeight: 600, margin: 0 }}>{tr.title}</h4>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </Container>
    </PageWrapper>
  );
}