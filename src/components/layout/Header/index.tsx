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
  RiBrushLine,
  RiPhoneFill, 
  RiMailFill, 
} from 'react-icons/ri';
import Button, { ButtonLink } from '@/components/ui/Button';
import { useUIStore } from '@/hooks/useUIStore';
import LanguageSwitcher from './LanguageSwitcher';
import SearchModal from './SearchModal';

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
  MobileSettingGroup, // Đổi từ MobileSettings
  MobileSettingsWrapper, // Wrapper mới
  MobileButton,
  MobileButtonLink,
  SearchButtonDesktop 
} from './Header.styles';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, toggleTheme } = useUIStore();

  const tNav = useTranslations('Navigation');
  const tActions = useTranslations('HeaderActions');
  const tCta = useTranslations('CtaButton');
  const tGeneral = useTranslations('General');
  const pathname = usePathname();
  
  const navItems = [
    { href: '/services', label: tNav('services') },
    { href: '/manifesto', label: tNav('manifesto') },
    { href: '/careers', label: tNav('careers') },
    { href: '/about', label: tNav('about') },
    { href: '/news', label: tNav('news') },
    { href: '/contact', label: tNav('contact') },
  ];

  useEffect(() => { 
    setIsMenuOpen(false); 
  }, [pathname]);
  
  useEffect(() => {
    const isOverlayOpen = isMenuOpen || isSearchOpen;
    document.body.style.overflow = isOverlayOpen ? 'hidden' : 'unset';
    return () => { 
      document.body.style.overflow = 'unset'; 
    };
  }, [isMenuOpen, isSearchOpen]);

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
            <span><RiPhoneFill />Hotline: +84 206 3888 888</span>
            <span><RiMailFill />Email: info@quangminh.vn</span>
          </ContactInfo>
          <Actions>
            <LanguageSwitcher variant="full" />
            <TopBarLink href="/tracking" as="a">{tActions('tracking')}</TopBarLink>
            <TopBarLink href="/quote" as="a">{tActions('quote')}</TopBarLink>
          </Actions>
        </TopBar>

        <MainNav>
          <Logo href="/" as="a">
            Phú Anh <span>Smart Border</span>
          </Logo>

          <NavLinks $isOpen={isMenuOpen} onClick={handleBackdropClick}>
            {/* CÀI ĐẶT NGÔN NGỮ VÀ GIAO DIỆN TRÊN ĐẦU MENU MOBILE */}
            <MobileSettingsWrapper>
                <MobileSettingGroup>
                    <div className="setting-label">
                      <RiTranslate2 /> <span>{tGeneral('language')}</span> {/* Dùng tGeneral cho ngôn ngữ */}
                    </div>
                    <div className="setting-control">
                      <LanguageSwitcher variant="icon" />
                    </div>
                </MobileSettingGroup>

                <MobileSettingGroup>
                    <div className="setting-label">
                      <RiBrushLine /> <span>{tGeneral('theme')}</span> {/* Dùng tGeneral cho giao diện */}
                    </div>
                    <div className="setting-control">
                      <button onClick={toggleTheme} aria-label="Toggle theme">
                        {theme === 'light' ? <RiMoonLine /> : <RiSunLine />}
                      </button>
                    </div>
                </MobileSettingGroup>
            </MobileSettingsWrapper>

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

            {/* CÁC NÚT HÀNH ĐỘNG CHO MENU MOBILE (Đặt ở dưới cùng) */}
            <MobileActions>
              <MobileButtonLink href="/quote" variant="primary" as="a">{tCta('quote')}</MobileButtonLink>
              <MobileButton onClick={() => { setIsSearchOpen(true); setIsMenuOpen(false); }} variant="secondary">
                <RiSearchLine style={{ marginRight: '8px' }}/> {tGeneral('search')}
              </MobileButton>
            </MobileActions>
          </NavLinks>

          <HeaderIcons>
            <ButtonLink href="/quote" variant="primary" as="a">{tCta('quote')}</ButtonLink>
            <SearchButtonDesktop onClick={() => setIsSearchOpen(true)} aria-label="Search">
              <RiSearchLine />
            </SearchButtonDesktop>
            <button 
              onClick={toggleTheme} 
              aria-label="Toggle theme" 
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'inherit', 
                fontSize: 'inherit',
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