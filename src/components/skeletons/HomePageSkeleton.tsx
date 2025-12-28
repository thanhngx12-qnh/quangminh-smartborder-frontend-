// dir: frontend/src/components/skeletons/HomePageSkeleton.tsx
'use client';

import styled, { keyframes } from 'styled-components';
import CardSkeleton from '@/components/ui/CardSkeleton'; // Tái sử dụng CardSkeleton

// Animation
const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const SectionSkeleton = styled.div`
  padding: 80px 20px;
  background-color: ${({ theme }) => theme.colors.background};
  
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.surfaceAlt}; // Xen kẽ màu nền
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const HeaderSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
  gap: 16px;
`;

const TitleBar = styled.div`
  width: 300px;
  height: 40px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.border};
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    animation: ${shimmer} 1.5s infinite linear;
  }
`;

const GridSkeleton = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

// Skeleton riêng cho KPI (Mô phỏng: Icon + Số + Text)
const KpiWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.surface}; // Giả lập màu nền KPI (hoặc để xám)
  padding: 80px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const KpiItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Circle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.border};
`;

const Line = styled.div`
  height: 20px;
  width: 100px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.border};
`;

export default function HomePageSkeleton() {
  return (
    <>
      {/* 1. KPI Section Skeleton */}
      <KpiWrapper>
        <Container>
          <GridSkeleton>
            {[1, 2, 3].map((i) => (
              <KpiItem key={i}>
                <Circle />
                <Line style={{ width: 120, height: 40 }} /> {/* Số liệu lớn */}
                <Line /> {/* Tiêu đề */}
              </KpiItem>
            ))}
          </GridSkeleton>
        </Container>
      </KpiWrapper>

      {/* 2. Featured Services Skeleton */}
      <SectionSkeleton>
        <Container>
          <HeaderSkeleton>
            <TitleBar />
          </HeaderSkeleton>
          <GridSkeleton>
            {/* 3 cards dịch vụ */}
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </GridSkeleton>
        </Container>
      </SectionSkeleton>

      {/* 3. News Skeleton */}
      <SectionSkeleton>
        <Container>
          <HeaderSkeleton>
            <TitleBar style={{ width: 250 }} />
          </HeaderSkeleton>
          <GridSkeleton>
            {/* 3 cards tin tức (có meta date) */}
            <CardSkeleton hasMeta={true} />
            <CardSkeleton hasMeta={true} />
            <CardSkeleton hasMeta={true} />
          </GridSkeleton>
        </Container>
      </SectionSkeleton>
    </>
  );
}