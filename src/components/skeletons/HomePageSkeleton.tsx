// dir: ~/quangminh-smart-border/frontend/src/components/skeletons/HomePageSkeleton.tsx
'use client';

import styled from 'styled-components';
import CardSkeleton from '@/components/ui/CardSkeleton';

const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionSkeleton = styled.div`
  padding: 80px 20px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const KpiSkeletonWrapper = styled.div`
  padding: 80px 20px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const KpiSkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
`;

const KpiCardSkeleton = styled.div`
  height: 110px; // Chiều cao tương đương KpiCard
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export default function HomePageSkeleton() {
  return (
    <>
      {/* Skeleton cho KpiSection */}
      <KpiSkeletonWrapper>
        <KpiSkeletonGrid>
          <KpiCardSkeleton />
          <KpiCardSkeleton />
          <KpiCardSkeleton />
        </KpiSkeletonGrid>
      </KpiSkeletonWrapper>

      {/* Skeleton cho FeaturedServicesSection */}
      <SectionSkeleton>
        <SkeletonGrid>
          {Array.from({ length: 3 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </SkeletonGrid>
      </SectionSkeleton>

      {/* Skeleton cho LatestNewsSection */}
      <SectionSkeleton>
        <SkeletonGrid>
          {Array.from({ length: 3 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </SkeletonGrid>
      </SectionSkeleton>
    </>
  );
}