// dir: frontend/src/app/[locale]/services/[slug]/page.tsx
'use client';

import { useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';
import { useServiceBySlug, useAllServices } from '@/hooks/useServices';
import styled from 'styled-components';
import Image from 'next/image';
import parse from 'html-react-parser'; 
import { ButtonLink } from '@/components/ui/Button'; 
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import ArticlePageSkeleton from '@/components/skeletons/ArticlePageSkeleton'; 
import ErrorState from '@/components/ui/ErrorState';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { RiArrowLeftLine, RiArrowRightLine, RiMenuFoldLine, RiCustomerService2Fill } from 'react-icons/ri';
import { sendGTMEvent } from '@next/third-parties/google';

// --- Styled Components (Giữ nguyên) ---
const PageWrapper = styled.div` background-color: ${({ theme }) => theme.colors.surfaceAlt}; padding: 20px 20px 80px; min-height: 100vh; `;
const Container = styled.div` max-width: 1200px; margin: 0 auto; `;
const TopControl = styled.div` display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; @media (max-width: 768px) { flex-direction: column; align-items: flex-start; gap: 10px; } `;
const ContentGrid = styled.div` display: grid; grid-template-columns: minmax(0, 2fr) minmax(320px, 1fr); align-items: start; gap: 40px; @media (max-width: 992px) { grid-template-columns: 1fr; } `;
const MainContent = styled.main` background-color: ${({ theme }) => theme.colors.background}; border-radius: 16px; overflow: hidden; box-shadow: ${({ theme }) => theme.shadows.card}; border: 1px solid ${({ theme }) => theme.colors.border}; `;
const HeroImageWrapper = styled.div` position: relative; width: 100%; height: 450px; background-color: ${({ theme }) => theme.colors.surfaceAlt}; @media (max-width: 768px) { height: 250px; } `;
const HeroImage = styled(Image)` object-fit: cover; `;
const ArticleHeader = styled.div` padding: 40px; border-bottom: 1px solid ${({ theme }) => theme.colors.border}; h1 { font-family: ${({ theme }) => theme.fonts.heading}; font-size: clamp(26px, 4vw, 42px); font-weight: 800; color: ${({ theme }) => theme.colors.primary}; line-height: 1.3; margin: 0; } `;
const RichTextWrapper = styled.article` padding: 40px; font-size: 17px; line-height: 1.8; color: ${({ theme }) => theme.colors.text}; h2, h3, h4 { font-family: ${({ theme }) => theme.fonts.heading}; color: ${({ theme }) => theme.colors.primary}; margin: 35px 0 15px; font-weight: 700; } h2 { font-size: 26px; border-left: 4px solid ${({ theme }) => theme.colors.accent}; padding-left: 15px; } p { margin-bottom: 18px; } ul, ol { margin: 0 0 20px 25px; li { margin-bottom: 10px; &::marker { color: ${({ theme }) => theme.colors.accent}; font-weight: bold; } } } img { max-width: 100%; height: auto; border-radius: 12px; margin: 30px 0; box-shadow: ${({ theme }) => theme.shadows.md}; } blockquote { border-left: 4px solid ${({ theme }) => theme.colors.accent}; padding: 20px 25px; margin: 30px 0; font-style: italic; background-color: ${({ theme }) => theme.colors.surfaceAlt}; border-radius: 0 12px 12px 0; } @media (max-width: 768px) { padding: 20px; font-size: 16px; } `;
const Sidebar = styled.aside` position: sticky; top: 100px; display: flex; flex-direction: column; gap: 30px; @media (max-width: 992px) { position: static; } `;
const SidebarCard = styled.div` background-color: ${({ theme }) => theme.colors.background}; border-radius: 16px; padding: 24px; border: 1px solid ${({ theme }) => theme.colors.border}; box-shadow: ${({ theme }) => theme.shadows.card}; h3 { font-family: ${({ theme }) => theme.fonts.heading}; font-size: 18px; font-weight: 700; color: ${({ theme }) => theme.colors.primary}; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; svg { color: ${({ theme }) => theme.colors.accent}; } } `;
const ServiceLink = styled.a` display: block; padding: 12px 0; font-weight: 500; color: ${({ theme }) => theme.colors.textSecondary}; border-bottom: 1px solid ${({ theme }) => theme.colors.border}; text-decoration: none; transition: all 0.2s ease; font-size: 15px; &:last-child { border-bottom: none; } &:hover { color: ${({ theme }) => theme.colors.accent}; padding-left: 8px; } `;
const CtaCard = styled(SidebarCard)` background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%); color: ${({ theme }) => theme.colors.white}; text-align: center; h3 { color: white; justify-content: center; } p { font-size: 15px; opacity: 0.9; margin-bottom: 24px; } `;

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const locale = useLocale();
  const router = useRouter();
  
  const t = useTranslations('ServiceDetail');
  const tNav = useTranslations('Navigation');
  const tMeta = useTranslations('Metadata'); 
  const tErrors = useTranslations('Errors');
  const tNotFound = useTranslations('NotFound');
  const tGeneral = useTranslations('General'); // Thêm General

  const { service, isLoading, isError } = useServiceBySlug(slug, locale);
  const { result: allServicesResult } = useAllServices(locale, 1); 

  useEffect(() => {
    if (service) {
      const translation = service.translations.find(tr => tr.locale === locale) || service.translations[0];
      if (translation) {
        document.title = tMeta('serviceTitle', { serviceName: translation.title });
      }
    }
  }, [service, locale, tMeta]);
  
  if (isLoading) return <ArticlePageSkeleton />;

  if (isError || !service) {
    return <ErrorState title={tNotFound('title')} description={tNotFound('description')} actionText={tGeneral('back')} onAction={() => router.push('/services' as never)} fullScreen />;
  }

  const translation = service.translations.find(t => t.locale === locale) || service.translations[0];
  if (!translation) return null; 

  const otherServices = allServicesResult?.data?.filter(s => s.id !== service.id).slice(0, 6) || [];
  const contactHref = `/contact?serviceId=${service.id}&serviceName=${encodeURIComponent(translation.title)}`;

  return (
    <PageWrapper>
      <Container>
        <TopControl>
          <ButtonLink href="/services" variant="ghost" size="small" as="a">
            <RiArrowLeftLine style={{ marginRight: 8 }} /> {tNav('services')}
          </ButtonLink>
          <Breadcrumbs items={[{ label: tNav('services'), href: '/services' }, { label: translation.title }]} />
        </TopControl>

        <ContentGrid>
          <FadeInWhenVisible>
            <MainContent>
              <HeroImageWrapper>
                <HeroImage src={service.coverImage || '/images/placeholder.jpg'} alt={translation.title} fill priority style={{ objectFit: 'cover' }} />
              </HeroImageWrapper>
              <ArticleHeader><h1>{translation.title}</h1></ArticleHeader>
              <RichTextWrapper>{parse(translation.content || '')}</RichTextWrapper>
            </MainContent>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.2}>
            <Sidebar>
              <CtaCard>
                <h3><RiCustomerService2Fill /> {t('ctaTitle')}</h3>
                {/* SỬA LỖI: Sử dụng t('ctaDesc') từ JSON */}
                <p>{t('ctaDesc')}</p>
                <ButtonLink 
                  href={contactHref} as="a" variant="primary" $fullWidth
                  onClick={() => sendGTMEvent({ event: 'generate_lead', form_name: 'service_sidebar_cta', service: translation.title })}
                >
                  {t('ctaButton')} <RiArrowRightLine style={{ marginLeft: 8 }} />
                </ButtonLink>
              </CtaCard>

              {otherServices.length > 0 && (
                <SidebarCard>
                  <h3><RiMenuFoldLine /> {t('otherServicesTitle')}</h3>
                  {otherServices.map(otherService => {
                    const ot = otherService.translations.find(t => t.locale === locale) || otherService.translations[0];
                    if (!ot) return null;
                    return <ServiceLink key={otherService.id} href={`/services/${ot.slug}`}>{ot.title}</ServiceLink>
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