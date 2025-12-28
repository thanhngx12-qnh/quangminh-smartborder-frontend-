// dir: frontend/src/components/ui/ErrorState.tsx
'use client';

import styled, { keyframes } from 'styled-components';
import { RiErrorWarningFill, RiRefreshLine } from 'react-icons/ri';
import Button from './Button';

// Animation nhịp đập nhẹ cho icon
const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(220, 38, 38, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 20px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 2px dashed ${({ theme }) => theme.colors.border}; // Viền nét đứt tạo style UI
  border-radius: 16px;
  min-height: 400px; // Chiều cao vừa phải, không chiếm quá nhiều nếu không cần thiết
  max-width: 600px;
  margin: 40px auto; // Căn giữa màn hình
`;

const IconBox = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(220, 38, 38, 0.1); // Màu đỏ nhạt
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.error};
  font-size: 40px;
  
  // Áp dụng animation
  animation: ${pulse} 2s infinite;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 450px;
  margin-bottom: 32px;
  line-height: 1.6;
`;

interface ErrorStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  fullScreen?: boolean; // Tùy chọn hiển thị full màn hình hay box nhỏ
}

export default function ErrorState({ 
  title, 
  description, 
  actionText, 
  onAction,
  fullScreen = false
}: ErrorStateProps) {
  
  // Nếu fullScreen = true, ghi đè style để căn giữa toàn trang
  const wrapperStyle = fullScreen ? {
    minHeight: '80vh',
    border: 'none',
    backgroundColor: 'transparent'
  } : {};

  return (
    <ErrorWrapper style={wrapperStyle}>
      <IconBox>
        <RiErrorWarningFill />
      </IconBox>
      <Title>{title}</Title>
      <Description>{description}</Description>
      
      {actionText && onAction && (
        <Button onClick={onAction} variant="primary" size="medium">
          {/* Thêm icon reload nếu là hành động thử lại */}
          <RiRefreshLine style={{ marginRight: 8 }} />
          {actionText}
        </Button>
      )}
    </ErrorWrapper>
  );
}