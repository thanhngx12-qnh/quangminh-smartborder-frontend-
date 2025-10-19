// dir: ~/quangminh-smart-border/frontend/src/components/sections/HomePage/LatestNewsSection.tsx
'use client';

import { useTranslations, useLocale } from 'next-intl';
import styled from 'styled-components';
import { Link } from '@/navigation';
import Image from 'next/image';
import { News } from '@/types';
import Button from '@/components/ui/Button';

// --- Styled Components (Không thay đổi) ---
const SectionWrapper = styled.section`
  padding: 80px 20px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin: 0 auto 60px auto;

  h2 {
    font-size: 36px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const NewsCard = styled(Link)`
  display: block;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  background-color: ${({ theme }) => theme.colors.background};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  img { object-fit: cover; }
`;

const CardContent = styled.div`
  padding: 24px;

  time {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textMuted};
    margin-bottom: 8px;
    display: block;
  }

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  p {
    font-size: 16px;
    color: #666;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const ViewAllButtonWrapper = styled.div`
  text-align: center;
  margin-top: 60px;
`;


// --- Main Component ---
interface LatestNewsSectionProps {
  news: News[];
}

const formatDate = (dateString: string, locale: string) => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString));
};

export default function LatestNewsSection({ news }: LatestNewsSectionProps) {
  const t = useTranslations('LatestNews');
  const locale = useLocale();

  return (
    <SectionWrapper>
      <SectionHeader>
        <h2>{t('title')}</h2>
      </SectionHeader>
      <NewsGrid>
        {news.map((article) => {
          const translation = article.translations.find(t => t.locale === locale) || article.translations[0];
          return (
            // SỬA LỖI Ở ĐÂY: Thêm as="a"
            <NewsCard key={article.id} href={`/news/${translation.slug}`} as="a">
              <ImageWrapper>
                <Image src={article.coverImage || '/placeholder.jpg'} alt={translation.title} fill />
              </ImageWrapper>
              <CardContent>
                {article.publishedAt && <time>{formatDate(article.publishedAt, locale)}</time>}
                <h3>{translation.title}</h3>
                <p>{translation.excerpt}</p>
              </CardContent>
            </NewsCard>
          );
        })}
      </NewsGrid>
      <ViewAllButtonWrapper>
        <Button as="a" href="/news" variant="secondary">
          {t('viewAll')}
        </Button>
    </ViewAllButtonWrapper>
    </SectionWrapper>
  );
}