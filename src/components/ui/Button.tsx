// dir: ~/ququangminh-smart-border/frontend/src/components/ui/Button.tsx
'use client';

import styled, { css } from 'styled-components';
import { Link } from '@/navigation'; // Import Link từ file navigation

// Định nghĩa các kiểu của Button
type ButtonVariant = 'primary' | 'secondary';

// Interface này sẽ được dùng cho cả Button và ButtonLink
export interface ButtonProps {
  variant?: ButtonVariant;
}

// Tách style chung ra một css helper để có thể tái sử dụng
const buttonStyles = css<ButtonProps>`
  display: inline-block; // Cần thiết cho thẻ <a> (Link)
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  text-align: center; // Căn giữa chữ cho thẻ <a>

  /* Style cho variant 'primary' */
  ${({ variant = 'primary', theme }) =>
    variant === 'primary' &&
    css`
      background-color: ${theme.colors.accent};
      color: ${theme.colors.white};

      &:hover {
        background-color: transparent;
        border-color: ${theme.colors.accent};
        color: ${theme.colors.accent};
      }
    `}

  /* Style cho variant 'secondary' */
  ${({ variant = 'secondary', theme }) =>
    variant === 'secondary' &&
    css`
      background-color: transparent;
      color: ${theme.colors.primary};
      border: 2px solid ${theme.colors.primary};

      &:hover {
        background-color: ${theme.colors.primary};
        color: ${theme.colors.white};
      }
    `}
`;

// Component Button gốc, dùng cho các thẻ <button> (ví dụ: trong form)
// Nó được export default
const Button = styled.button<ButtonProps>`
  ${buttonStyles}
`;

// Component ButtonLink mới, dùng cho các nút bấm là thẻ <a> (Link)
// Nó được export riêng (named export)
export const ButtonLink = styled(Link)<ButtonProps>`
  ${buttonStyles}
`;

export default Button;