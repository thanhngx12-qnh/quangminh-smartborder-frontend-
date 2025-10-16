// dir: ~/quangminh-smart-border/frontend/src/components/ui/ErrorState.tsx
'use client';

import styled from 'styled-components';
import { RiErrorWarningLine } from 'react-icons/ri';
import Button from './Button';

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 20px;
  background-color: ${({ theme }) => theme.colors.surface};
  min-height: 50vh;
`;

const IconWrapper = styled.div`
  font-size: 64px;
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 400px;
  margin-bottom: 32px;
`;

interface ErrorStateProps {
  title: string;       // Bắt buộc
  description: string; // Bắt buộc
  actionText?: string;
  onAction?: () => void;
}

export default function ErrorState({ 
  title, 
  description, 
  actionText, 
  onAction 
}: ErrorStateProps) {
  return (
    <ErrorWrapper>
      <IconWrapper>
        <RiErrorWarningLine />
      </IconWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
      {actionText && onAction && (
        <Button onClick={onAction} variant="secondary">
          {actionText}
        </Button>
      )}
    </ErrorWrapper>
  );
}