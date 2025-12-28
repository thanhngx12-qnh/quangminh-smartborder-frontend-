// dir: frontend/src/components/sections/HomePage/LatestNewsSection.tsx
'use client';

import { useTranslations, useLocale } from 'next-intl';
import styled from 'styled-components';
import { Link } from '@/navigation';
import Image from 'next/image';
import { ButtonLink } from '@/components/ui/Button'; // Sử dụng ButtonLink
import { useFeaturedNews } from '@/hooks/useNews';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import { RiCalendarLine, RiArrowRightLine } from 'react-icons/ri';

// --- Styled Components ---

const SectionWrapper = styled.section`
  padding: 100px 20px;
  background-color: ${({ theme }) => theme.colors.surfaceAlt}; // Nền xám nhẹ để tách biệt
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px auto;

  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 36px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 16px;
    position: relative;
    display: inline-block;
    
    // Gạch chân đỏ trang trí
    &::after {
      content: '';
      display: block;
      width: 60px;
      height: 4px;
      background-color: ${({ theme }) => theme.colors.accent};
      margin: 12px auto 0;
      border-radius: 2px;
    }
  }

  p {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 3 cột chuẩn
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 60%; // Tỷ lệ ảnh
  overflow: hidden;
  background-color: #eee;

  img {
    object-fit: cover;
    transition: transform 0.5s ease;
  }
`;

const CardContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 12px;
  
  svg {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
  line-height: 1.4;
  transition: color 0.2s ease;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Excerpt = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 20px;
  
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReadMore = styled.div`
  margin-top: auto;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 6px;
  transition: gap 0.2s ease;

  svg { transition: transform 0.2s ease; }
`;

const NewsCard = styled(Link)`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: all 0.3s ease;
  height: 100%;
  text-decoration: none;
  border-bottom: 3px solid transparent;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.hover};
    border-bottom-color: ${({ theme }) => theme.colors.accent};

    ${ImageWrapper} img {
      transform: scale(1.1);
    }

    ${Title} {
      color: ${({ theme }) => theme.colors.accent};
    }

    ${ReadMore} {
      gap: 10px;
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

const ViewAllButtonWrapper = styled.div`
  text-align: center;
  margin-top: 60px;
`;

// Helper format ngày
const formatDate = (dateString: string, locale: string) => {
  try {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateString));
  } catch (e) {
    return '';
  }
};

// --- Main Component ---
export default function LatestNewsSection() { 
  const t = useTranslations('LatestNews');
  const tGeneral = useTranslations('General');
  const locale = useLocale();
  
  const { news, isLoading } = useFeaturedNews(locale);

  // Loading Skeleton đơn giản (Optional)
  if (isLoading) return null;

  // Nếu không có tin nào thì ẩn section
  if (!news || news.length === 0) return null;

  // Lấy tối đa 3 tin để hiển thị đẹp trên Grid
  const displayNews = news.slice(0, 3);

  return (
    <SectionWrapper>
      <FadeInWhenVisible>
        <SectionHeader>
          <h2>{t('title')}</h2>
          {/* Subtitle có thể thêm vào JSON sau nếu cần */}
        </SectionHeader>
      </FadeInWhenVisible>

      <NewsGrid>
        {displayNews.map((article, index) => {
          const translation = article.translations?.find(t => t.locale === locale) 
                              || article.translations?.[0];

          if (!translation) return null;

          return (
            // SỬA LỖI: dùng prop delay thay vì transition
            <FadeInWhenVisible key={article.id} delay={index * 0.1}>
              <NewsCard href={`/news/${translation.slug}`} as="a">
                <ImageWrapper>
                  <Image 
                    src={article.coverImage || '/images/placeholder.jpg'} 
                    alt={translation.title || 'News'} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                  />
                </ImageWrapper>
                <CardContent>
                  <MetaInfo>
                    <RiCalendarLine />
                    <time>{article.publishedAt ? formatDate(article.publishedAt, locale) : ''}</time>
                  </MetaInfo>
                  <Title>{translation.title}</Title>
                  <Excerpt>{translation.excerpt}</Excerpt>
                  <ReadMore>
                    {tGeneral('viewAll') || 'Xem chi tiết'} <RiArrowRightLine />
                  </ReadMore>
                </CardContent>
              </NewsCard>
            </FadeInWhenVisible>
          );
        })}
      </NewsGrid>

      <FadeInWhenVisible delay={0.3}>
        <ViewAllButtonWrapper>
          <ButtonLink href="/news" variant="secondary" as="a">
            {t('viewAll')} <RiArrowRightLine style={{ marginLeft: 8 }}/>
          </ButtonLink>
        </ViewAllButtonWrapper>
      </FadeInWhenVisible>
    </SectionWrapper>
  );
}