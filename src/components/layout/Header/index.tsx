// dir: ~/quangminh-smart-border/frontend/src/components/layout/Header/index.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
// Import Link gốc để có thể sử dụng prop 'as'
import { usePathname } from '@/navigation'; 
import { RiSearchLine, RiSettings3Line, RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import Button from '@/components/ui/Button';

// Import các styled components
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
  TopBarLink
} from './Header.styles';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

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

  useEffect(() => { setIsOpen(false); }, [pathname]);
  
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
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
          {/* SỬA LỖI Ở ĐÂY: Dùng `as="a"` */}
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
             // SỬA LỖI Ở ĐÂY: Vẫn sử dụng NavLink (styled(Link)) như bình thường
             // Vì NavLink là một styled-component, nó xử lý prop tốt hơn
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