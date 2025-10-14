// dir: ~/quangminh-smart-border/frontend/src/components/layout/Header/Header.styles.ts
'use client';
import styled from 'styled-components';
import { Link } from '@/navigation';

export const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.header.bg};
  color: ${({ theme }) => theme.colors.header.text};
  z-index: 1000;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 60px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  font-size: 14px;

  @media (max-width: 992px) {
    display: none;
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  gap: 24px;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const LanguageSwitcher = styled.div`
  display: flex;
  gap: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const MainNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 60px;
  position: relative;

  @media (max-width: 992px) {
    padding: 16px 20px;
  }
`;

export const Logo = styled(Link)`
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  z-index: 10;
  color: ${({ theme }) => theme.colors.header.text};
`;

export const MenuIcon = styled.div`
  display: none;
  font-size: 28px;
  cursor: pointer;
  z-index: 10;
  color: ${({ theme }) => theme.colors.header.text};

  @media (max-width: 992px) {
    display: block;
  }
`;

export const NavLinks = styled.nav<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 40px;

  @media (max-width: 992px) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.background};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 32px;
    
    transform: ${({ $isOpen }) => $isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease-in-out;
    
    opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
    pointer-events: ${({ $isOpen }) => $isOpen ? 'auto' : 'none'};
  }
`;

export const NavLink = styled(Link)<{ $isActive: boolean }>`
  font-size: 16px;
  font-weight: 500;
  position: relative;
  color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.accent : theme.colors.header.text
  };
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.accent};
    transform: ${({ $isActive }) => ($isActive ? 'scaleX(1)' : 'scaleX(0)')};
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }

  @media (max-width: 992px) {
    font-size: 24px;
    color: ${({ theme }) => theme.colors.text};
    
    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

export const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 22px;
  
  & > * {
    cursor: pointer;
    transition: color 0.2s ease;
    color: ${({ theme }) => theme.colors.header.text};
    
    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }

  @media (max-width: 992px) {
    display: none;
  }
`;

export const TopBarLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;