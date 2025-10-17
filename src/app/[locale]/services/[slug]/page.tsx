// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/services/[slug]/page.tsx
'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useServiceBySlug, useAllServices } from '@/hooks/useServices';
import styled from 'styled-components';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown'; // <-- Import
import { ButtonLink } from '@/components/ui/Button'; 
import OtherServicesSection from '@/components/sections/ServiceDetailPage/OtherServicesSection';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import CardSkeleton from '@/components/ui/CardSkeleton';
import { useEffect } from 'react';

// --- Styled Components ---
const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
`;

const HeroWrapper = styled.section`
  position: relative;
  height: 400px;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.6));
    z-index: 1;
  }
`;

const HeroImage = styled(Image)`
  object-fit: cover;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 20px;

  h1 {
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 16px;
  }
`;

const ContentWrapper = styled.main`
  max-width: 800px;
  margin: -80px auto 0 auto;
  position: relative;
  z-index: 3;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

// Component để style nội dung Markdown
const MarkdownContent = styled.div`
  font-size: 18px;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textSecondary};

  h2, h3 {
    color: ${({ theme }) => theme.colors.text};
    margin-top: 40px;
    margin-bottom: 16px;
    line-height: 1.3;
  }
  
  p {
    margin-bottom: 16px;
  }

  ul, ol {
    margin-left: 24px;
    margin-bottom: 16px;
    li {
      margin-bottom: 8px;
    }
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: underline;
  }
`;

const CtaSection = styled.section`
  text-align: center;
  padding: 60px 20px;
  background-color: ${({ theme }) => theme.colors.background};
  
  h2 {
    font-size: 28px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 24px;
  }
`;

const ErrorState = styled.div` /* ... */ `;

// --- Main Component ---
interface ServiceDetailPageProps {
  params: { slug: string };
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = params;
  const locale = useLocale();
  const t = useTranslations('ServiceDetail');

  // Fetch dữ liệu cho dịch vụ hiện tại
  const { service, isLoading: isLoadingDetail, isError: isErrorDetail } = useServiceBySlug(slug, locale);

  useEffect(() => {
    if (service) {
      const translation = service.translations[0];
      document.title = `${translation.title} - Quang Minh Smart Border`;
      
      // Có thể cập nhật meta description ở đây nhưng không hiệu quả bằng server
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', translation.shortDesc);
      }
    }
  }, [service]);
  
  // Fetch tất cả dịch vụ để hiển thị "Các dịch vụ khác"
  const { result, isLoading: isLoadingList } = useAllServices(locale, 1); 

  if (isLoadingDetail || isLoadingList) return(
        <PageWrapper>
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </PageWrapper>);
  if (isErrorDetail) return <ErrorState>Could not find the requested service.</ErrorState>;
  if (!service) return null;

  // Lọc ra các dịch vụ khác (không bao gồm dịch vụ hiện tại), chỉ lấy tối đa 3
  const otherServices = result?.data
    ?.filter(s => s.id !== service.id)
    .slice(0, 3) || [];

  const translation = service.translations.find(t => t.locale === locale) || service.translations[0];

  const contactHref = `/contact?serviceId=${service.id}&serviceName=${encodeURIComponent(translation.title)}`;

  return (
    <PageWrapper>
      <HeroWrapper>
        <HeroImage src={service.coverImage || '/placeholder.jpg'} alt={translation.title} fill priority />
        <HeroContent>
          <h1>{translation.title}</h1>
        </HeroContent>
      </HeroWrapper>

      <FadeInWhenVisible>
        <ContentWrapper>
          <MarkdownContent>
            <ReactMarkdown>
              {translation.content || 'No content available.'}
            </ReactMarkdown>
          </MarkdownContent>
        </ContentWrapper>
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        <CtaSection>
          <h2>{t('ctaTitle')}</h2>
          
          <ButtonLink 
            href={contactHref} // Truyền chuỗi URL vào
            as="a" 
          >
            {t('ctaButton')}
          </ButtonLink>

        </CtaSection>
      </FadeInWhenVisible>

      {otherServices.length > 0 && (
        <FadeInWhenVisible>
          <OtherServicesSection services={otherServices} />
        </FadeInWhenVisible>
      )}
    </PageWrapper>
  );
}