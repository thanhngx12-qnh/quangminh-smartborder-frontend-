// dir: ~/quangminh-smart-border/frontend/src/components/layout/Footer/Footer.styles.ts
'use client';
import styled, { keyframes } from 'styled-components';
import { Link } from '@/navigation';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.footer.bg};
  color: ${({ theme }) => theme.colors.footer.text};
  padding-top: 80px;
  padding-bottom: 40px;
  animation: ${fadeIn} 0.5s ease-out;
`;

export const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 48px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 0 16px;
  }
`;

export const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  h3 {
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.footer.text};
    margin-bottom: 12px;
    position: relative;

    &::after {
      content: '';
      display: block;
      width: 40px;
      height: 2px;
      background-color: ${({ theme }) => theme.colors.accent};
      margin-top: 8px;
      @media (max-width: 768px) {
        margin: 8px auto;
      }
    }
  }

  p, address {
    font-style: normal;
    font-size: 15px;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.footer.textSecondary};
  }
`;

export const Logo = styled.h2`
  font-size: 28px;
  font-weight: 800;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.footer.text};
  margin-bottom: 12px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 12px;
  font-size: 28px;

  @media (max-width: 768px) {
    justify-content: center;
  }

  a {
    color: ${({ theme }) => theme.colors.footer.textSecondary};
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
      transform: translateY(-2px);
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`;

export const LinkList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const FooterLink = styled(Link)`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.footer.textSecondary};
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    padding-left: 8px;
  }
`;

export const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;

  input, textarea {
    width: 100%;
    padding: 14px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    font-family: inherit;
    font-size: 15px;
    transition: all 0.2s ease;

    &::placeholder {
      color: ${({ theme }) => theme.colors.textSecondary};
    }

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.accent};
      box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.15);
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }
`;

export const FormError = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.error};
  margin-top: 6px;
  animation: ${fadeIn} 0.3s ease;
`;

export const FormSuccess = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.success};
  background-color: rgba(16, 185, 129, 0.1);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid rgba(16, 185, 129, 0.3);
  animation: ${fadeIn} 0.5s ease;
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  z-index: 10;

  .spinner {
    border: 3px solid ${({ theme }) => theme.colors.accent};
    border-top: 3px solid transparent;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const MapWrapper = styled.div`
  grid-column: span 2;
  
  iframe {
    width: 100%;
    height: 100%;
    min-height: 300px;
    border-radius: 10px;
    border: 0;
  }

  @media (max-width: 1024px) {
    grid-column: span 1;
  }

  @media (max-width: 768px) {
    min-height: 200px;
  }
`;

export const CopyrightBar = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  padding: 20px 24px;
  margin-top: 80px;
  font-size: 13px;
  border-top: 1px solid ${({ theme }) => theme.colors.divider};
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.footer.textSecondary};
  line-height: 1.4;
  white-space: nowrap; /* giữ icon và text không bị wrap tách hàng */

  @media (max-width: 768px) {
    justify-content: center;
    white-space: normal; /* cho mobile cho phép wrap nếu quá dài */
  }
`;

export const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  min-height: 28px;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.footer.textSecondary};
  flex-shrink: 0;
`;