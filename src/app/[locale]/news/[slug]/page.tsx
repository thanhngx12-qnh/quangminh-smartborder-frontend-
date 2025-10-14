// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/news/[slug]/page.tsx
'use client';

import { useLocale } from 'next-intl';
import { useNewsBySlug } from '@/hooks/useNews';
import styled from 'styled-components';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { RiCalendar2Line, RiUserLine } from 'react-icons/ri';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';

// --- Styled Components ---
const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding-bottom: 80px;
`;

const ArticleHeader = styled.header`
  position: relative;
  width: 100%;
  height: 450px; // Cao hơn một chút cho ấn tượng
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  color: ${({ theme }) => theme.colors.white};

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(15, 23, 42, 0.9) 20%, rgba(15, 23, 42, 0.3) 100%);
    z-index: 1;
  }
`;

const HeaderImage = styled(Image)`
  object-fit: cover;
`;

const HeaderContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 42px;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  
  span {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const ArticleBody = styled.article`
  max-width: 800px;
  margin: 40px auto 0 auto;
  padding: 0 20px;
  font-size: 18px;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textSecondary};

  h2, h3 {
    color: ${({ theme }) => theme.colors.text};
    margin-top: 40px;
    margin-bottom: 16px;
    line-height: 1.4;
  }
  
  p {
    margin-bottom: 20px;
  }

  ul, ol {
    margin-left: 24px;
    margin-bottom: 20px;
    li {
      margin-bottom: 10px;
    }
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: underline;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 32px 0;
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.accent};
    padding-left: 24px;
    margin: 32px 0;
    font-style: italic;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const LoadingState = styled.div` /* ... */ `;
const ErrorState = styled.div` /* ... */ `;

// Helper để format ngày tháng
const formatDate = (dateString: string, locale: string) => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString));
};

// --- Main Component ---
interface NewsDetailPageProps {
  params: { slug: string };
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = params;
  const locale = useLocale();
  const { news, isLoading, isError } = useNewsBySlug(slug, locale);

  if (isLoading) return <LoadingState>Loading article...</LoadingState>;
  if (isError) return <ErrorState>Could not find the requested article.</ErrorState>;
  if (!news) return null;

  const translation = news.translations.find(t => t.locale === locale) || news.translations[0];

  return (
    <PageWrapper>
      <ArticleHeader>
        <HeaderImage 
          src={news.coverImage || '/placeholder.jpg'} 
          alt={translation.title} 
          fill 
          priority 
        />
        <HeaderContent>
          <FadeInWhenVisible>
            <Title>{translation.title}</Title>
            <MetaInfo>
              {news.publishedAt && (
                <span>
                  <RiCalendar2Line />
                  <time dateTime={news.publishedAt}>{formatDate(news.publishedAt, locale)}</time>
                </span>
              )}
              <span>
                <RiUserLine />
                Admin
              </span>
            </MetaInfo>
          </FadeInWhenVisible>
        </HeaderContent>
      </ArticleHeader>

      <FadeInWhenVisible>
        <ArticleBody>
          <ReactMarkdown>
            {translation.content || 'No content available.'}
          </ReactMarkdown>
        </ArticleBody>
      </FadeInWhenVisible>
    </PageWrapper>
  );
}