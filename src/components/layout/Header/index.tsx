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
  RiMoonLine,
  RiTranslate2,
  RiBrushLine
} from 'react-icons/ri';
import Button, { ButtonLink } from '@/components/ui/Button';
import { useUIStore } from '@/hooks/useUIStore';
import LanguageSwitcher from './LanguageSwitcher';
import SearchModal from './SearchModal';

// Import các styled components từ file style riêng
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
  MobileActions,
  MobileSettings,
  MobileButton,
  MobileButtonLink
} from './Header.styles';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, toggleTheme } = useUIStore();

  const tNav = useTranslations('Navigation');
  const tActions = useTranslations('HeaderActions');
  const tCta = useTranslations('CtaButton');
  const tGeneral = useTranslations('General'); // Giả sử đã thêm key "search"
  const pathname = usePathname();
  
  const navItems = [
    { href: '/services', label: tNav('services') },
    { href: '/manifesto', label: tNav('manifesto') },
    { href: '/careers', label: tNav('careers') },
    { href: '/about', label: tNav('about') },
    { href: '/news', label: tNav('news') },
    { href: '/contact', label: tNav('contact') },
  ];

  // Tự động đóng menu khi chuyển trang
  useEffect(() => { 
    setIsMenuOpen(false); 
  }, [pathname]);
  
  // Khóa cuộn trang khi menu hoặc search modal mở
  useEffect(() => {
    const isOverlayOpen = isMenuOpen || isSearchOpen;
    document.body.style.overflow = isOverlayOpen ? 'hidden' : 'unset';
    // Cleanup function để đảm bảo style được reset khi component unmount
    return () => { 
      document.body.style.overflow = 'unset'; 
    };
  }, [isMenuOpen, isSearchOpen]);

  // Hàm xử lý đóng menu khi click vào nền mờ
  const handleBackdropClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <HeaderWrapper>
        <TopBar>
          <ContactInfo>
            <span>Hotline: +84 206 3888 888</span>
            <span>Email: info@quangminh.vn</span>
          </ContactInfo>
          <Actions>
            <LanguageSwitcher variant="full" />
            <TopBarLink href="/tracking" as="a">{tActions('tracking')}</TopBarLink>
            <TopBarLink href="/quote" as="a">{tActions('quote')}</TopBarLink>
          </Actions>
        </TopBar>

        <MainNav>
          <Logo href="/" as="a">
            QUANG MINH
            <br />
            Smart Border
          </Logo>

          <NavLinks $isOpen={isMenuOpen} onClick={handleBackdropClick}>
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                as="a"
                $isActive={pathname === item.href}
              >
                {item.label}
              </NavLink>
            ))}

            {/* CÁC NÚT HÀNH ĐỘNG VÀ CÀI ĐẶT CHO MENU MOBILE */}
            <MobileActions>
              <MobileButtonLink href="/quote" variant="primary" as="a">{tCta('quote')}</MobileButtonLink>
              <MobileButton onClick={() => setIsSearchOpen(true)} variant="secondary">
                {tGeneral('search')}
              </MobileButton>
              
              <MobileSettings>
                <div className="setting-label">
                  <RiTranslate2 /> <span>Ngôn ngữ</span>
                </div>
                <div className="setting-control">
                  {/* Sử dụng variant="icon" cho LanguageSwitcher trong mobile */}
                  <LanguageSwitcher variant="icon" />
                </div>
              </MobileSettings>

              <MobileSettings>
                <div className="setting-label">
                  <RiBrushLine /> <span>Giao diện</span>
                </div>
                <div className="setting-control">
                  <button onClick={toggleTheme} aria-label="Toggle theme">
                    {theme === 'light' ? <RiMoonLine /> : <RiSunLine />}
                  </button>
                </div>
              </MobileSettings>
            </MobileActions>
          </NavLinks>

          <HeaderIcons>
            <ButtonLink href="/quote" variant="primary" as="a">{tCta('quote')}</ButtonLink>
            <RiSearchLine onClick={() => setIsSearchOpen(true)} />
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
          
          <MenuIcon $isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
          </MenuIcon>
        </MainNav>
      </HeaderWrapper>
      
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}