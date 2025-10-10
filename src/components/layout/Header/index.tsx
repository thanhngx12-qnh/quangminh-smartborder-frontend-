// dir: ~/quangminh-smart-border/frontend/src/components/layout/Header/index.tsx
'use client';

import { useTranslations } from 'next-intl';
// SỬA LỖI Ở ĐÂY: Import từ file cấu hình navigation của dự án
import { Link, usePathname } from '@/navigation'; 
import styled from 'styled-components';
import { RiSearchLine, RiSettings3Line } from 'react-icons/ri';

import Button from '@/components/ui/Button';

// --- Styled Components ---
const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 60px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 14px;
`;

const ContactInfo = styled.div`
  display: flex;
  gap: 24px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const LanguageSwitcher = styled.div`
  display: flex;
  gap: 8px;
  cursor: pointer;
`;

const MainNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 60px;
`;

// styled-components vẫn hoạt động tốt với Link component của chúng ta
const Logo = styled(Link)`
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  font-size: 16px;
  font-weight: 500;
  position: relative;
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.accent : theme.colors.white)};
  
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
`;

const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 22px;
  
  & > * {
    cursor: pointer;
    transition: color 0.2s ease;
    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;


// --- Main Component ---
export default function Header() {
  const tNav = useTranslations('Navigation');
  const tActions = useTranslations('HeaderActions');
  const tCta = useTranslations('CtaButton');
  
  // usePathname() bây giờ sẽ trả về đường dẫn không bao gồm locale (ví dụ: /services thay vì /vi/services)
  // Điều này rất tiện lợi để kiểm tra active link
  const pathname = usePathname();

  const navItems = [
    { href: '/services', label: tNav('services') },
    { href: '/manifesto', label: tNav('manifesto') },
    { href: '/about', label: tNav('about') },
    { href: '/news', label: tNav('news') },
    { href: '/contact', label: tNav('contact') },
  ];

  return (
    <HeaderWrapper>
      <TopBar>
        <ContactInfo>
          <span>Hotline: +84 206 3888 888</span>
          <span>Email: info@quangminh.vn</span>
        </ContactInfo>
        <Actions>
          <LanguageSwitcher>
            {/* Logic đổi ngôn ngữ sẽ được thêm sau */}
            <span>🇻🇳</span>
            <span>🇬🇧</span>
            <span>🇨🇳</span>
          </LanguageSwitcher>
          <Link href="/tracking">{tActions('tracking')}</Link>
          <Link href="/quote">{tActions('quote')}</Link>
        </Actions>
      </TopBar>
      <MainNav>
        <Logo href="/">
          QUANG MINH
          <br />
          Smart Border
        </Logo>
        <NavLinks>
          {navItems.map((item) => (
            <NavLink 
              key={item.href} 
              href={item.href}
              // So sánh chính xác vì pathname đã được chuẩn hóa
              $isActive={pathname === item.href}
            >
              {item.label}
            </NavLink>
          ))}
        </NavLinks>
        <HeaderIcons>
          <Button>{tCta('quote')}</Button>
          <RiSearchLine />
          <RiSettings3Line />
        </HeaderIcons>
      </MainNav>
    </HeaderWrapper>
  );
}