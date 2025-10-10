// dir: ~/quangminh-smart-border/frontend/src/components/ui/Button.tsx
// (Tạo thư mục con 'ui' để chứa các component giao diện cơ bản)
'use client';

import styled, { css } from 'styled-components';

// Định nghĩa các kiểu của Button
type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps {
  variant?: ButtonVariant;
}

const Button = styled.button<ButtonProps>`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease-in-out;
  white-space: nowrap; // Ngăn nút bị xuống dòng

  ${({ variant = 'primary' }) =>
    variant === 'primary' &&
    css`
      background-color: ${({ theme }) => theme.colors.accent};
      color: ${({ theme }) => theme.colors.white};

      &:hover {
        background-color: transparent;
        border-color: ${({ theme }) => theme.colors.accent};
        color: ${({ theme }) => theme.colors.accent};
      }
    `}

  ${({ variant = 'secondary' }) =>
    variant === 'secondary' &&
    css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.primary};
      border: 2px solid ${({ theme }) => theme.colors.primary};

      &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.white};
      }
    `}
`;

export default Button;