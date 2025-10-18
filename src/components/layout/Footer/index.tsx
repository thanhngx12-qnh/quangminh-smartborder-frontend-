// dir: ~/quangminh-smart-border/frontend/src/components/layout/Footer/index.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormValues } from '@/lib/schemas';
import { postQuoteRequest } from '@/lib/api';
import { RiWechatLine, RiMessage2Line, RiPhoneLine, RiBuildingLine, RiUserLine, RiFacebookCircleLine } from 'react-icons/ri';
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
  FormError,
  FormSuccess,
  LoadingOverlay,
  CopyrightBar,
  MapWrapper,
  IconWrapper, 
  ContactList, 
  ContactItem
} from './Footer.styles';

export default function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navigation');
  const tContact = useTranslations('ContactPage');
  const tSocial = useTranslations('Social');

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setFormStatus('submitting');
    try {
      await postQuoteRequest(data);
      setFormStatus('success');
      reset();
    } catch (error) {
      console.error("Failed to submit quote request:", error);
      setFormStatus('error');
    }
  };

  const navLinks = [
    { href: '/services', label: tNav('services') },
    { href: '/about', label: tNav('about') },
    { href: '/careers', label: tNav('careers') },
    { href: '/news', label: tNav('news') },
    { href: '/contact', label: tNav('contact') },
  ];

  const legalLinks = [
    { href: '/terms', label: t('terms') },
    { href: '/privacy', label: t('privacy') },
  ];

  const socialLinks = [
    { href: '#', label: tSocial('facebook', { defaultMessage: 'Facebook' }), icon: <RiFacebookCircleLine /> },
    { href: '#', label: tSocial('wechat', { defaultMessage: 'WeChat' }), icon: <RiWechatLine /> },
    { href: '#', label: tSocial('zalo', { defaultMessage: 'Zalo' }), icon: <RiMessage2Line /> },
  ];

  return (
    <FooterWrapper>
      <FooterContent>
        <FooterColumn>
          <Logo>Phú Anh</Logo>
          <h3>{t('companyName')}</h3>
          <address>{t('address')}</address>
          {/* <p>
            <RiPhoneLine /> Hotline: +84 206 3888 888<br/>
            <RiWechatLine /> Email: info@quangminh.vn<br/>
            <RiBuildingLine /> {tContact('salesDept')}: sales@quangminh.vn<br/>
            <RiBuildingLine /> {tContact('opsDept')}: operations@quangminh.vn<br/>
            <RiUserLine /> {tContact('hrDept')}: hr@quangminh.vn
          </p> */}
          <ContactList>
            <ContactItem>
              <IconWrapper><RiPhoneLine /></IconWrapper>
              <span>Hotline: +84 206 3888 888</span>
            </ContactItem>

            <ContactItem>
              <IconWrapper><RiWechatLine /></IconWrapper>
              <span>Email: info@quangminh.vn</span>
            </ContactItem>

            <ContactItem>
              <IconWrapper><RiBuildingLine /></IconWrapper>
              <span>{tContact('salesDept')}: sales@quangminh.vn</span>
            </ContactItem>

            <ContactItem>
              <IconWrapper><RiBuildingLine /></IconWrapper>
              <span>{tContact('opsDept')}: operations@quangminh.vn</span>
            </ContactItem>

            <ContactItem>
              <IconWrapper><RiUserLine /></IconWrapper>
              <span>{tContact('hrDept')}: hr@quangminh.vn</span>
            </ContactItem>
          </ContactList>
          <SocialLinks>
            {socialLinks.map(({ href, label, icon }) => (
              <a key={href} href={href} aria-label={label}>
                {icon}
              </a>
            ))}
          </SocialLinks>
        </FooterColumn>
        
        <FooterColumn>
          <h3>{t('sitemap')}</h3>
          <LinkList>
            {navLinks.map(link => (
              <li key={link.href}>
                <FooterLink href={link.href} as="a">{link.label}</FooterLink>
              </li>
            ))}
          </LinkList>
        </FooterColumn>

        <FooterColumn>
          <h3>{t('legal')}</h3>
          <LinkList>
            {legalLinks.map(link => (
              <li key={link.href}>
                <FooterLink href={link.href} as="a">{link.label}</FooterLink>
              </li>
            ))}
          </LinkList>
        </FooterColumn>

        <FooterColumn>
          <h3>{t('quickContact')}</h3>
          {formStatus === 'success' ? (
            <FormSuccess>{t('formSuccess', { defaultMessage: 'Cảm ơn bạn! Chúng tôi đã nhận được yêu cầu của bạn và sẽ phản hồi sớm.' })}</FormSuccess>
          ) : (
            <ContactForm onSubmit={handleSubmit(onSubmit)} noValidate>
              {formStatus === 'submitting' && (
                <LoadingOverlay>
                  <div className="spinner" />
                </LoadingOverlay>
              )}
              <div>
                <input 
                  type="text" 
                  placeholder={t('formName')} 
                  {...register('name')}
                />
                {errors.name && <FormError>{errors.name.message}</FormError>}
              </div>

              <div>
                <input 
                  type="email" 
                  placeholder={t('formEmail')} 
                  {...register('email')}
                />
                {errors.email && <FormError>{errors.email.message}</FormError>}
              </div>

              <div>
                <input 
                  type="tel" 
                  placeholder={tContact('phone')} 
                  {...register('phone')}
                />
                {errors.phone && <FormError>{errors.phone.message}</FormError>}
              </div>

              <div>
                <textarea 
                  placeholder={t('formMessage')} 
                  {...register('message')}
                />
                {errors.message && <FormError>{errors.message.message}</FormError>}
              </div>

              <Button type="submit" variant="primary" disabled={formStatus === 'submitting'}>
                {formStatus === 'submitting' ? t('formSubmitting', { defaultMessage: 'Đang gửi...' }) : t('formSend')}
              </Button>
              {formStatus === 'error' && (
                <FormError>{t('formError', { defaultMessage: 'Có lỗi xảy ra, vui lòng thử lại.' })}</FormError>
              )}
            </ContactForm>
          )}
        </FooterColumn>

        <MapWrapper>
          <iframe
            src="https://www.google.com/maps/embed?t=k&pb=!1m18!1m12!1m3!1d14545.922416181976!2d106.71181605!3d22.6713837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x36a6e7b7f1e1b8b9%3A0xe8c7f3e8b8b8b8b9!2zQ-G7rWEgS2jhuql1IFThu6AgTOG7pW5n!5e0!3m2!1svi!2s!4v1678888888888!5m2!1svi!2s"
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
