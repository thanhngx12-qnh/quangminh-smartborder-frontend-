// dir: frontend/src/app/[locale]/careers/page.tsx
'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { usePaginatedJobPostings } from '@/hooks/useCareers';
import { Link } from '@/navigation';
import { RiMapPinLine, RiTimeLine, RiBriefcaseLine, RiArrowRightLine } from 'react-icons/ri';
import Pagination from '@/components/ui/Pagination';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import Button from '@/components/ui/Button';
import ErrorState from '@/components/ui/ErrorState';
import CardSkeleton from '@/components/ui/CardSkeleton';

// --- Styled Components ---

const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
`;

// 1. Hero Section
const HeroSection = styled.section`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 100px 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  position: relative;
  overflow: hidden;

  // Họa tiết nền
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background-image: radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, transparent 60%);
  }

  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 800;
    margin-bottom: 16px;
    position: relative;
    z-index: 1;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.white};
  }

  p {
    font-size: 18px;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 20px;
`;

const JobList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

// 2. Job Card Design
const JobCard = styled(Link)`
  display: grid;
  grid-template-columns: 1fr auto; // Content - Button
  gap: 24px;
  align-items: center;
  padding: 32px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s ease-out;
  border-left: 4px solid transparent; // Chuẩn bị cho hover effect

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-left-color: ${({ theme }) => theme.colors.accent}; // Highlight đỏ bên trái
    border-color: ${({ theme }) => theme.colors.primaryLight};
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // Chuyển thành 1 cột trên mobile
    padding: 24px;
  }
`;

const JobContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const JobTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  transition: color 0.2s;

  ${JobCard}:hover & {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const MetaTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 4px;
`;

const Tag = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  padding: 6px 12px;
  border-radius: 6px;
  
  svg {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const ActionArea = styled.div`
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

// Helper hiển thị skeleton loading
const LoadingSkeleton = () => (
  <Container>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Tái sử dụng CardSkeleton nhưng bọc trong div để mô phỏng list dọc */}
      <div style={{ height: 160 }}><CardSkeleton /></div>
      <div style={{ height: 160 }}><CardSkeleton /></div>
      <div style={{ height: 160 }}><CardSkeleton /></div>
    </div>
  </Container>
);


// --- Main Component ---
export default function CareersPage() {
  const locale = useLocale();
  const t = useTranslations('CareersPage');
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // Hook gốc (không có refetch)
  const { result, isLoading, isError } = usePaginatedJobPostings(locale, currentPage, 'OPEN');
  
  // SỬA LỖI Ở ĐÂY: Hàm reload trang
  const handleRetry = () => {
    window.location.reload();
  };

  if (isLoading) {
    return (
      <PageWrapper>
        <HeroSection>
          <FadeInWhenVisible><h1>{t('title')}</h1><p>{t('subtitle')}</p></FadeInWhenVisible>
        </HeroSection>
        <LoadingSkeleton />
      </PageWrapper>
    );
  }
  
  if (isError) {
    return (
      <PageWrapper>
        <HeroSection>
          <FadeInWhenVisible><h1>{t('title')}</h1><p>{t('subtitle')}</p></FadeInWhenVisible>
        </HeroSection>
        <Container>
          <ErrorState 
            title={t('errorTitle')}
            description={t('errorDesc')}
            actionText={t('retry')}
            onAction={handleRetry} // Gọi hàm reload
          />
        </Container>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <HeroSection>
        <FadeInWhenVisible>
          <h1>{t('title')}</h1>
          <p>{t('subtitle')}</p>
        </FadeInWhenVisible>
      </HeroSection>
      
      <Container>
        {result && result.data.length > 0 ? (
          <>
            <JobList>
              {result.data.map((job, index) => (
                <FadeInWhenVisible key={job.id} delay={index * 0.1}>
                  <JobCard href={`/careers/${job.id}`} as="a">
                    <JobContent>
                      <JobTitle>{job.title}</JobTitle>
                      <MetaTags>
                        <Tag><RiMapPinLine /> {job.location}</Tag>
                        <Tag><RiTimeLine /> {new Date(job.createdAt).toLocaleDateString(locale)}</Tag>
                      </MetaTags>
                    </JobContent>
                    
                    <ActionArea>
                      <Button variant="outline" size="small" as="span">
                        {t('viewDetails')} <RiArrowRightLine style={{ marginLeft: 6 }} />
                      </Button>
                    </ActionArea>
                  </JobCard>
                </FadeInWhenVisible>
              ))}
            </JobList>

            {result.lastPage > 1 && (
              <div style={{ marginTop: 60 }}>
                <Pagination currentPage={result.page} totalPages={result.lastPage} basePath="/careers" />
              </div>
            )}
          </>
        ) : (
          <ErrorState 
            title={t('noOpenings')} 
            description={t('noOpeningsDesc')}
          />
        )}
      </Container>
    </PageWrapper>
  );
}