// dir: ~/quangminh-smart-border/frontend/src/components/layout/Header/Header.styles.ts
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
  color: ${({ theme }) => theme.colors.header.text};
  z-index: 1000;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
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

export const ContactInfo = styled(FlexCenter)` // Sử dụng FlexCenter
  gap: ${({ theme }) => theme.spacing.lg};

  span {
    display: flex;
    align-items: center;
    gap: 6px; // Khoảng cách nhỏ giữa icon và text
  }
`;

export const Actions = styled(FlexCenter)` // Sử dụng FlexCenter
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
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  }
`;

export const Logo = styled(Link)`
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  z-index: 1012; 
  color: inherit;
  text-decoration: none;
  // Đảm bảo logo không bị đè bởi menu trên mobile
  position: relative; 

  @media (max-width: 992px) {
    font-size: 22px; 
    span { 
      display: block;
      font-size: 16px; 
      font-weight: 500;
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }
`;

export const MenuIcon = styled(FlexCenter)<{ $isOpen: boolean }>` // Sử dụng FlexCenter
  display: none;
  font-size: 32px;
  cursor: pointer;
  z-index: 1012;
  transition: color 0.3s ease;
  
  color: ${({ theme, $isOpen }) => 
    $isOpen ? theme.colors.accent : theme.colors.header.text
  };

  @media (max-width: 992px) {
    display: flex; // Đảm bảo flex để căn giữa icon
    margin-left: auto; 
    height: 100%; // Giúp icon căn giữa theo chiều dọc của MainNav
  }
`;

export const NavLinks = styled.nav<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 40px;

  @media (max-width: 992px) {
    position: fixed;
    top: 0;
    left: 0; 
    width: 100vw;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.background}; // Sử dụng màu nền chính của theme
    color: ${({ theme }) => theme.colors.text};
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0;
    padding: 90px 20px 20px 20px; 
    z-index: 1010;
    box-shadow: 10px 0 30px rgba(0, 0, 0, 0.15); 
    
    transform: ${({ $isOpen }) => $isOpen ? 'translateX(0)' : 'translateX(-100%)'}; 
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    overflow-y: auto; 

    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: -1;
      opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
      transition: opacity 0.4s ease;
      pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
    }
  }
`;

export const NavLink = styled(Link)<{ $isActive: boolean }>`
  font-size: 17px;
  font-weight: 500;
  position: relative;
  text-decoration: none;
  color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.accent : theme.colors.header.text
  };
  
  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
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
    font-size: 18px;
    font-weight: 600;
    padding: 12px 16px; // Tăng padding
    width: 100%;
    // Xóa border-bottom để giao diện sạch hơn
    // border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
    color: ${({ theme, $isActive }) => $isActive ? theme.colors.accent : theme.colors.text};
    border-radius: 8px; // Bo góc nhẹ
    margin-bottom: 4px; // Khoảng cách giữa các mục

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
      background-color: ${({ theme }) => theme.colors.surface};
    }

    &::after {
      display: none;
    }
  }
`;

export const HeaderIcons = styled(FlexCenter)` // Sử dụng FlexCenter
  gap: ${({ theme }) => theme.spacing.md};
  font-size: 24px;
  
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

// Styled component cho nút Search trên desktop
export const SearchButtonDesktop = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: inherit; // Kế thừa font-size từ HeaderIcons
  display: flex;
  align-items: center;
  padding: 0; // Đảm bảo không có padding thừa
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const MobileActions = styled.div`
  display: none;

  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: auto; // Đẩy xuống cuối
    width: 100%;
    padding: 20px 0; // Căn chỉnh padding
    border-top: 1px solid ${({ theme }) => theme.colors.borderLight}; // Dùng borderLight
  }
`;

export const MobileSettingsWrapper = styled.div`
  display: none;

  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight}; // Dùng borderLight
  }
`;

export const MobileSettingGroup = styled(FlexCenter)`
  justify-content: space-between;
  width: 100%;
  padding: 10px 16px; // Giảm padding để gọn hơn
  margin-bottom: 8px; // Khoảng cách giữa các setting group
  background-color: ${({ theme }) => theme.colors.surface}; // Màu nền của theme
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.textSecondary};
  
  &:last-child {
    margin-bottom: 0;
  }

  .setting-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
  }

  .setting-control {
    display: flex;
    align-items: center;
    gap: 12px;

    button {
      background: none;
      border: none;
      color: ${({ theme }) => theme.colors.text}; // Màu icon theo text chính
      font-size: 24px;
      cursor: pointer;
      padding: 4px;
      display: flex; 
      align-items: center;
    }
  }
`;

export const MobileButtonLink = styled(ButtonLink)`
  @media (max-width: 992px) {
    width: 100%;
    padding: 14px;
    font-size: 16px;
  }
`;
export const MobileButton = styled(Button)`
  @media (max-width: 992px) {
    width: 100%;
    padding: 14px;
    font-size: 16px;
    display: flex; 
    justify-content: center;
    align-items: center;
  }
`;