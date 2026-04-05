// dir: frontend/src/app/[locale]/news/[slug]/page.tsx
'use client';

import { useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';
import { useNewsBySlug } from '@/hooks/useNews';
import styled from 'styled-components';
import Image from 'next/image';
import parse from 'html-react-parser';
import { RiCalendar2Line, RiUserLine, RiArrowLeftLine, RiFacebookCircleFill, RiTwitterFill, RiLinkedinBoxFill, RiShareForwardLine } from 'react-icons/ri';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import ArticlePageSkeleton from '@/components/skeletons/ArticlePageSkeleton';
import ErrorState from '@/components/ui/ErrorState';
import { ButtonLink } from '@/components/ui/Button';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

// --- Styled Components (Giữ nguyên) ---
const PageWrapper = styled.div` background-color: ${({ theme }) => theme.colors.surfaceAlt}; padding: 20px 20px 80px; min-height: 100vh; `;
const Container = styled.div` max-width: 900px; margin: 0 auto; `;
const TopControl = styled.div` display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; @media (max-width: 576px) { flex-direction: column; align-items: flex-start; gap: 10px; } `;
const ArticleCard = styled.article` background-color: ${({ theme }) => theme.colors.background}; border-radius: 16px; overflow: hidden; box-shadow: ${({ theme }) => theme.shadows.lg}; border: 1px solid ${({ theme }) => theme.colors.border}; `;
const ImageContainer = styled.div` position: relative; width: 100%; height: 450px; background-color: ${({ theme }) => theme.colors.surfaceAlt}; @media (max-width: 768px) { height: 250px; } `;
const HeaderContent = styled.div` padding: 40px 40px 20px; text-align: left; @media (max-width: 768px) { padding: 24px 20px 10px; } `;
const Title = styled.h1` font-family: ${({ theme }) => theme.fonts.heading}; font-size: clamp(24px, 4vw, 38px); font-weight: 800; line-height: 1.3; margin-bottom: 20px; color: ${({ theme }) => theme.colors.primary}; `;
const MetaInfo = styled.div` display: flex; flex-wrap: wrap; gap: 20px; font-size: 14px; font-weight: 500; color: ${({ theme }) => theme.colors.textSecondary}; padding-bottom: 20px; border-bottom: 1px solid ${({ theme }) => theme.colors.border}; span { display: flex; align-items: center; gap: 6px; svg { color: ${({ theme }) => theme.colors.accent}; } } `;
const RichTextWrapper = styled.div` padding: 30px 40px 40px; font-size: 17px; line-height: 1.8; color: ${({ theme }) => theme.colors.text}; h2, h3, h4 { font-family: ${({ theme }) => theme.fonts.heading}; color: ${({ theme }) => theme.colors.primary}; margin: 35px 0 15px; font-weight: 700; } p { margin-bottom: 18px; } ul, ol { margin: 0 0 20px 25px; li { margin-bottom: 10px; &::marker { color: ${({ theme }) => theme.colors.accent}; font-weight: bold; } } } img { max-width: 100%; height: auto; border-radius: 12px; margin: 30px 0; box-shadow: ${({ theme }) => theme.shadows.md}; } table { width: 100% !important; border-collapse: collapse; margin: 20px 0; overflow-x: auto; display: block; td, th { border: 1px solid ${({ theme }) => theme.colors.border}; padding: 12px; min-width: 120px; } th { background-color: ${({ theme }) => theme.colors.surfaceAlt}; } } blockquote { border-left: 4px solid ${({ theme }) => theme.colors.accent}; padding: 20px 25px; margin: 30px 0; font-style: italic; background-color: ${({ theme }) => theme.colors.surfaceAlt}; border-radius: 0 12px 12px 0; } @media (max-width: 768px) { padding: 20px; font-size: 16px; } `;
const FooterActions = styled.div` display: flex; justify-content: space-between; align-items: center; padding: 25px 40px; border-top: 1px solid ${({ theme }) => theme.colors.border}; background-color: ${({ theme }) => theme.colors.surfaceAlt}; @media (max-width: 576px) { flex-direction: column; gap: 20px; padding: 20px; } `;
const ShareBox = styled.div` display: flex; align-items: center; gap: 12px; span { font-weight: 600; font-size: 14px; color: ${({ theme }) => theme.colors.textSecondary}; } .icons { display: flex; gap: 10px; a { font-size: 24px; color: ${({ theme }) => theme.colors.textMuted}; transition: all 0.2s; &:hover { transform: translateY(-3px); &.fb { color: #1877F2; } &.tw { color: #1DA1F2; } &.in { color: #0A66C2; } } } } `;

export default function NewsDetailPage() {
  const params = useParams(); 
  const slug = params?.slug as string;
  const locale = useLocale();
  const router = useRouter();
  
  const { news, isLoading, isError } = useNewsBySlug(slug, locale);
  
  const tNav = useTranslations('Navigation');
  const tMeta = useTranslations('Metadata');
  const tErrors = useTranslations('Errors');
  const tNotFound = useTranslations('NotFound');
  const tGeneral = useTranslations('General'); // Thêm General
  const tNews = useTranslations('LatestNews'); // Thêm LatestNews cho ViewOther

  useEffect(() => {
    if (news) {
      const translation = news.translations.find(tr => tr.locale === locale);
      if (translation) {
        document.title = tMeta('newsTitle', { newsTitle: translation.title });
      }
    }
  }, [news, locale, tMeta]);
  
  if (isLoading) return <ArticlePageSkeleton />;

  if (isError || !news) {
    return <ErrorState title={tNotFound('title')} description={tNotFound('description')} actionText={tGeneral('back')} onAction={() => router.push('/news' as never)} fullScreen />;
  }

  const translation = news.translations.find(t => t.locale === locale) || news.translations[0];
  const fullUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <PageWrapper>
      <Container>
        <TopControl>
          <ButtonLink href="/news" variant="ghost" size="small" as="a">
            <RiArrowLeftLine style={{ marginRight: 8 }} /> {tNav('news')}
          </ButtonLink>
          <Breadcrumbs items={[{ label: tNav('news'), href: '/news' }, { label: translation.title }]} />
        </TopControl>

        <FadeInWhenVisible>
          <ArticleCard>
            <ImageContainer>
              <Image src={news.coverImage || '/images/placeholder.jpg'} alt={translation.title} fill priority sizes="(max-width: 900px) 100vw, 900px" style={{ objectFit: 'cover' }} />
            </ImageContainer>

            <HeaderContent>
              <Title>{translation.title}</Title>
              <MetaInfo>
                {news.publishedAt && (
                  <span><RiCalendar2Line />{new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(news.publishedAt))}</span>
                )}
                <span><RiUserLine />Tà Lùng Logistics</span>
                <span><RiShareForwardLine />{tNav('newsSub.logistics')}</span>
              </MetaInfo>
            </HeaderContent>
            
            <RichTextWrapper>{parse(translation.content || '')}</RichTextWrapper>

            <FooterActions>
              {/* SỬA LỖI: Sử dụng tNews('viewOther') từ JSON */}
              <ButtonLink href="/news" variant="outline" size="small" as="a">
                <RiArrowLeftLine style={{ marginRight: 8 }} /> {tNews('viewOther')}
              </ButtonLink>

              <ShareBox>
                {/* SỬA LỖI: Sử dụng tGeneral('share') từ JSON */}
                <span>{tGeneral('share')}:</span>
                <div className="icons">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`} target="_blank" rel="noopener" className="fb"><RiFacebookCircleFill /></a>
                  <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}`} target="_blank" rel="noopener" className="tw"><RiTwitterFill /></a>
                  <a href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(fullUrl)}`} target="_blank" rel="noopener" className="in"><RiLinkedinBoxFill /></a>
                </div>
              </ShareBox>
            </FooterActions>
          </ArticleCard>
        </FadeInWhenVisible>
      </Container>
    </PageWrapper>
  );
}