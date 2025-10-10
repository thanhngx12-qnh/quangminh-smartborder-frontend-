// dir: ~/quangminh-smart-border/frontend/src/components/layout/Header/index.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/navigation';
import { RiSearchLine, RiSettings3Line, RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import Button from '@/components/ui/Button';

// Import các styled components từ file riêng
import {
  HeaderWrapper,
  TopBar,
  ContactInfo,
  Actions,
  LanguageSwitcher,
  MainNav,
  Logo,
  MenuIcon,
  NavLinks,
  NavLink,
  HeaderIcons,
} from './Header.styles';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false); // State để quản lý menu mobile

  const tNav = useTranslations('Navigation');
  const tActions = useTranslations('HeaderActions');
  const tCta = useTranslations('CtaButton');
  const pathname = usePathname();
  
  const navItems = [
    { href: '/services', label: tNav('services') },
    { href: '/manifesto', label: tNav('manifesto') },
    { href: '/about', label: tNav('about') },
    { href: '/news', label: tNav('news') },
    { href: '/contact', label: tNav('contact') },
  ];

  // Logic để đóng menu khi chuyển trang
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  
  // Logic để ngăn scroll khi menu mở
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <HeaderWrapper>
      <TopBar>
        <ContactInfo>
          <span>Hotline: +84 206 3888 888</span>
          <span>Email: info@quangminh.vn</span>
        </ContactInfo>
        <Actions>
          <LanguageSwitcher>
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

        <NavLinks $isOpen={isOpen}>
          {navItems.map((item) => (
            <NavLink 
              key={item.href} 
              href={item.href}
              $isActive={pathname === item.href}
            >
              {item.label}
            </NavLink>
          ))}
          {/* Có thể thêm các nút CTA vào đây để hiển thị trong menu mobile */}
        </NavLinks>

        <HeaderIcons>
          <Button>{tCta('quote')}</Button>
          <RiSearchLine />
          <RiSettings3Line />
        </HeaderIcons>
        
        <MenuIcon onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <RiCloseLine /> : <RiMenu3Line />}
        </MenuIcon>
      </MainNav>
    </HeaderWrapper>
  );
}