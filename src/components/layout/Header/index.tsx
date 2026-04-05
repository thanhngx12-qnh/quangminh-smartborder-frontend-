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
  RiTranslate2,
  RiPhoneFill, 
  RiMailFill,
  RiMapPinFill,
  RiArrowDownSLine // Import icon mũi tên xuống
} from 'react-icons/ri';
import { ButtonLink } from '@/components/ui/Button'; 
import LanguageSwitcher from './LanguageSwitcher';
import SearchModal from './SearchModal';

import {
  HeaderWrapper, TopBar, TopBarContainer, ContactInfo, Actions, MainNav, Logo, MenuIcon, 
  NavLinks, NavLink, HeaderIcons, TopBarLink, MobileActions, MobileSettingGroup, MobileSettingsWrapper, 
  MobileButton, MobileButtonLink, SearchButtonDesktop,
  NavItemWrapper, DropdownMenu, DropdownItem // Import thêm styled components mới
} from './Header.styles';

export default function Header() {
  const[isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // State để quản lý mở/đóng dropdown trên Mobile
  const[openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  const tNav = useTranslations('Navigation');
  const tActions = useTranslations('HeaderActions');
  const tCta = useTranslations('CtaButton');
  const tGeneral = useTranslations('General');
  const tAddress = useTranslations('Footer');
  const pathname = usePathname();
  
  // --- NÂNG CẤP DATA MENU ---
  // --- NÂNG CẤP DATA MENU (TỰ ĐỘNG CHUYỂN SLUG VÀ LABEL THEO NGÔN NGỮ) ---
  const navItems =[
    { href: '/', label: tNav('home') },
    { href: '/about', label: tNav('about') },
    { 
      label: tNav('services'), 
      href: '/services', 
      subItems:[
        // Sử dụng tNav('servicesSlug.xxx') để tự động lấy slug chuẩn SEO của ngôn ngữ đó
        { href: `/services/${tNav('servicesSlug.warehouse')}`, label: tNav('servicesSub.warehouse') },
        { href: `/services/${tNav('servicesSlug.transloading')}`, label: tNav('servicesSub.transloading') },
        { href: `/services/${tNav('servicesSlug.transport')}`, label: tNav('servicesSub.transport') },
        { href: `/services/${tNav('servicesSlug.customs')}`, label: tNav('servicesSub.customs') },
        { href: `/services/${tNav('servicesSlug.other')}`, label: tNav('servicesSub.other') },
      ]
    },
    { 
      label: tNav('news'), 
      href: '/news',
      // subItems:[
      //   { href: `/news/${tNav('newsSlug.logistics')}`, label: tNav('newsSub.logistics') },
      //   { href: `/news/${tNav('newsSlug.importExport')}`, label: tNav('newsSub.importExport') },
      //   { href: `/news/${tNav('newsSlug.market')}`, label: tNav('newsSub.market') },
      // ]
    },
    { href: '/manifesto', label: tNav('manifesto') },
    { href: '/careers', label: tNav('careers') },
    { href: '/contact', label: tNav('contact') },
  ];

  // Đóng menu khi đổi trang
  useEffect(() => { 
    setIsMenuOpen(false); 
    setOpenMobileDropdown(null);
  }, [pathname]);
  
  // Khóa cuộn trang khi mở menu mobile
  useEffect(() => {
    const isOverlayOpen = isMenuOpen || isSearchOpen;
    document.body.style.overflow = isOverlayOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  },[isMenuOpen, isSearchOpen]);

  const toggleMobileDropdown = (e: React.MouseEvent, label: string) => {
    // Chỉ kích hoạt toggle trên mobile (kích thước màn hình < 992px)
    if (window.innerWidth <= 992) {
      e.preventDefault(); // Ngăn chuyển trang nếu click vào item có dropdown
      setOpenMobileDropdown(openMobileDropdown === label ? null : label);
    }
  };

  return (
    <>
      <HeaderWrapper>
        <TopBar>
          <TopBarContainer className="container">
            <ContactInfo>
              <a href="tel:0963320335"><RiPhoneFill /> +8496.3320.335</a>
              <a href="mailto:info@talunglogistics.com"><RiMailFill /> info@talunglogistics.com</a>
              <span className="office-loc"><RiMapPinFill /> {tAddress('address')}</span>
            </ContactInfo>
            <Actions>
              <LanguageSwitcher variant="full" />
            </Actions>
          </TopBarContainer>
        </TopBar>

        <MainNav className="container">
          <Logo href="/" as="a">
            <div className="logo-container">
              <Image 
                src="/images/logo.png" 
                alt="Tà Lùng Logistics" 
                fill priority
                sizes="(max-width: 768px) 150px, 200px"
                style={{ objectFit: 'contain', objectPosition: 'left' }}
              />
            </div>
          </Logo>

          <NavLinks $isOpen={isMenuOpen} onClick={(e) => e.target === e.currentTarget && setIsMenuOpen(false)}>
            <MobileSettingsWrapper>
                <MobileSettingGroup>
                    <div className="setting-label"><RiTranslate2 /> <span>{tGeneral('language')}</span></div>
                    <div className="setting-control"><LanguageSwitcher variant="icon" /></div>
                </MobileSettingGroup>
            </MobileSettingsWrapper>

            {/* NÂNG CẤP RENDER MENU */}
            {navItems.map((item) => (
              item.subItems ? (
                // Menu có Dropdown
                <NavItemWrapper key={item.label}>
                  <NavLink 
                    href={item.href} 
                    as="a" 
                    $isActive={pathname.startsWith(item.href)} 
                    $hasDropdown={true}
                    onClick={(e) => toggleMobileDropdown(e, item.label)}
                  >
                    {item.label} 
                    <RiArrowDownSLine style={{ 
                      transform: openMobileDropdown === item.label ? 'rotate(180deg)' : 'none' 
                    }}/>
                  </NavLink>
                  <DropdownMenu $isOpenOnMobile={openMobileDropdown === item.label}>
                    {item.subItems.map(sub => (
                      <DropdownItem key={sub.href} href={sub.href} as="a">
                        {sub.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </NavItemWrapper>
              ) : (
                // Menu bình thường
                <NavItemWrapper key={item.href}>
                  <NavLink href={item.href} as="a" $isActive={pathname === item.href}>
                    {item.label}
                  </NavLink>
                </NavItemWrapper>
              )
            ))}

            <MobileActions>
              <MobileButtonLink href="/contact" variant="primary" as="a">{tCta('quote')}</MobileButtonLink>
              <MobileButton onClick={() => { setIsSearchOpen(true); setIsMenuOpen(false); }} variant="secondary">
                <RiSearchLine style={{ marginRight: '8px' }}/> {tGeneral('search')}
              </MobileButton>
            </MobileActions>
          </NavLinks>

          <HeaderIcons>
            <SearchButtonDesktop onClick={() => setIsSearchOpen(true)} aria-label="Search">
              <RiSearchLine />
            </SearchButtonDesktop>
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