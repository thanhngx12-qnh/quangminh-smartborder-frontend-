// dir: frontend/src/app/[locale]/news/[slug]/page.tsx
'use client';

import { useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/navigation';
import { useNewsBySlug } from '@/hooks/useNews';
import styled from 'styled-components';
import Image from 'next/image';
import parse from 'html-react-parser';
import { 
  RiCalendar2Line, RiUserLine, RiArrowLeftLine,
  RiFacebookCircleFill, RiTwitterFill, RiLinkedinBoxFill 
} from 'react-icons/ri';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import ArticlePageSkeleton from '@/components/skeletons/ArticlePageSkeleton';
import ErrorState from '@/components/ui/ErrorState';
import { ButtonLink } from '@/components/ui/Button';

// --- Styled Components ---

const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceAlt}; // Nền xám nhẹ
  padding: 40px 20px 80px;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const BackButtonWrapper = styled.div`
  margin-bottom: 20px;
`;

const ArticleCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ArticleHeader = styled.header`
  position: relative;
  width: 100%;
  height: 400px;

  @media (max-width: 768px) {
    height: 250px;
  }
`;

const HeaderImage = styled(Image)`
  object-fit: cover;
`;

const HeaderContent = styled.div`
  padding: 40px;
  text-align: center;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.primary};
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  
  span {
    display: flex;
    align-items: center;
    gap: 8px;
    svg { color: ${({ theme }) => theme.colors.accent}; font-size: 16px; }
  }
`;

// Wrapper cho nội dung HTML từ TinyMCE
const RichTextWrapper = styled.article`
  padding: 0 40px 40px;
  font-size: 17px;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};

  h2, h3, h4 {
    font-family: ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.primary};
    margin-top: 32px;
    margin-bottom: 16px;
    font-weight: 700;
  }
  h2 { font-size: 24px; }
  h3 { font-size: 20px; }

  p { margin-bottom: 16px; }

  ul, ol {
    margin-bottom: 20px;
    padding-left: 24px;
    li {
      margin-bottom: 8px;
      &::marker { color: ${({ theme }) => theme.colors.accent}; font-weight: bold; }
    }
  }

  strong { color: ${({ theme }) => theme.colors.primary}; font-weight: 700; }
  a { color: ${({ theme }) => theme.colors.accent}; text-decoration: underline; }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 32px 0;
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  blockquote {
    border-left: 3px solid ${({ theme }) => theme.colors.accent};
    padding-left: 24px;
    margin: 32px 0;
    font-style: italic;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.surfaceAlt};
    padding: 20px 24px;
    border-radius: 8px;
  }
  
  @media (max-width: 768px) {
    padding: 0 24px 24px;
    font-size: 16px;
  }
`;

const ShareSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px 40px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: 40px;

  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }

  a {
    display: flex;
    font-size: 24px;
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: color 0.2s, transform 0.2s;
    &:hover {
      transform: scale(1.2);
      &.facebook { color: #1877F2; }
      &.twitter { color: #1DA1F2; }
      &.linkedin { color: #0A66C2; }
    }
  }
`;

// Helper format ngày
const formatDate = (dateString: string, locale: string) => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric', month: 'long', day: 'numeric',
  }).format(new Date(dateString));
};

// --- Main Component ---
interface NewsDetailPageProps {
  params: { slug: string };
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = params;
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { news, isLoading, isError } = useNewsBySlug(slug, locale);
  
  const t = useTranslations('Metadata');
  
  // SEO
  useEffect(() => {
    if (news) {
      const translation = news.translations.find(tr => tr.locale === locale);
      if (translation) {
        document.title = t('newsTitle', { newsTitle: translation.title });
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', translation.excerpt);
      }
    }
    return () => { document.title = t('defaultTitle'); };
  }, [news, locale, t]);
  
  if (isLoading) return <ArticlePageSkeleton />;

  if (isError || !news) {
    return (
      <ErrorState 
        title="Không tìm thấy bài viết"
        description="Bài viết bạn đang tìm không tồn tại hoặc đã bị xóa."
        actionText="Quay lại trang tin tức"
        onAction={() => router.push('/news' as never)}
        fullScreen
      />
    );
  }

  const translation = news.translations.find(t => t.locale === locale);

  if (!translation) {
    return (
      <ErrorState 
        title="Nội dung chưa có sẵn"
        description="Nội dung cho ngôn ngữ này đang được cập nhật. Vui lòng quay lại sau."
        actionText="Quay lại trang tin tức"
        onAction={() => router.push('/news' as never)}
        fullScreen
      />
    );
  }
  
  const fullUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <PageWrapper>
      <Container>
        <BackButtonWrapper>
          <ButtonLink href="/news" variant="ghost" size="small" as="a">
            <RiArrowLeftLine style={{ marginRight: 8 }} /> Quay lại tin tức
          </ButtonLink>
        </BackButtonWrapper>

        <FadeInWhenVisible>
          <ArticleCard>
            <ArticleHeader>
              <HeaderImage 
                src={news.coverImage || '/images/placeholder.jpg'} 
                alt={translation.title} 
                fill 
                priority
                sizes="(max-width: 840px) 100vw, 800px"
              />
            </ArticleHeader>

            <HeaderContent>
              <Title>{translation.title}</Title>
              <MetaInfo>
                {news.publishedAt && (
                  <span><RiCalendar2Line /><time>{formatDate(news.publishedAt, locale)}</time></span>
                )}
                <span><RiUserLine />Admin</span>
              </MetaInfo>
            </HeaderContent>
            
            <RichTextWrapper>
              {parse(translation.content || '')}
            </RichTextWrapper>

            <ShareSection>
              <strong>Chia sẻ:</strong>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`} target="_blank" rel="noopener noreferrer" className="facebook" aria-label="Share on Facebook"><RiFacebookCircleFill /></a>
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(translation.title)}`} target="_blank" rel="noopener noreferrer" className="twitter" aria-label="Share on Twitter"><RiTwitterFill /></a>
              <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(fullUrl)}&title=${encodeURIComponent(translation.title)}`} target="_blank" rel="noopener noreferrer" className="linkedin" aria-label="Share on LinkedIn"><RiLinkedinBoxFill /></a>
            </ShareSection>
          </ArticleCard>
        </FadeInWhenVisible>
      </Container>
    </PageWrapper>
  );
}