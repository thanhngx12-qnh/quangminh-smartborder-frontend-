// dir: ~/quangminh-smart-border/frontend/src/components/layout/Footer/index.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormValues } from '@/lib/schemas';
import { postQuoteRequest } from '@/lib/api';
import { RiWechatLine, RiMessage2Line } from 'react-icons/ri';
import Button from '@/components/ui/Button';
import styled from 'styled-components';

// Import các styled components từ file style riêng
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

// --- Styled Components cho trạng thái Form ---
const FormError = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.error};
  margin-top: 4px; // Điều chỉnh khoảng cách
`;

const FormSuccess = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.success};
  background-color: rgba(16, 185, 129, 0.1);
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid rgba(16, 185, 129, 0.2);
`;

export default function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navigation');

  // State để quản lý trạng thái của form
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Thiết lập React Hook Form với Zod
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  // Hàm xử lý khi submit form
  const onSubmit = async (data: ContactFormValues) => {
    setFormStatus('submitting');
    try {
      await postQuoteRequest(data);
      setFormStatus('success');
      reset(); // Xóa các trường trong form sau khi gửi thành công
    } catch (error) {
      console.error("Failed to submit quote request:", error);
      setFormStatus('error');
    }
  };

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
              <li key={link.href}>
                <FooterLink as="a" href={link.href}>{link.label}</FooterLink>
              </li>
            ))}
          </LinkList>
        </FooterColumn>

        <FooterColumn>
          <h3>{t('legal')}</h3>
          <LinkList>
            {legalLinks.map(link => (
              <li key={link.href}><FooterLink as="a" href={link.href}>{link.label}</FooterLink></li>
            ))}
          </LinkList>
        </FooterColumn>

        <FooterColumn>
          <h3>{t('quickContact')}</h3>
          
          {formStatus === 'success' ? (
            <FormSuccess>Cảm ơn bạn! Chúng tôi đã nhận được yêu cầu...</FormSuccess>
          ) : (
            <ContactForm onSubmit={handleSubmit(onSubmit)} noValidate>
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

              {/* THÊM TRƯỜNG PHONE VÀO ĐÂY */}
              <div>
                <input 
                  type="tel" // Sử dụng type="tel" cho sematic HTML
                  placeholder="Số điện thoại của bạn" // Nên thêm chuỗi này vào file message
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
                {formStatus === 'submitting' ? 'Đang gửi...' : t('formSend')}
              </Button>
              {formStatus === 'error' && <FormError>...</FormError>}
            </ContactForm>
          )}
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