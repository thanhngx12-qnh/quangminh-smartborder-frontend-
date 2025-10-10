// dir: ~/quangminh-smart-border/frontend/src/components/layout/Footer/index.tsx
'use client';

import { useTranslations } from 'next-intl';
import { RiWechatLine, RiMessage2Line } from 'react-icons/ri'; // Giả sử dùng Zalo và WeChat
import Button from '@/components/ui/Button';
import {
  FooterWrapper,
  FooterContent,
  FooterColumn,
  Logo,
  SocialLinks,
  LinkList,
  FooterLink,
  ContactForm,
  CopyrightBar,
  MapWrapper,
} from './Footer.styles';

export default function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navigation');

  const navLinks = [
    { href: '/services', label: tNav('services') },
    { href: '/about', label: tNav('about') },
    { href: '/news', label: tNav('news') },
    { href: '/contact', label: tNav('contact') },
  ];
  
  const legalLinks = [
    { href: '/terms', label: t('terms') },
    { href: '/privacy', label: t('privacy') },
  ];
  
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterColumn>
          <Logo>QUANG MINH</Logo>
          <h3>{t('companyName')}</h3>
          <address>{t('address')}</address>
          <p>
            Hotline: +84 206 3888 888<br/>
            Email: info@quangminh.vn
          </p>
          <SocialLinks>
            <a href="#" aria-label="WeChat"><RiWechatLine /></a>
            <a href="#" aria-label="Zalo"><RiMessage2Line /></a>
          </SocialLinks>
        </FooterColumn>
        
        <FooterColumn>
          <h3>{t('sitemap')}</h3>
          <LinkList>
            {navLinks.map(link => (
              <li key={link.href}><FooterLink href={link.href}>{link.label}</FooterLink></li>
            ))}
          </LinkList>
        </FooterColumn>

        <FooterColumn>
          <h3>{t('legal')}</h3>
          <LinkList>
            {legalLinks.map(link => (
              <li key={link.href}><FooterLink href={link.href}>{link.label}</FooterLink></li>
            ))}
          </LinkList>
        </FooterColumn>

        <FooterColumn>
          <h3>{t('quickContact')}</h3>
          <ContactForm>
            <input type="text" placeholder={t('formName')} required />
            <input type="email" placeholder={t('formEmail')} required />
            <textarea placeholder={t('formMessage')} required />
            <Button type="submit" variant="primary">{t('formSend')}</Button>
          </ContactForm>
        </FooterColumn>

        <MapWrapper>
           <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14545.922416181976!2d106.71181605!3d22.6713837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x36a6e7b7f1e1b8b9%3A0xe8c7f3e8b8b8b8b9!2zQ-G7rWEgS2jhuql1IFThu6AgTOG7pW5n!5e0!3m2!1svi!2s!4v1678888888888!5m2!1svi!2s"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Cửa khẩu Tà Lùng"
          ></iframe>
        </MapWrapper>
      </FooterContent>
      <CopyrightBar>
        <p>{t('copyright')}</p>
      </CopyrightBar>
    </FooterWrapper>
  );
}