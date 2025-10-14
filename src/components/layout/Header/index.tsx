// dir: ~/quangminh-smart-border/frontend/src/components/layout/Header/index.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/navigation';
import { 
  RiSearchLine, 
  RiMenu3Line, 
  RiCloseLine, 
  RiSunLine, 
  RiMoonLine 
} from 'react-icons/ri';
import Button from '@/components/ui/Button';
import { useUIStore } from '@/hooks/useUIStore'; // Import store quản lý UI
import LanguageSwitcher from './LanguageSwitcher'; // Import component đổi ngôn ngữ
import SearchModal from './SearchModal';

// Import các styled components từ file riêng
import {
  HeaderWrapper,
  TopBar,
  ContactInfo,
  Actions,
  MainNav,
  Logo,
  MenuIcon,
  NavLinks,
  NavLink,
  HeaderIcons,
  TopBarLink,
} from './Header.styles';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false); // State cho menu mobile
  const { theme, toggleTheme } = useUIStore(); // Lấy state và action từ store
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  // Tự động đóng menu khi chuyển trang
  useEffect(() => { 
    setIsOpen(false); 
  }, [pathname]);
  
  // Khóa cuộn trang khi menu mobile mở
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { 
      document.body.style.overflow = 'unset'; 
    };
  }, [isOpen]);

  return (
    <>
    <HeaderWrapper>
      <TopBar>
        <ContactInfo>
          <span>Hotline: +84 206 3888 888</span>
          <span>Email: info@quangminh.vn</span>
        </ContactInfo>
        <Actions>
          {/* Component đổi ngôn ngữ đã được tách riêng */}
          <LanguageSwitcher />
          <TopBarLink as="a" href="/tracking">{tActions('tracking')}</TopBarLink>
          <TopBarLink as="a" href="/quote">{tActions('quote')}</TopBarLink>
        </Actions>
      </TopBar>
      <MainNav>
        <Logo as="a" href="/">
          QUANG MINH
          <br />
          Smart Border
        </Logo>

        <NavLinks $isOpen={isOpen}>
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              as="a"
              href={item.href}
              $isActive={pathname === item.href}
            >
              {item.label}
            </NavLink>
          ))}
        </NavLinks>

        <HeaderIcons>
          <Button variant="primary">{tCta('quote')}</Button>
           <RiSearchLine onClick={() => setIsSearchOpen(true)} /> 
          {/* Nút chuyển đổi theme với logic và icon thay đổi */}
          <button 
            onClick={toggleTheme} 
            aria-label="Toggle theme" 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'inherit', 
              fontSize: '22px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {theme === 'light' ? <RiMoonLine /> : <RiSunLine />}
          </button>
        </HeaderIcons>
        
        <MenuIcon onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <RiCloseLine /> : <RiMenu3Line />}
        </MenuIcon>
      </MainNav>
    </HeaderWrapper>
    <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}