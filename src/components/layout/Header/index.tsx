// dir: frontend/src/components/layout/Header/index.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image'; 
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
  RiMapPinFill
} from 'react-icons/ri';
import { ButtonLink } from '@/components/ui/Button'; // Import ButtonLink đã nâng cấp
import { useUIStore } from '@/hooks/useUIStore';
import LanguageSwitcher from './LanguageSwitcher';
import SearchModal from './SearchModal';

import {
  HeaderWrapper,
  TopBar,
  TopBarContainer,
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
  MobileSettingGroup,
  MobileSettingsWrapper,
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
  const tAddress = useTranslations('Footer');
  const pathname = usePathname();
  
  const navItems = [
    { href: '/', label: tNav('home') },
    { href: '/about', label: tNav('about') },
    { href: '/services', label: tNav('services') },
    { href: '/news', label: tNav('news') },
    { href: '/manifesto', label: tNav('manifesto') },
    { href: '/careers', label: tNav('careers') },
    { href: '/contact', label: tNav('contact') },
  ];

  useEffect(() => { setIsMenuOpen(false); }, [pathname]);
  
  useEffect(() => {
    const isOverlayOpen = isMenuOpen || isSearchOpen;
    document.body.style.overflow = isOverlayOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen, isSearchOpen]);

  return (
    <>
      <HeaderWrapper>
        {/* TopBar: Màu xanh đậm, chứa thông tin liên hệ */}
        <TopBar>
          <TopBarContainer className="container">
            <ContactInfo>
              <a href="tel:0963320335"><RiPhoneFill /> +8496.3320.335</a>
              <a href="mailto:info@talunglogistics.com"><RiMailFill /> info@talunglogistics.com</a>
              <span className="office-loc"><RiMapPinFill /> {tAddress('address')}</span>
            </ContactInfo>
            <Actions>
              <LanguageSwitcher variant="full" />
              {/* <TopBarLink href="/tracking" as="a">{tActions('tracking')}</TopBarLink> */}
            </Actions>
          </TopBarContainer>
        </TopBar>

        {/* MainNav: Logo và Menu */}
        <MainNav className="container">
          <Logo href="/" as="a">
            <div className="logo-container">
              {/* Bạn nhớ lưu file logo vào public/images/logo.png nhé */}
              <Image 
                src="/images/logo.png" 
                alt="Tà Lùng Quang Minh Logistics" 
                fill
                priority
                sizes="(max-width: 768px) 150px, 200px"
                style={{ objectFit: 'contain', objectPosition: 'left' }}
              />
            </div>
          </Logo>

          <NavLinks $isOpen={isMenuOpen} onClick={(e) => e.target === e.currentTarget && setIsMenuOpen(false)}>
            {/* Mobile Settings */}
            <MobileSettingsWrapper>
                <MobileSettingGroup>
                    <div className="setting-label"><RiTranslate2 /> <span>{tGeneral('language')}</span></div>
                    <div className="setting-control"><LanguageSwitcher variant="icon" /></div>
                </MobileSettingGroup>
                {/* <MobileSettingGroup>
                    <div className="setting-label"><RiBrushLine /> <span>{tGeneral('theme')}</span></div>
                    <div className="setting-control">
                      <button onClick={toggleTheme} aria-label="Toggle theme">
                        {theme === 'light' ? <RiMoonLine /> : <RiSunLine />}
                      </button>
                    </div>
                </MobileSettingGroup> */}
            </MobileSettingsWrapper>

            {/* Menu Items */}
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href} as="a" $isActive={pathname === item.href}>
                {item.label}
              </NavLink>
            ))}

            {/* Mobile Actions */}
            <MobileActions>
              <MobileButtonLink href="/contact" variant="primary" as="a">{tCta('quote')}</MobileButtonLink>
              <MobileButton onClick={() => { setIsSearchOpen(true); setIsMenuOpen(false); }} variant="secondary">
                <RiSearchLine style={{ marginRight: '8px' }}/> {tGeneral('search')}
              </MobileButton>
            </MobileActions>
          </NavLinks>

          {/* Desktop Actions */}
          <HeaderIcons>
            <SearchButtonDesktop onClick={() => setIsSearchOpen(true)} aria-label="Search">
              <RiSearchLine />
            </SearchButtonDesktop>
            {/* <button onClick={toggleTheme} aria-label="Toggle theme" className="theme-toggle">
              {theme === 'light' ? <RiMoonLine /> : <RiSunLine />}
            </button> */}
            {/* Bây giờ size="small" đã hoạt động tốt */}
            <ButtonLink href="/contact" variant="primary" size="small" as="a">
              {tCta('quote')}
            </ButtonLink>
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