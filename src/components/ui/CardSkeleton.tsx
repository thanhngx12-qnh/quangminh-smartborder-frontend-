// dir: ~/quangminh-smart-border/frontend/src/components/ui/CardSkeleton.tsx
'use client';

import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const SkeletonWrapper = styled.div`
  border-radius: 12px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const SkeletonImage = styled.div`
  width: 100%;
  padding-top: 56.25%; // Tỷ lệ 16:9
  background-color: ${({ theme }) => theme.colors.border};
`;

const SkeletonContent = styled.div`
  padding: 24px;
`;

const SkeletonLine = styled.div`
  height: 16px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.border};
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const AnimatedSkeleton = styled.div`
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.border};

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: ${shimmer} 2s infinite;
  }
`;

export default function CardSkeleton() {
  return (
    <SkeletonWrapper>
      <AnimatedSkeleton>
        <SkeletonImage />
      </AnimatedSkeleton>
      <SkeletonContent>
        <AnimatedSkeleton>
          <SkeletonLine style={{ width: '70%', height: '22px' }} />
        </AnimatedSkeleton>
        <AnimatedSkeleton>
          <SkeletonLine style={{ width: '100%' }} />
        </AnimatedSkeleton>
        <AnimatedSkeleton>
          <SkeletonLine style={{ width: '85%' }} />
        </AnimatedSkeleton>
      </SkeletonContent>
    </SkeletonWrapper>
  );
}