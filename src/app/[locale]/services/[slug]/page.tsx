// dir: frontend/src/app/[locale]/services/[slug]/page.tsx
'use client';

import { useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, Link } from '@/navigation';
import { useServiceBySlug, useAllServices } from '@/hooks/useServices';
import styled from 'styled-components';
import Image from 'next/image';
import parse from 'html-react-parser'; 
import { ButtonLink } from '@/components/ui/Button'; 
import OtherServicesSection from '@/components/sections/ServiceDetailPage/OtherServicesSection';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import ArticlePageSkeleton from '@/components/skeletons/ArticlePageSkeleton'; 
import ErrorState from '@/components/ui/ErrorState';
import { RiArrowLeftLine, RiArrowRightLine, RiMenuFoldLine } from 'react-icons/ri';

// --- Styled Components (Giữ nguyên toàn bộ) ---
const PageWrapper = styled.div` background-color: ${({ theme }) => theme.colors.surfaceAlt}; padding: 40px 20px 80px; min-height: 100vh; `;
const Container = styled.div` max-width: 1200px; margin: 0 auto; `;
const BackButtonWrapper = styled.div` margin-bottom: 20px; `;
const ContentGrid = styled.div` display: grid; grid-template-columns: minmax(0, 2fr) minmax(300px, 1fr); align-items: start; gap: 40px; @media (max-width: 992px) { grid-template-columns: 1fr; } `;
const MainContent = styled.main` background-color: ${({ theme }) => theme.colors.background}; border-radius: 16px; overflow: hidden; box-shadow: ${({ theme }) => theme.shadows.card}; border: 1px solid ${({ theme }) => theme.colors.border}; `;
const HeroImageWrapper = styled.div` position: relative; width: 100%; height: 400px; background-color: ${({ theme }) => theme.colors.border}; @media (max-width: 768px) { height: 250px; } `;
const HeroImage = styled(Image)` object-fit: cover; `;
const ArticleHeader = styled.div` padding: 40px; border-bottom: 1px solid ${({ theme }) => theme.colors.border}; h1 { font-family: ${({ theme }) => theme.fonts.heading}; font-size: clamp(28px, 4vw, 42px); font-weight: 800; color: ${({ theme }) => theme.colors.primary}; line-height: 1.3; } `;
const RichTextWrapper = styled.article` padding: 40px; font-size: 17px; line-height: 1.8; color: ${({ theme }) => theme.colors.text}; h2, h3, h4 { font-family: ${({ theme }) => theme.fonts.heading}; color: ${({ theme }) => theme.colors.primary}; margin: 32px 0 16px; font-weight: 700; } h2 { font-size: 24px; } h3 { font-size: 20px; } p { margin-bottom: 16px; } ul, ol { margin: 0 0 20px 24px; li { margin-bottom: 8px; &::marker { color: ${({ theme }) => theme.colors.accent}; font-weight: bold; } } } strong { color: ${({ theme }) => theme.colors.primary}; font-weight: 700; } a { color: ${({ theme }) => theme.colors.accent}; text-decoration: underline; } img { max-width: 100%; height: auto; border-radius: 8px; margin: 32px 0; box-shadow: ${({ theme }) => theme.shadows.md}; } blockquote { border-left: 3px solid ${({ theme }) => theme.colors.accent}; padding: 20px 24px; margin: 32px 0; font-style: italic; font-size: 18px; color: ${({ theme }) => theme.colors.text}; background-color: ${({ theme }) => theme.colors.surfaceAlt}; border-radius: 8px; } `;
const Sidebar = styled.aside` position: sticky; top: 100px; display: flex; flex-direction: column; gap: 30px; @media (max-width: 992px) { position: static; } `;
const SidebarCard = styled.div` background-color: ${({ theme }) => theme.colors.background}; border-radius: 16px; padding: 24px; border: 1px solid ${({ theme }) => theme.colors.border}; box-shadow: ${({ theme }) => theme.shadows.card}; h3 { font-family: ${({ theme }) => theme.fonts.heading}; font-size: 18px; font-weight: 700; color: ${({ theme }) => theme.colors.primary}; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; svg { color: ${({ theme }) => theme.colors.accent}; } } `;
const ServiceLink = styled(Link)` display: block; padding: 10px 0; font-weight: 500; color: ${({ theme }) => theme.colors.textSecondary}; border-bottom: 1px solid ${({ theme }) => theme.colors.border}; text-decoration: none; transition: all 0.2s ease; &:last-child { border-bottom: none; } &:hover { color: ${({ theme }) => theme.colors.accent}; padding-left: 8px; } `;
const CtaCard = styled(SidebarCard)` background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%); color: ${({ theme }) => theme.colors.white}; text-align: center; h3 { color: white; } p { font-size: 15px; opacity: 0.9; margin-bottom: 24px; } `;

// --- Main Component ---
interface ServiceDetailPageProps {
  params: { slug: string };
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = params;
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('ServiceDetail');
  const tMeta = useTranslations('Metadata'); 

  // Fetch dữ liệu
  const { service, isLoading, isError } = useServiceBySlug(slug, locale);
  const { result: allServicesResult } = useAllServices(locale, 1); 

  // SEO Document Title (Client side)
  useEffect(() => {
    if (service) {
      const translation = service.translations.find(tr => tr.locale === locale) || service.translations[0];
      if (translation) {
        document.title = tMeta('serviceTitle', { serviceName: translation.title });
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', translation.shortDesc);
      }
    }
    return () => { document.title = tMeta('defaultTitle'); };
  }, [service, locale, tMeta]);
  
  if (isLoading) return <ArticlePageSkeleton />;

  if (isError || !service) {
    return (
      <ErrorState 
        title="Không tìm thấy dịch vụ"
        description="Dịch vụ bạn đang tìm không tồn tại hoặc đã bị xóa."
        actionText="Quay lại danh sách dịch vụ"
        onAction={() => router.push('/services' as never)}
        fullScreen
      />
    );
  }

  const translation = service.translations.find(t => t.locale === locale) || service.translations[0];
  if (!translation) return null; 

  const otherServices = allServicesResult?.data
    ?.filter(s => s.id !== service.id)
    .slice(0, 5) ||[]; 

  const contactHref = `/contact?serviceId=${service.id}&serviceName=${encodeURIComponent(translation.title)}`;

  // THÊM: Dữ liệu cấu trúc Service Schema cho SEO
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": translation.title,
    "provider": {
      "@type": "Organization",
      "name": "Tà Lùng Logistics"
    },
    "description": translation.shortDesc,
    "areaServed":[
      {
        "@type": "Country",
        "name": "Vietnam"
      },
      {
        "@type": "Country",
        "name": "China"
      }
    ],
    "url": `https://talunglogistics.com/${locale}/services/${translation.slug}`
  };

  return (
    <PageWrapper>
      {/* Script chèn Schema cho Google Bot đọc */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <Container>
        <BackButtonWrapper>
          <ButtonLink href="/services" variant="ghost" size="small" as="a">
            <RiArrowLeftLine style={{ marginRight: 8 }} /> Quay lại danh sách dịch vụ
          </ButtonLink>
        </BackButtonWrapper>

        <ContentGrid>
          <FadeInWhenVisible>
            <MainContent>
              <HeroImageWrapper>
                <HeroImage src={service.coverImage || '/images/placeholder.jpg'} alt={translation.title} fill priority />
              </HeroImageWrapper>
              
              <ArticleHeader>
                <h1>{translation.title}</h1>
              </ArticleHeader>
              
              <RichTextWrapper>
                {parse(translation.content || '')}
              </RichTextWrapper>
            </MainContent>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.2}>
            <Sidebar>
              <CtaCard>
                <h3>{t('ctaTitle')}</h3>
                <p>Nhận tư vấn & báo giá chi tiết cho dịch vụ này.</p>
                <ButtonLink href={contactHref} as="a" variant="primary" $fullWidth>
                  {t('ctaButton')} <RiArrowRightLine style={{ marginLeft: 8 }} />
                </ButtonLink>
              </CtaCard>

              {otherServices.length > 0 && (
                <SidebarCard>
                  <h3><RiMenuFoldLine /> {t('otherServicesTitle')}</h3>
                  {otherServices.map(otherService => {
                    const otherTranslation = otherService.translations.find(t => t.locale === locale) || otherService.translations[0];
                    if (!otherTranslation) return null;
                    return (
                      <ServiceLink key={otherService.id} href={`/services/${otherTranslation.slug}`} as="a">
                        {otherTranslation.title}
                      </ServiceLink>
                    )
                  })}
                </SidebarCard>
              )}
            </Sidebar>
          </FadeInWhenVisible>
        </ContentGrid>
      </Container>
    </PageWrapper>
  );
}