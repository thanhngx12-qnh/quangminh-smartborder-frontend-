// dir: ~/quangminh-smart-border/frontend/src/components/layout/Header/Header.styles.ts
'use client';
import styled from 'styled-components';
import { Link } from '@/navigation';
import Button, { ButtonLink } from '@/components/ui/Button';

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
  padding: ${({ theme }) => theme.spacing.sm} 60px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};

  @media (max-width: 992px) {
    display: none;
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TopBarLink = styled(Link)`
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors.textSecondary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const MainNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} 60px;
  position: relative;

  @media (max-width: 992px) {
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  }
`;

export const Logo = styled(Link)`
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  z-index: 1012; // Luôn cao nhất
  color: inherit;
  text-decoration: none;
`;

export const MenuIcon = styled.div<{ $isOpen: boolean }>`
  display: none;
  font-size: 28px;
  cursor: pointer;
  z-index: 1012; // Luôn cao nhất, ngang với logo
  transition: color 0.3s ease;
  
  color: ${({ theme, $isOpen }) => 
    $isOpen ? theme.colors.text : theme.colors.header.text
  };

  @media (max-width: 992px) {
    display: block;
  }
`;

export const NavLinks = styled.nav<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 40px;

  @media (max-width: 992px) {
    position: fixed;
    top: 0;
    right: 0;
    width: min(400px, 90vw);
    height: 100%;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch; // Cho các item con chiếm hết chiều rộng
    gap: 0;
    padding: 100px 40px 40px 40px;
    z-index: 1010;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
    
    transform: ${({ $isOpen }) => $isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    
    // Nền mờ cho phần còn lại của trang
    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: -1;
      opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
      transition: opacity 0.4s ease;
      pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
      // Khi click vào nền mờ sẽ đóng menu (logic trong index.tsx)
    }
  }
`;

export const NavLink = styled(Link)<{ $isActive: boolean }>`
  font-size: 16px;
  font-weight: 500;
  position: relative;
  text-decoration: none;
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
    transform-origin: left;
    transform: ${({ $isActive }) => ($isActive ? 'scaleX(1)' : 'scaleX(0)')};
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }

  @media (max-width: 992px) {
    font-size: 22px;
    font-weight: 600;
    padding: ${({ theme }) => theme.spacing.md} 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme, $isActive }) => $isActive ? theme.colors.accent : theme.colors.text};

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }

    &::after {
      display: none;
    }
  }
`;

export const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  font-size: 22px;
  
  & > * {
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

export const MobileActions = styled.div`
  display: none;

  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: auto;
    width: 100%;
    padding-top: 40px;
    border-top: 1px solid ${({ theme }) => theme.colors.divider};
  }
`;


export const MobileSettings = styled.div`
  display: flex;
  justify-content: space-between; // Đặt 2 nút ở 2 đầu
  align-items: center;
  width: 100%;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;

  .setting-label {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .setting-control {
    display: flex;
    align-items: center;
    gap: 16px;

    button { // Style chung cho các nút bên trong
      background: none;
      border: none;
      color: ${({ theme }) => theme.colors.text};
      font-size: 24px;
      cursor: pointer;
    }
  }
`;

export const MobileButtonLink = styled(ButtonLink)`
  @media (max-width: 992px) {
    width: 100%;
    padding: 16px;
    font-size: 18px;
  }
`;
export const MobileButton = styled(Button)`
  @media (max-width: 992px) {
    width: 100%;
    padding: 16px;
    font-size: 18px;
  }
`;