// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/contact/page.tsx
'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormValues } from '@/lib/schemas';
import { postQuoteRequest } from '@/lib/api';
import { useState } from 'react';
import { RiMapPin2Line, RiPhoneLine, RiMailLine } from 'react-icons/ri';
import Button from '@/components/ui/Button';
import FaqItem from '@/components/shared/FaqItem';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';

// --- Styled Components ---
const PageWrapper = styled.div`
  padding: 80px 20px;
`;

const PageHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 80px auto;
  h1 { font-size: 48px; font-weight: 700; color: ${({ theme }) => theme.colors.text}; margin-bottom: 16px; }
  p { font-size: 18px; color: ${({ theme }) => theme.colors.textSecondary}; line-height: 1.6; }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto 80px auto;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const InfoColumn = styled.div`
  h2 { font-size: 28px; font-weight: 600; color: ${({ theme }) => theme.colors.text}; margin-bottom: 24px; }
`;

const InfoBlock = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  
  svg { font-size: 24px; color: ${({ theme }) => theme.colors.accent}; margin-top: 4px; flex-shrink: 0; }
  
  div {
    h3 { font-size: 18px; font-weight: 600; color: ${({ theme }) => theme.colors.text}; }
    p, a { font-size: 16px; color: ${({ theme }) => theme.colors.textSecondary}; line-height: 1.6; }
    a { 
      text-decoration: none;
      transition: color 0.2s ease;
      &:hover {
        color: ${({ theme }) => theme.colors.accent};
        text-decoration: underline;
      }
    }
  }
`;

const ContactFormWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 40px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  
  h2 { font-size: 28px; font-weight: 600; color: ${({ theme }) => theme.colors.text}; margin-bottom: 24px; }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  input, textarea {
    width: 100%;
    padding: 12px 16px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: inherit;
    font-size: 16px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    
    &::placeholder {
      color: ${({ theme }) => theme.colors.textMuted};
    }

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.accent};
      box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }
`;

const FormError = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.error};
  margin-top: 4px;
`;

const FormSuccess = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.success};
  background-color: rgba(16, 185, 129, 0.1);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid rgba(16, 185, 129, 0.2);
`;

const FaqSection = styled.section`
  max-width: 800px;
  margin: 80px auto 0 auto;
  h2 { font-size: 36px; font-weight: 700; color: ${({ theme }) => theme.colors.text}; text-align: center; margin-bottom: 40px; }
`;

// --- Main Component ---
export default function ContactPage() {
  const t = useTranslations('ContactPage');
  const tFooter = useTranslations('Footer');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
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
      console.error("Failed to submit contact form:", error);
      setFormStatus('error');
    }
  };

  const faqItems = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
  ];

  return (
    <PageWrapper>
      <FadeInWhenVisible>
        <PageHeader>
          <h1>{t('title')}</h1>
          <p>{t('description')}</p>
        </PageHeader>
      </FadeInWhenVisible>

      <ContentGrid>
        <FadeInWhenVisible>
          <InfoColumn>
            <h2>{t('infoTitle')}</h2>
            <InfoBlock>
              <RiMapPin2Line />
              <div><h3>{t('address')}</h3><p>Cửa khẩu Tà Lùng, huyện Phục Hòa, tỉnh Cao Bằng</p></div>
            </InfoBlock>
            <InfoBlock>
              <RiPhoneLine />
              <div><h3>{t('phone')}</h3><p>{t('salesDept')}: +84 123 456 789<br/>{t('opsDept')}: +84 987 654 321</p></div>
            </InfoBlock>
            <InfoBlock>
              <RiMailLine />
              <div><h3>{t('email')}</h3><p><a href="mailto:kinhdoanh@quangminh.vn">kinhdoanh@quangminh.vn</a><br/><a href="mailto:vanhanh@quangminh.vn">vanhanh@quangminh.vn</a></p></div>
            </InfoBlock>
          </InfoColumn>
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          <ContactFormWrapper>
            <h2>{t('formTitle')}</h2>
            {formStatus === 'success' ? (
              <FormSuccess>...</FormSuccess>
            ) : (
              <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div>
                  <input type="text" placeholder={tFooter('formName')} {...register('name')} />
                  {errors.name && <FormError>{errors.name.message}</FormError>}
                </div>
                
                <div>
                  <input type="email" placeholder={tFooter('formEmail')} {...register('email')} />
                  {errors.email && <FormError>{errors.email.message}</FormError>}
                </div>

                <div>
                  <input 
                    type="tel" 
                    placeholder="Số điện thoại của bạn" 
                    {...register('phone')}
                  />
                  {errors.phone && <FormError>{errors.phone.message}</FormError>}
                </div>

                <div>
                  <textarea placeholder={tFooter('formMessage')} {...register('message')} />
                  {errors.message && <FormError>{errors.message.message}</FormError>}
                </div>

                <Button type="submit" disabled={formStatus === 'submitting'}>
                  {formStatus === 'submitting' ? 'Đang gửi...' : tFooter('formSend')}
                </Button>
                {formStatus === 'error' && <FormError>...</FormError>}
              </Form>
            )}
          </ContactFormWrapper>
        </FadeInWhenVisible>
      </ContentGrid>

      <FadeInWhenVisible>
        <FaqSection>
          <h2>{t('faqTitle')}</h2>
          <div>
            {faqItems.map((item, index) => (
              <FaqItem key={index} question={item.q} answer={item.a} />
            ))}
          </div>
        </FaqSection>
      </FadeInWhenVisible>
    </PageWrapper>
  );
}