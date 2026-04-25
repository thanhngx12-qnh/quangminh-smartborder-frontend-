// dir: frontend/src/components/layout/Header/Header.styles.ts
'use client';
import styled from 'styled-components';
import { Link } from '@/navigation';
import Button, { ButtonLink } from '@/components/ui/Button';

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
  background-color: ${({ theme }) => theme.colors.primary}; 
  color: #FFFFFF; /* Dùng màu trắng tuyệt đối để đạt tương phản cao nhất */
  font-size: 13px;
  border-bottom: 1px solid rgba(255,255,255,0.2);

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
    color: #FFFFFF; /* SỬA: Bỏ opacity để chữ rõ nét */
    font-weight: 600; /* Tăng nhẹ độ đậm */
    text-decoration: none;

    &:hover { 
      color: ${({ theme }) => theme.colors.secondary};
    }
    
    svg { color: ${({ theme }) => theme.colors.accent}; }
  }

  .office-loc {
    @media (max-width: 1200px) { display: none; }
  }
`;

export const Actions = styled(FlexCenter)`
  gap: 16px;
`;

export const TopBarLink = styled(Link)`
  color: #FFFFFF; /* SỬA: Bỏ opacity */
  transition: all 0.2s ease;
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const MainNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px; 
  position: relative;
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  z-index: 1012;
  height: 100%;
  
  .logo-container {
    position: relative;
    height: 50px; 
    width: 200px; 
    
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
    height: 100%;
    background-color: ${({ theme }) => theme.colors.background};
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0;
    padding: 100px 20px 20px 20px; 
    z-index: 1010;
    transform: ${({ $isOpen }) => $isOpen ? 'translateX(0)' : 'translateX(-100%)'}; 
    transition: transform 0.3s ease-in-out;
    overflow-y: auto;
  }
`;

export const NavItemWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 80px;

  @media (max-width: 992px) {
    flex-direction: column;
    height: auto;
    width: 100%;
    align-items: flex-start;
  }
`;

export const DropdownMenu = styled.div<{ $isOpenOnMobile?: boolean }>`
  position: absolute;
  top: 100%;
  left: -20px;
  min-width: 280px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: 12px 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.2s ease;
  z-index: 100;

  ${NavItemWrapper}:hover & {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  @media (max-width: 992px) {
    position: static;
    box-shadow: none;
    border: none;
    border-left: 2px solid ${({ theme }) => theme.colors.border};
    padding: 0;
    margin-left: 16px;
    margin-bottom: ${({ $isOpenOnMobile }) => ($isOpenOnMobile ? '8px' : '0')};
    display: ${({ $isOpenOnMobile }) => ($isOpenOnMobile ? 'flex' : 'none')};
    flex-direction: column;
    opacity: 1;
    visibility: visible;
    transform: none;
    width: calc(100% - 16px);
  }
`;

export const DropdownItem = styled(Link)`
  display: block;
  padding: 12px 24px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 15px;
  font-weight: 600; /* Tăng độ đậm để dễ đọc */
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    background-color: ${({ theme }) => theme.colors.surfaceAlt};
  }
`;

export const NavLink = styled(Link)<{ $isActive: boolean; $hasDropdown?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  /* SỬA: Dùng màu đậm #1A1A1A thay vì #text có thể bị mờ */
  color: ${({ theme, $isActive }) => $isActive ? theme.colors.accent : '#1A1A1A'}; 
  position: relative;
  padding: 8px 0;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px; /* Tăng nhẹ độ dày gạch chân */
    background-color: ${({ theme }) => theme.colors.accent};
    transform: ${({ $isActive }) => ($isActive ? 'scaleX(1)' : 'scaleX(0)')};
    transition: transform 0.3s ease;
  }

  @media (max-width: 992px) {
    width: 100%;
    font-size: 16px;
    padding: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme, $isActive }) => $isActive ? theme.colors.accent : '#1A1A1A'};
  }
`;

export const HeaderIcons = styled(FlexCenter)`
  gap: 20px;
  @media (max-width: 992px) { display: none; }
`;

export const SearchButtonDesktop = styled.button`
  background: none;
  border: none;
  color: #1A1A1A; /* Màu tối đậm */
  cursor: pointer;
  font-size: 22px;
  display: flex;
  &:hover { color: ${({ theme }) => theme.colors.accent}; }
`;

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
  .setting-label { display: flex; align-items: center; gap: 10px; font-weight: 600; color: #1A1A1A; }
  .setting-control button { background: none; border: none; font-size: 20px; color: #1A1A1A; }
`;

export const MobileButtonLink = styled(ButtonLink)`
  width: 100%;
  justify-content: center;
  font-weight: 700;
`;

export const MobileButton = styled(Button)`
  width: 100%;
  justify-content: center;
  font-weight: 700;
`;