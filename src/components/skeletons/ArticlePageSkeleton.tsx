// dir: ~/quangminh-smart-border/frontend/src/components/skeletons/ArticlePageSkeleton.tsx
'use client';
import styled from 'styled-components';

const PageWrapper = styled.div`/* Tương tự PageWrapper gốc */`;
const SkeletonHeader = styled.div`
  width: 100%;
  height: 450px;
  background-color: ${({ theme }) => theme.colors.surface};
`;
const SkeletonContent = styled.div`
  max-width: 800px;
  margin: 40px auto 0 auto;
  padding: 0 20px;
`;
const SkeletonLine = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 4px;
  margin-bottom: 16px;
`;

export default function ArticlePageSkeleton() {
  return (
    <PageWrapper>
      <SkeletonHeader />
      <SkeletonContent>
        <SkeletonLine style={{ height: '36px', width: '80%', marginBottom: '24px' }} />
        <SkeletonLine style={{ height: '16px', width: '40%', marginBottom: '40px' }} />
        <SkeletonLine style={{ height: '20px', width: '100%' }} />
        <SkeletonLine style={{ height: '20px', width: '95%' }} />
        <SkeletonLine style={{ height: '20px', width: '100%' }} />
        <SkeletonLine style={{ height: '20px', width: '70%' }} />
      </SkeletonContent>
    </PageWrapper>
  );
}