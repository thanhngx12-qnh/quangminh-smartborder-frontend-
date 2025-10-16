// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/careers/page.tsx
'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { usePaginatedJobPostings } from '@/hooks/useCareers';
import { Link } from '@/navigation';
import { RiMapPinLine, RiTimeLine } from 'react-icons/ri';
import Pagination from '@/components/ui/Pagination';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';

// --- Styled Components ---
const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const PageWrapper = styled.div`
  padding: 80px 20px;
  background-color: ${({ theme }) => theme.colors.surface};
  min-height: 80vh;
`;

const PageHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px auto;
  h1 { font-size: 48px; color: ${({ theme }) => theme.colors.primary}; }
`;

const JobList = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const JobCard = styled(Link)`
  display: block;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    transform: translateY(-4px);
  }

  h2 {
    font-size: 22px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: 16px;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 24px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;

  span {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

// --- Main Component ---
export default function CareersPage() {
  const locale = useLocale();
  const t = useTranslations('CareersPage'); // Cần thêm vào file message
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const { result, isLoading, isError } = usePaginatedJobPostings(locale, currentPage, 'OPEN');
  
  if (isLoading) return <LoadingState>Loading job details...</LoadingState>;
  if (isError) return <div>Failed to load careers.</div>;

  return (
    <PageWrapper>
      <FadeInWhenVisible>
        <PageHeader><h1>{t('title')}</h1></PageHeader>
      </FadeInWhenVisible>
      
      {result && result.data.length > 0 ? (
        <JobList>
          {result.data.map((job, index) => (
            <FadeInWhenVisible key={job.id} transition={{ delay: index * 0.1 }}>
              <JobCard href={`/careers/${job.id}`} as="a">
                <h2>{job.title}</h2>
                <MetaInfo>
                  <span><RiMapPinLine /> {job.location}</span>
                  <span><RiTimeLine /> {new Date(job.createdAt).toLocaleDateString(locale)}</span>
                </MetaInfo>
              </JobCard>
            </FadeInWhenVisible>
          ))}
        </JobList>
      ) : (
        <p style={{ textAlign: 'center' }}>{t('noOpenings')}</p>
      )}

      {result && result.lastPage > 1 && (
        <Pagination currentPage={result.page} totalPages={result.lastPage} basePath="/careers" />
      )}
    </PageWrapper>
  );
}