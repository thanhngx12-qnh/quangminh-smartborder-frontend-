// dir: ~/quangminh-smart-border/frontend/src/components/layout/Footer/Footer.styles.ts
'use client';
import styled from 'styled-components';
import { Link } from '@/navigation';

export const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.footer.bg};
  color: ${({ theme }) => theme.colors.footer.text};
  padding-top: 60px;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.footer.text};
    margin-bottom: 8px;
  }

  p, address {
    font-style: normal;
    font-size: 14px;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.footer.textSecondary};
  }
`;

export const Logo = styled.h2`
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.footer.text};
  margin-bottom: 8px;
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
  font-size: 24px;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
  
  a {
    color: ${({ theme }) => theme.colors.footer.textSecondary};
    transition: color 0.2s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

export const LinkList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FooterLink = styled(Link)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.footer.textSecondary};
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  input, textarea {
    width: 100%;
    padding: 12px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    font-family: inherit;
    font-size: 14px;
    
    &::placeholder {
      color: ${({ theme }) => theme.colors.textSecondary};
    }

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.accent};
      box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

export const MapWrapper = styled.div`
  grid-column: span 2;
  
  iframe {
    width: 100%;
    height: 100%;
    min-height: 250px;
    border-radius: 8px;
    border: 0;
  }

  @media (max-width: 992px) {
    grid-column: span 1;
  }
`;

export const CopyrightBar = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  padding: 16px 20px;
  margin-top: 60px;
  font-size: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.divider};
`;