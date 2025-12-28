// dir: frontend/src/components/layout/Footer/index.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormValues } from '@/lib/schemas';
import { postQuoteRequest } from '@/lib/api';
import { 
  RiFacebookCircleLine, 
  RiWechatLine, 
  RiWhatsappLine, // Thay cho Zalo nếu chưa có icon Zalo
  RiPhoneLine, 
  RiMailLine, 
  RiMapPinLine 
} from 'react-icons/ri';
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
      // Reset status sau 5 giây
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      console.error("Failed to submit:", error);
      setFormStatus('error');
    }
  };

  const navLinks = [
    { href: '/', label: tNav('home') },
    { href: '/services', label: tNav('services') },
    // { href: '/tracking', label: t('tracking') || 'Tra cứu' },
    { href: '/news', label: tNav('news') },
    { href: '/contact', label: tNav('contact') },
  ];

  return (
    <FooterWrapper>
      <FooterContent>
        {/* Cột 1: Thông tin công ty */}
        <FooterColumn>
          <Logo>PHÚ ANH <span>LOGISTICS</span></Logo>
          <ContactList>
            <ContactItem>
              <IconWrapper><RiMapPinLine /></IconWrapper>
              <address>{t('address')}</address>
            </ContactItem>
            <ContactItem>
              <IconWrapper><RiPhoneLine /></IconWrapper>
              <a href="tel:0963320335">Hotline: +8496.3320.335</a>
            </ContactItem>
            <ContactItem>
              <IconWrapper><RiMailLine /></IconWrapper>
              <a href="mailto:info@talunglogistics.com">info@talunglogistics.com</a>
            </ContactItem>
          </ContactList>
          
          <SocialLinks>
            <a href="#" aria-label="Facebook"><RiFacebookCircleLine /></a>
            <a href="#" aria-label="WeChat"><RiWechatLine /></a>
            <a href="#" aria-label="WhatsApp"><RiWhatsappLine /></a>
          </SocialLinks>
        </FooterColumn>
        
        {/* Cột 2: Liên kết nhanh */}
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

        {/* Cột 3: Văn phòng & Pháp lý */}
        <FooterColumn>
          <h3>{t('legal')}</h3>
          <LinkList>
            <li><FooterLink href="/terms" as="a">{t('terms')}</FooterLink></li>
            <li><FooterLink href="/privacy" as="a">{t('privacy')}</FooterLink></li>
          </LinkList>
{/*           
          <div style={{ marginTop: 20 }}>
            <h3>Văn phòng</h3>
             <ContactList>
                <ContactItem>
                  <IconWrapper><RiMapPinLine /></IconWrapper>
                  <span>VP Hạ Long: 29 Lê Duẩn, Phường Bãi Cháy, tỉnh Quảng Ninh</span>
                </ContactItem>
             </ContactList>
          </div> */}
        </FooterColumn>

        {/* Cột 4: Form liên hệ nhanh */}
        <FooterColumn>
          <h3>{t('quickContact')}</h3>
          {formStatus === 'success' ? (
            <FormSuccess>
              {t('formSuccess', { defaultMessage: 'Đã gửi thành công!' })}
            </FormSuccess>
          ) : (
            <ContactForm onSubmit={handleSubmit(onSubmit)} noValidate>
              {formStatus === 'submitting' && (
                <LoadingOverlay><div className="spinner" /></LoadingOverlay>
              )}
              
              <input 
                type="text" 
                placeholder={t('formName')} 
                {...register('name')}
              />
              {errors.name && <FormError>{errors.name.message}</FormError>}

              <input 
                type="email" 
                placeholder={t('formEmail')} 
                {...register('email')}
              />
              {errors.email && <FormError>{errors.email.message}</FormError>}

              <input 
                type="tel" 
                placeholder={t('formPhone')} 
                {...register('phone')}
              />
              {errors.phone && <FormError>{errors.phone.message}</FormError>}

              <textarea 
                placeholder={t('formMessage')} 
                {...register('message')}
              />
              {errors.message && <FormError>{errors.message.message}</FormError>}

              <Button type="submit" variant="primary" size="small" disabled={formStatus === 'submitting'}>
                {t('formSend')}
              </Button>
            </ContactForm>
          )}
        </FooterColumn>

        {/* Map Full Width - Vệ Tinh */}
        <MapWrapper>
          <iframe
            src="https://maps.google.com/maps?q=22.477244,106.582163&t=k&z=15&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Vị trí kho bãi Tà Lùng Logistics"
            allowFullScreen
          ></iframe>
        </MapWrapper>
      </FooterContent>

      <CopyrightBar>
        <p>{t('copyright')}</p>
      </CopyrightBar>
    </FooterWrapper>
  );
}