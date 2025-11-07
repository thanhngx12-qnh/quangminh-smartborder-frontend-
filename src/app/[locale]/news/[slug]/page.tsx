// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/news/[slug]/page.tsx
'use client';

import { useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/navigation';
import { useNewsBySlug } from '@/hooks/useNews';
import styled from 'styled-components';
import Image from 'next/image';
import parse from 'html-react-parser';
import { RiCalendar2Line, RiUserLine } from 'react-icons/ri';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import ArticlePageSkeleton from '@/components/skeletons/ArticlePageSkeleton'; // <-- Import skeleton mới

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
  const router = useRouter();
  const { news, isLoading, isError } = useNewsBySlug(slug, locale);
  
  const t = useTranslations('Metadata');
  const t_errors = useTranslations('Errors');
  const t_news_page = useTranslations('LatestNews'); // Dùng key 'viewAll'
  
  // Xử lý SEO/metadata phía client
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
  
  // RENDER LOADING STATE
  if (isLoading) {
    return <ArticlePageSkeleton />;
  } 

  // RENDER ERROR/NOT FOUND STATE
  if (isError || !news) {
    return <ErrorState 
      title="Không tìm thấy bài viết"
    />
  }

  // SỬA LỖI "DATA MISSING"
  const translation = news.translations.find(t => t.locale === locale);

  // NẾU KHÔNG CÓ BẢN DỊCH, HIỂN THỊ TRANG LỖI
  if (!translation) {
    return <ErrorState 
      title="Nội dung chưa có sẵn"
    />
  }

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
                <span><RiCalendar2Line /><time dateTime={news.publishedAt}>{formatDate(news.publishedAt, locale)}</time></span>
              )}
              <span><RiUserLine />Admin</span>
            </MetaInfo>
          </FadeInWhenVisible>
        </HeaderContent>
      </ArticleHeader>

      <FadeInWhenVisible>
        <ArticleBody>
          {parse(translation.content || '<p>Nội dung đang được cập nhật.</p>')}
        </ArticleBody>
      </FadeInWhenVisible>
    </PageWrapper>
  );
}