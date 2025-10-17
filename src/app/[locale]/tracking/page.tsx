// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/tracking/page.tsx
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation'; // Dùng router của Next.js cho client-side updates
import { usePathname } from '@/navigation'; // Dùng pathname của next-intl
import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { useTrackingInfo } from '@/hooks/useTracking';
import TrackingSearchForm from '@/components/shared/TrackingSearchForm';
import ErrorState from '@/components/ui/ErrorState';
import { RiCheckboxCircleFill, RiMapPinFill, RiTruckFill, RiFileList3Line } from 'react-icons/ri';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';

// --- Styled Components ---
const PageWrapper = styled.div`
  padding: 80px 20px;
  background-color: ${({ theme }) => theme.colors.surface};
  min-height: 80vh;
`;

const PageHeader = styled.header`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 40px auto;
  h1 { 
    font-size: 42px; 
    font-weight: 700; 
    color: ${({ theme }) => theme.colors.text}; 
  }
`;

const SearchContainer = styled.div`
  max-width: 800px;
  margin: 0 auto 60px auto;
  display: flex;
  justify-content: center;
`;


const ResultsWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ResultsHeader = styled.h2`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-bottom: 20px;
  font-weight: 400;
  span {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const TrackingCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  
  h2 {
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 8px;
  }
  
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 14px;
  }

  .status {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.success};
  }
`;

const Timeline = styled.ul`
  list-style: none;
  padding: 32px 24px;
`;

const TimelineItem = styled.li`
  position: relative;
  padding: 0 20px 40px 40px;
  border-left: 2px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-left-color: transparent;
    padding-bottom: 0;
  }
`;

const TimelineIcon = styled.div`
  position: absolute;
  left: -17px;
  top: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

const TimelineContent = styled.div`
  p {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 4px;
  }
  
  span {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textSecondary};
    display: block;
  }
`;

const LoadingState = styled.div` /* ... */ `;

// --- Component Logic ---
function TrackingPageComponent() {
    const router = useRouter();
    const pathname = usePathname(); // Dùng để giữ nguyên locale
    const searchParams = useSearchParams();
    const awbsQuery = searchParams.get('awbs');
    const t = useTranslations('TrackingPage');
  
    const { consignments, isLoading } = useTrackingInfo(awbsQuery);
  
    const handleSearch = (newAwbs: string) => {
      const encodedAwbs = encodeURIComponent(newAwbs);
      // Cập nhật URL mà không reload lại toàn bộ trang
      router.push(`${pathname}?awbs=${encodedAwbs}`);
    };

    return (
        <PageWrapper>
            <PageHeader><h1>{t('title')}</h1></PageHeader>

            <FadeInWhenVisible>
              <SearchContainer>
                  <TrackingSearchForm 
                      onSearch={handleSearch} 
                      defaultValue={awbsQuery || ''} 
                      isLoading={isLoading} 
                  />
              </SearchContainer>
            </FadeInWhenVisible>
            
            {isLoading && <LoadingState>{t('loading')}</LoadingState>}
            
            {awbsQuery && !isLoading && (
                <ResultsWrapper>
                    <ResultsHeader>{t('resultsFor')} <span>{awbsQuery}</span></ResultsHeader>
                    {consignments && consignments.length > 0 ? (
                        consignments.map(consignment => (
                          <FadeInWhenVisible key={consignment.id}>
                            <TrackingCard>
                                <CardHeader>
                                    <h2>AWB: {consignment.awb} - <span className="status">{consignment.status}</span></h2>
                                    <p>{consignment.origin} → {consignment.destination}</p>
                                </CardHeader>
                                <Timeline>
                                  {consignment.events.map((event) => (
                                    <TimelineItem key={event.id}>
                                      <TimelineIcon><RiTruckFill /></TimelineIcon>
                                      <TimelineContent>
                                        <p>{event.description}</p>
                                        <span>
                                          {new Date(event.eventTime).toLocaleString()}
                                          {event.location && ` - ${event.location}`}
                                        </span>
                                      </TimelineContent>
                                    </TimelineItem>
                                  ))}
                                  {consignment.events.length === 0 && <p style={{padding: '0 24px'}}>{t('noEvents')}</p>}
                                </Timeline>
                            </TrackingCard>
                          </FadeInWhenVisible>
                        ))
                    ) : (
                        <ErrorState 
                            title={t('notFoundTitle')} 
                            description={t('notFoundDescription', { awbs: awbsQuery })} 
                        />
                    )}
                </ResultsWrapper>
            )}
        </PageWrapper>
    );
}

// Bọc component logic trong Suspense
export default function TrackingPage() {
    const t = useTranslations('TrackingPage');
    return (
        <Suspense fallback={<LoadingState>{t('loadingPage')}</LoadingState>}>
            <TrackingPageComponent />
        </Suspense>
    );
}