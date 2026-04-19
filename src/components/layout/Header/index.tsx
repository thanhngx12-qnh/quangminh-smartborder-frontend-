// dir: frontend/src/components/layout/Header/index.tsx
'use client';

import { useState, useEffect, useMemo } from 'react'; // Thêm useMemo
import Image from 'next/image'; 
import { useTranslations } from 'next-intl';
import { usePathname } from '@/navigation';
import { 
  RiSearchLine, RiMenu3Line, RiCloseLine, RiTranslate2,
  RiPhoneFill, RiMailFill, RiMapPinFill, RiArrowDownSLine,
  RiServiceLine, RiNewspaperLine
} from 'react-icons/ri';
import { ButtonLink } from '@/components/ui/Button'; 
import LanguageSwitcher from './LanguageSwitcher';
import SearchModal from './SearchModal';
import { useCategories } from '@/hooks/useCategories';

import {
  HeaderWrapper, TopBar, TopBarContainer, ContactInfo, Actions, MainNav, Logo, MenuIcon, 
  NavLinks, NavLink, HeaderIcons, TopBarLink, MobileActions, MobileSettingGroup, MobileSettingsWrapper, 
  MobileButton, MobileButtonLink, SearchButtonDesktop,
  NavItemWrapper, DropdownMenu, DropdownItem 
} from './Header.styles';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  const tNav = useTranslations('Navigation');
  const tGeneral = useTranslations('General');
  const tAddress = useTranslations('Footer');
  const tCta = useTranslations('CtaButton');
  const pathname = usePathname();

  // 1. Lấy danh mục từ API
  const { categories: serviceCats } = useCategories('SERVICE');
  const { categories: newsCats } = useCategories('NEWS');

  // 2. Dùng useMemo để tính toán Menu, đảm bảo an toàn dữ liệu (Fix lỗi .map)
  const navItems = useMemo(() => {
    // Đảm bảo cats luôn là mảng, nếu chưa load xong hoặc lỗi thì là mảng rỗng []
    const sCats = Array.isArray(serviceCats) ? serviceCats : [];
    const nCats = Array.isArray(newsCats) ? newsCats : [];

    return [
      { href: '/', label: tNav('home') },
      { href: '/about', label: tNav('about') },
      { 
        label: tNav('services'), 
        href: '/services', 
        subItems: sCats.map(cat => ({
          href: `/services?categoryId=${cat.id}`, 
          label: cat.name 
        }))
      },
      { 
        label: tNav('news'), 
        href: '/news',
        subItems: nCats.map(cat => ({
          href: `/news?categoryId=${cat.id}`, 
          label: cat.name 
        }))
      },
      { href: '/manifesto', label: tNav('manifesto') },
      { href: '/careers', label: tNav('careers') },
      { href: '/contact', label: tNav('contact') },
    ];
  }, [serviceCats, newsCats, tNav]); // Re-run khi dữ liệu tải xong

  useEffect(() => { 
    setIsMenuOpen(false); 
    setOpenMobileDropdown(null);
  }, [pathname]);
  
  useEffect(() => {
    const isOverlayOpen = isMenuOpen || isSearchOpen;
    document.body.style.overflow = isOverlayOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen, isSearchOpen]);

  const toggleMobileDropdown = (e: React.MouseEvent, label: string) => {
    if (window.innerWidth <= 992) {
      e.preventDefault();
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

            {navItems.map((item) => (
              item.subItems && item.subItems.length > 0 ? (
                <NavItemWrapper key={item.label}>
                  <NavLink 
                    href={item.href as unknown as string} 
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
                      <DropdownItem key={sub.href} href={sub.href as unknown as string} as="a">
                        {item.label === tNav('services') ? <RiServiceLine /> : <RiNewspaperLine />}
                        {sub.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </NavItemWrapper>
              ) : (
                <NavItemWrapper key={item.label}>
                  <NavLink href={item.href as unknown as string} as="a" $isActive={pathname === item.href}>
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