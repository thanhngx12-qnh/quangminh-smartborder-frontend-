// dir: frontend/src/components/skeletons/ArticlePageSkeleton.tsx
'use client';

import styled, { keyframes } from 'styled-components';

// Hiệu ứng Shimmer (Lấp lánh)
const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding-bottom: 80px;
`;

// Mixin tạo hiệu ứng lấp lánh
const ShimmerBlock = styled.div`
  background-color: ${({ theme }) => theme.name === 'dark' ? 'rgba(255,255,255,0.1)' : '#e0e0e0'};
  position: relative;
  overflow: hidden;
  border-radius: 4px;

  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${({ theme }) => theme.name === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)'} 50%,
      transparent 100%
    );
    animation: ${shimmer} 1.5s infinite linear;
  }
`;

const SkeletonBanner = styled(ShimmerBlock)`
  width: 100%;
  height: 450px; // Chiều cao giống banner thật
  border-radius: 0; // Banner thường full width hoặc bo góc ít
  
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: -60px auto 0; // Đẩy lên đè lên banner một chút giống thiết kế bài viết
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const ContentCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 40px;
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const TitleLine = styled(ShimmerBlock)`
  height: 40px;
  width: 90%;
  margin-bottom: 20px;
`;

const MetaLine = styled(ShimmerBlock)`
  height: 16px;
  width: 30%;
  margin-bottom: 40px;
`;

const TextLine = styled(ShimmerBlock)`
  height: 18px;
  margin-bottom: 12px;
`;

export default function ArticlePageSkeleton() {
  return (
    <PageWrapper>
      <SkeletonBanner />
      <Container>
        <ContentCard>
          {/* Tiêu đề */}
          <TitleLine />
          
          {/* Meta (Ngày tháng/Tác giả) */}
          <MetaLine />
          
          {/* Nội dung bài viết giả lập */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <TextLine style={{ width: '100%' }} />
            <TextLine style={{ width: '95%' }} />
            <TextLine style={{ width: '98%' }} />
            <TextLine style={{ width: '60%' }} /> {/* Kết thúc đoạn 1 */}
            
            <br />
            
            <TextLine style={{ width: '100%' }} />
            <TextLine style={{ width: '90%' }} />
            <TextLine style={{ width: '85%' }} />
          </div>
        </ContentCard>
      </Container>
    </PageWrapper>
  );
}