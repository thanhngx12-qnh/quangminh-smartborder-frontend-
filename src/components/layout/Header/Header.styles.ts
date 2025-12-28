// dir: frontend/src/components/layout/Header/Header.styles.ts
'use client';
import styled from 'styled-components';
import { Link } from '@/navigation';
import Button, { ButtonLink } from '@/components/ui/Button';

// Utility mixin for flex items
const FlexCenter = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.header.bg};
  z-index: 1000;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: background-color 0.3s ease;
`;

export const TopBar = styled.div`
  background-color: ${({ theme }) => theme.colors.primary}; // Màu xanh đậm
  color: ${({ theme }) => theme.colors.white};
  font-size: 13px;
  border-bottom: 1px solid rgba(255,255,255,0.1);

  @media (max-width: 992px) {
    display: none;
  }
`;

export const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`;

export const ContactInfo = styled(FlexCenter)`
  gap: 24px;

  a, span {
    display: flex;
    align-items: center;
    gap: 6px;
    color: ${({ theme }) => theme.colors.white};
    opacity: 0.9;
    transition: opacity 0.2s;
    font-weight: 500;
    text-decoration: none;

    &:hover { opacity: 1; }
    
    svg { color: ${({ theme }) => theme.colors.accent}; } // Icon đỏ
  }

  .office-loc {
    @media (max-width: 1200px) { display: none; }
  }
`;

export const Actions = styled(FlexCenter)`
  gap: 16px;
`;

export const TopBarLink = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
  opacity: 0.9;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const MainNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px; // Chiều cao chuẩn
  position: relative;
`;

// Logo Component mới hỗ trợ Image Next.js
export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  z-index: 1012;
  height: 100%;
  
  .logo-container {
    position: relative;
    height: 50px; // Chiều cao ảnh logo
    width: 200px; // Chiều rộng cơ sở
    
    @media (max-width: 992px) {
      height: 40px;
      width: 160px;
    }
  }
`;

export const MenuIcon = styled(FlexCenter)<{ $isOpen: boolean }>`
  display: none;
  font-size: 28px;
  cursor: pointer;
  z-index: 1012;
  color: ${({ theme, $isOpen }) => $isOpen ? theme.colors.accent : theme.colors.text};

  @media (max-width: 992px) { display: flex; }
`;

export const NavLinks = styled.nav<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 992px) {
    position: fixed;
    top: 0;
    left: 0; 
    width: 100vw;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.background};
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0;
    padding: 100px 20px 20px; 
    z-index: 1010;
    transform: ${({ $isOpen }) => $isOpen ? 'translateX(0)' : 'translateX(-100%)'}; 
    transition: transform 0.3s ease-in-out;
    overflow-y: auto;
  }
`;

export const NavLink = styled(Link)<{ $isActive: boolean }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme, $isActive }) => $isActive ? theme.colors.accent : theme.colors.text};
  position: relative;
  padding: 8px 0;
  transition: color 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.accent};
    transform: ${({ $isActive }) => ($isActive ? 'scaleX(1)' : 'scaleX(0)')};
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    &::after { transform: scaleX(1); transform-origin: left; }
  }

  @media (max-width: 992px) {
    width: 100%;
    font-size: 16px;
    padding: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    text-transform: none;
    &:hover { background-color: ${({ theme }) => theme.colors.surfaceAlt}; }
    &::after { display: none; }
  }
`;

export const HeaderIcons = styled(FlexCenter)`
  gap: 20px;
  
  .theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: ${({ theme }) => theme.colors.textSecondary};
    display: flex;
    &:hover { color: ${({ theme }) => theme.colors.primary}; }
  }

  @media (max-width: 992px) { display: none; }
`;

export const SearchButtonDesktop = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  font-size: 22px;
  display: flex;
  transition: color 0.2s ease;
  &:hover { color: ${({ theme }) => theme.colors.accent}; }
`;

// --- Mobile Components ---
export const MobileActions = styled.div`
  display: none;
  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 24px;
    width: 100%;
  }
`;

export const MobileSettingsWrapper = styled.div`
  display: none;
  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const MobileSettingGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  border-radius: 6px;
  .setting-label { display: flex; align-items: center; gap: 10px; font-weight: 500; }
  .setting-control button { background: none; border: none; font-size: 20px; }
`;

export const MobileButtonLink = styled(ButtonLink)`
  width: 100%;
  justify-content: center;
`;

export const MobileButton = styled(Button)`
  width: 100%;
  justify-content: center;
`;