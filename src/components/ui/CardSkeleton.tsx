// dir: frontend/src/components/ui/CardSkeleton.tsx
'use client';

import styled, { keyframes, css } from 'styled-components';

// Animation lấp lánh (Shimmer)
const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

// Container mô phỏng Card thật
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
`;

// Base cho các khối Skeleton (Xương)
const SkeletonPulse = styled.div`
  background-color: ${({ theme }) => theme.name === 'dark' ? 'rgba(255,255,255,0.1)' : '#f0f0f0'};
  position: relative;
  overflow: hidden;

  // Lớp phủ tạo hiệu ứng chạy ngang
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${({ theme }) => theme.name === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)'} 50%,
      transparent 100%
    );
    animation: ${shimmer} 1.5s infinite linear;
  }
`;

// Khối ảnh (tỷ lệ 16:9 hoặc tùy chỉnh)
const ImageArea = styled(SkeletonPulse)`
  width: 100%;
  padding-top: 60%; // Tỷ lệ xấp xỉ 3:2 (giống ServiceCard)
`;

// Khối nội dung
const ContentArea = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-grow: 1;
`;

// Các dòng text giả lập
const TitleLine = styled(SkeletonPulse)`
  height: 24px;
  width: 80%;
  border-radius: 4px;
  margin-bottom: 4px;
`;

const MetaLine = styled(SkeletonPulse)`
  height: 14px;
  width: 30%;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const TextLine = styled(SkeletonPulse)<{ $width?: string }>`
  height: 16px;
  width: ${({ $width }) => $width || '100%'};
  border-radius: 4px;
`;

const ActionLine = styled(SkeletonPulse)`
  height: 16px;
  width: 40%;
  border-radius: 4px;
  margin-top: auto; // Đẩy xuống đáy
  margin-top: 16px;
`;

interface CardSkeletonProps {
  hasMeta?: boolean; // Có hiển thị dòng ngày tháng/meta không? (Dùng cho News)
}

export default function CardSkeleton({ hasMeta = false }: CardSkeletonProps) {
  return (
    <Wrapper>
      <ImageArea />
      <ContentArea>
        {/* Nếu là tin tức thì hiện thêm dòng ngày tháng nhỏ */}
        {hasMeta && <MetaLine />}
        
        <TitleLine />
        
        {/* Mô phỏng đoạn văn 3 dòng */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <TextLine $width="100%" />
          <TextLine $width="90%" />
          <TextLine $width="60%" />
        </div>

        {/* Mô phỏng nút "Xem thêm" */}
        <ActionLine />
      </ContentArea>
    </Wrapper>
  );
}