// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/tracking/[awb]/page.tsx
'use client';

import { useTrackingInfo } from '@/hooks/useTracking';
import styled from 'styled-components';
import { RiTruckLine, RiCheckboxCircleLine, RiMapPinLine, RiTimeLine } from 'react-icons/ri';
import CardSkeleton from '@/components/ui/CardSkeleton';

// --- Styled Components ---
const PageWrapper = styled.div`
  padding: 80px 20px;
  background-color: ${({ theme }) => theme.colors.surface};
  min-height: 80vh;
`;

const TrackingCard = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  h1 {
    font-size: 24px;
    color: ${({ theme }) => theme.colors.primary};
  }
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Timeline = styled.ul`
  list-style: none;
  padding: 24px;
`;

const TimelineItem = styled.li`
  position: relative;
  padding: 0 20px 40px 40px;
  border-left: 2px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-left: 2px solid transparent;
    padding-bottom: 0;
  }
`;

const TimelineIcon = styled.div`
  position: absolute;
  left: -16px;
  top: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.background};
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
  }
  span {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textSecondary};
    display: block;
    margin-top: 4px;
  }
`;

// --- Main Component ---
interface TrackingDetailPageProps {
  params: { awb: string };
}

export default function TrackingDetailPage({ params }: TrackingDetailPageProps) {
  const { awb } = params;
  const { consignment, isLoading, isError } = useTrackingInfo(awb);

  if (isLoading) return (<PageWrapper>
            {Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </PageWrapper>);
  if (isError) return <div>Could not find shipment with AWB: {awb}</div>;
  if (!consignment) return null;

  return (
    <PageWrapper>
      <TrackingCard>
        <CardHeader>
          <h1>Tracking for AWB: {consignment.awb}</h1>
          <p>{consignment.origin} → {consignment.destination}</p>
        </CardHeader>
        <Timeline>
          {consignment.events.map((event, index) => (
            <TimelineItem key={event.id}>
              <TimelineIcon>
                {index === 0 ? <RiCheckboxCircleLine /> : <RiMapPinLine />}
              </TimelineIcon>
              <TimelineContent>
                <p>{event.description}</p>
                <span>
                  {new Date(event.eventTime).toLocaleString()}
                  {event.location && ` - ${event.location}`}
                </span>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </TrackingCard>
    </PageWrapper>
  );
}