// dir: frontend/src/components/ui/Button.tsx
'use client';

import styled, { css } from 'styled-components';
import { Link } from '@/navigation';

// Định nghĩa các kiểu của Button
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

// Interface mở rộng
export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  $fullWidth?: boolean; // Prop transient (bắt đầu bằng $) để không truyền xuống DOM
  disabled?: boolean;
}

// Logic tính toán style dựa trên Size
const getSizeStyles = (size: ButtonSize = 'medium') => {
  switch (size) {
    case 'small':
      return css`
        height: 32px;
        padding: 0 16px;
        font-size: 13px;
        font-weight: 500;
      `;
    case 'large':
      return css`
        height: 52px;
        padding: 0 32px;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 0.5px;
      `;
    case 'medium':
    default:
      return css`
        height: 44px;
        padding: 0 24px;
        font-size: 15px;
        font-weight: 600;
      `;
  }
};

// Style chung tái sử dụng
const buttonStyles = css<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px; // Bo góc hiện đại (không quá tròn)
  cursor: pointer;
  border: 1px solid transparent; // Viền mặc định để tránh layout shift
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  text-decoration: none;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  
  /* Disable state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* --- VARIANTS STYLES --- */

  /* 1. Primary: Màu ĐỎ (Accent) - Dùng cho hành động quan trọng nhất (Báo giá) */
  ${({ variant = 'primary', theme }) =>
    variant === 'primary' &&
    css`
      background-color: ${theme.colors.accent};
      color: ${theme.colors.white};
      border-color: ${theme.colors.accent};

      &:hover {
        background-color: ${theme.colors.white};
        border-color: ${theme.colors.accentHover};
        transform: translateY(-1px);
        box-shadow: 0 4px 6px rgba(255, 0, 0, 0.2);
      }
      
      &:active { transform: translateY(0); }
    `}

  /* 2. Secondary: Màu XANH (Primary) - Dùng cho nút phụ (Tìm kiếm, Xem thêm) */
  ${({ variant, theme }) =>
    variant === 'secondary' &&
    css`
      background-color: ${theme.colors.primary};
      color: ${theme.colors.white};
      border-color: ${theme.colors.primary};

      &:hover {
        background-color: ${theme.colors.white};
        border-color: ${theme.colors.primaryLight};
        box-shadow: 0 4px 6px rgba(0, 51, 102, 0.2);
      }
    `}

  /* 3. Outline: Nền trắng, viền XANH - Dùng khi không muốn quá nổi bật */
  ${({ variant, theme }) =>
    variant === 'outline' &&
    css`
      background-color: transparent;
      color: ${theme.colors.primary};
      border-color: ${theme.colors.primary};

      &:hover {
        background-color: ${theme.colors.primary}; // Xanh nhạt
        color: ${theme.colors.primary};
      }
    `}

  /* 4. Ghost: Trong suốt - Dùng cho icon hoặc nút trong menu */
  ${({ variant, theme }) =>
    variant === 'ghost' &&
    css`
      background-color: transparent;
      color: ${theme.colors.text};
      
      &:hover {
        background-color: ${theme.colors.secondary}; // Xanh nhạt
        color: ${theme.colors.accent};
      }
    `}

  /* Áp dụng Size styles */
  ${({ size }) => getSizeStyles(size)}
`;

// Component Button gốc
const Button = styled.button<ButtonProps>`
  ${buttonStyles}
`;

// Component ButtonLink (Link Next.js)
// "as" prop sẽ được styled-components xử lý tự động để tránh lỗi TS
export const ButtonLink = styled(Link)<ButtonProps>`
  ${buttonStyles}
`;

export default Button;