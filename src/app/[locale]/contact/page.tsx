// dir: frontend/src/app/[locale]/contact/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import styled, { useTheme } from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormValues } from '@/lib/schemas';
import { postQuoteRequest } from '@/lib/api';
import { useAllServices } from '@/hooks/useServices';
import Select, { StylesConfig } from 'react-select';
import { 
  RiMapPin2Line, RiPhoneLine, RiMailLine, RiQuestionAnswerLine,
  RiUser3Line, RiSmartphoneLine, RiMessage2Line, RiServiceLine
} from 'react-icons/ri';
import Button from '@/components/ui/Button';
import FaqItem from '@/components/shared/FaqItem';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import { sendGTMEvent } from '@next/third-parties/google';

// --- Styled Components ---
const PageWrapper = styled.div` padding: 80px 20px; background-color: ${({ theme }) => theme.colors.background}; min-height: 100vh; `;
const Container = styled.div` max-width: 1200px; margin: 0 auto; `;
const PageHeader = styled.div` text-align: center; max-width: 800px; margin: 0 auto 60px auto; h1 { font-family: ${({ theme }) => theme.fonts.heading}; font-size: clamp(32px, 5vw, 48px); font-weight: 700; color: ${({ theme }) => theme.colors.primary}; margin-bottom: 16px; } p { font-size: 18px; color: ${({ theme }) => theme.colors.textSecondary}; line-height: 1.6; } `;
const ContentGrid = styled.div` display: grid; grid-template-columns: 1fr 1.2fr; gap: 60px; align-items: start; @media (max-width: 992px) { grid-template-columns: 1fr; gap: 40px; } `;
const InfoColumn = styled.div` display: flex; flex-direction: column; gap: 40px; `;
const InfoGroup = styled.div` h2 { font-family: ${({ theme }) => theme.fonts.heading}; font-size: 20px; font-weight: 700; color: ${({ theme }) => theme.colors.text}; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; svg { color: ${({ theme }) => theme.colors.accent}; font-size: 24px; } } `;
const InfoItem = styled.div` margin-bottom: 16px; padding-left: 34px; strong { display: block; color: ${({ theme }) => theme.colors.primary}; font-weight: 600; margin-bottom: 4px; text-transform: uppercase; } p, a { font-size: 16px; color: ${({ theme }) => theme.colors.textSecondary}; line-height: 1.6; text-decoration: none; } a:hover { color: ${({ theme }) => theme.colors.accent}; text-decoration: underline; } `;
const ContactFormWrapper = styled.div` background-color: ${({ theme }) => theme.colors.surface}; padding: 40px; border-radius: 16px; border: 1px solid ${({ theme }) => theme.colors.border}; box-shadow: ${({ theme }) => theme.shadows.card}; h2 { font-family: ${({ theme }) => theme.fonts.heading}; font-size: 24px; font-weight: 700; color: ${({ theme }) => theme.colors.primary}; margin-bottom: 24px; text-align: center; text-transform: uppercase; } `;
const Form = styled.form` display: flex; flex-direction: column; gap: 20px; `;
const FormGroup = styled.div` display: flex; flex-direction: column; gap: 8px; label { font-weight: 600; font-size: 14px; color: ${({ theme }) => theme.colors.text}; .required { color: ${({ theme }) => theme.colors.error}; margin-left: 4px; } } `;
const InputWrapper = styled.div` position: relative; .input-icon { position: absolute; top: 50%; left: 14px; transform: translateY(-50%); font-size: 20px; color: ${({ theme }) => theme.colors.textMuted}; pointer-events: none; transition: color 0.2s ease; z-index: 1; } &:focus-within .input-icon { color: ${({ theme }) => theme.colors.accent}; } input, textarea { width: 100%; padding: 12px 16px 12px 46px; border-radius: 8px; border: 1px solid ${({ theme }) => theme.colors.border}; background-color: ${({ theme }) => theme.colors.background}; color: ${({ theme }) => theme.colors.text}; font-size: 15px; transition: all 0.2s ease; &::placeholder { color: ${({ theme }) => theme.colors.textMuted}; } &:focus { outline: none; border-color: ${({ theme }) => theme.colors.accent}; box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.1); } &[aria-invalid="true"] { border-color: ${({ theme }) => theme.colors.error}; } } textarea { min-height: 120px; resize: vertical; padding-top: 14px; & + .input-icon { top: 20px; transform: none; } } `;
const FormError = styled.span` font-size: 13px; color: ${({ theme }) => theme.colors.error}; margin-top: 4px; display: block; `;
const FormSuccess = styled.div` padding: 30px; background-color: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; color: ${({ theme }) => theme.colors.success}; text-align: center; h3 { font-size: 20px; margin-bottom: 8px; font-weight: 700; } `;
const BottomSection = styled.div` margin-top: 80px; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; @media (max-width: 992px) { grid-template-columns: 1fr; } `;
const MapContainer = styled.div` height: 400px; border-radius: 16px; overflow: hidden; box-shadow: ${({ theme }) => theme.shadows.md}; iframe { width: 100%; height: 100%; border: 0; } `;

type SelectOption = { value: string; label: string };

export default function ContactPage() {
  const t = useTranslations('ContactPage');
  const tFooter = useTranslations('Footer'); 
  const locale = useLocale();
  const searchParams = useSearchParams();
  const theme = useTheme();

  const { result: servicesResult } = useAllServices(locale, 1, 100);
  const initialServiceId = searchParams.get('serviceId');

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const {
    register, handleSubmit, formState: { errors }, reset, control
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { serviceId: initialServiceId || '' }
  });
  
  const onSubmit = async (data: ContactFormValues) => {
    setFormStatus('submitting');
    try {
      await postQuoteRequest(data);
      setFormStatus('success');
      reset();
      sendGTMEvent({ event: 'generate_lead', form_name: 'contact_page_form', lead_service_id: data.serviceId || 'none' });
    } catch (error) {
      console.error("Failed:", error);
      setFormStatus('error');
    }
  };

  // NÂNG CẤP V3.0: Lấy nhãn dịch vụ chuẩn ngôn ngữ
  const serviceOptions = useMemo(() => {
    return servicesResult?.data.map(service => {
      const trans = service.translations?.find(t => t.locale === locale) || service.translations?.[0];
      return { value: service.id.toString(), label: trans?.title || 'Service' };
    }) || [];
  }, [servicesResult, locale]);

  const customSelectStyles: StylesConfig<SelectOption, false> = {
    control: (provided, state) => ({ ...provided, backgroundColor: theme.colors.background, borderColor: state.isFocused ? theme.colors.accent : theme.colors.border, boxShadow: state.isFocused ? `0 0 0 3px rgba(255, 0, 0, 0.1)` : 'none', '&:hover': { borderColor: theme.colors.accent }, padding: '4px 4px 4px 44px', borderRadius: '8px', minHeight: '48px', }),
    singleValue: (provided) => ({ ...provided, color: theme.colors.text }),
    input: (provided) => ({ ...provided, color: theme.colors.text }),
    placeholder: (provided) => ({ ...provided, color: theme.colors.textMuted }),
    menu: (provided) => ({ ...provided, zIndex: 9999, backgroundColor: theme.colors.background, border: `1px solid ${theme.colors.border}`, }),
    option: (provided, state) => ({ ...provided, backgroundColor: state.isSelected ? theme.colors.accent : (state.isFocused ? theme.colors.surfaceAlt : 'transparent'), color: state.isSelected ? theme.colors.white : theme.colors.text, cursor: 'pointer', }),
  };

  const faqItems = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
  ];

  return (
    <PageWrapper>
      <Container>
        <FadeInWhenVisible>
          <PageHeader>
            <h1>{t('title')}</h1>
            <p>{t('description')}</p>
          </PageHeader>
        </FadeInWhenVisible>

        <ContentGrid>
          <FadeInWhenVisible>
            <InfoColumn>
              <InfoGroup>
                <h2><RiMapPin2Line /> {t('address')}</h2>
                <InfoItem>
                  <strong>{t('offices.caobang.name', { defaultMessage: 'VP CAO BẰNG (TRỤ SỞ)' })}</strong>
                  <p>{t('offices.caobang', { defaultMessage: 'Cửa khẩu Quốc tế Tà Lùng, xã Phục Hoà, tỉnh Cao Bằng' })}</p>
                </InfoItem>
                <InfoItem>
                  <strong>{t('offices.halong.name', { defaultMessage: 'VP HẠ LONG' })}</strong>
                  <p>{t('offices.halong', { defaultMessage: 'Số 29 Lê Duẩn, Bãi Cháy, Quảng Ninh' })}</p>
                </InfoItem>
              </InfoGroup>

              <InfoGroup>
                <h2><RiPhoneLine /> {t('phone')}</h2>
                <InfoItem>
                  <strong>HOTLINE:</strong>
                  <a href="tel:0963320335" onClick={() => sendGTMEvent({ event: 'contact_click', contact_method: 'hotline_call' })}>0963.320.335</a>
                </InfoItem>
              </InfoGroup>

              <InfoGroup>
                <h2><RiMailLine /> {t('email')}</h2>
                <InfoItem>
                  <strong>EMAIL:</strong>
                  <a href="mailto:info@talunglogistics.com" onClick={() => sendGTMEvent({ event: 'contact_click', contact_method: 'email_send' })}>info@talunglogistics.com</a>
                </InfoItem>
              </InfoGroup>
            </InfoColumn>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.2}>
            <ContactFormWrapper>
              <h2>{t('formTitle')}</h2>
              {formStatus === 'success' ? (
                <FormSuccess>
                  <h3>{t('formSuccessTitle')}</h3>
                  <p>{t('formSuccessDesc')}</p>
                  <Button onClick={() => setFormStatus('idle')} variant="outline" size="small" style={{marginTop: 16}}>{t('formReset')}</Button>
                </FormSuccess>
              ) : (
                <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <FormGroup>
                    <label htmlFor="name">{tFooter('formName')} <span className="required">*</span></label>
                    <InputWrapper>
                      <RiUser3Line className="input-icon" />
                      <input id="name" type="text" {...register('name')} placeholder="Nguyễn Văn A" aria-invalid={!!errors.name} />
                    </InputWrapper>
                    {errors.name && <FormError>{errors.name.message}</FormError>}
                  </FormGroup>
                  
                  <FormGroup>
                    <label htmlFor="email">{tFooter('formEmail')} <span className="required">*</span></label>
                    <InputWrapper>
                      <RiMailLine className="input-icon" />
                      <input id="email" type="email" {...register('email')} placeholder="email@example.com" aria-invalid={!!errors.email} />
                    </InputWrapper>
                    {errors.email && <FormError>{errors.email.message}</FormError>}
                  </FormGroup>
                  
                  <FormGroup>
                    <label htmlFor="phone">{tFooter('formPhone')} <span className="required">*</span></label>
                    <InputWrapper>
                      <RiSmartphoneLine className="input-icon" />
                      <input id="phone" type="tel" {...register('phone')} placeholder="09xxxxxxxxx" aria-invalid={!!errors.phone} />
                    </InputWrapper>
                    {errors.phone && <FormError>{errors.phone.message}</FormError>}
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="serviceId">{tFooter('formServiceId')}</label>
                    <InputWrapper>
                      <RiServiceLine className="input-icon" style={{ zIndex: 2 }} />
                      <Controller
                        name="serviceId"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            instanceId="service-select"
                            options={serviceOptions}
                            placeholder={t('selectPlaceholder')}
                            noOptionsMessage={() => t('noOptions')}
                            isClearable
                            styles={customSelectStyles}
                            value={serviceOptions.find(c => c.value === field.value) || null}
                            onChange={val => field.onChange(val ? val.value : '')}
                          />
                        )}
                      />
                    </InputWrapper>
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="message">{tFooter('formMessage')} <span className="required">*</span></label>
                    <InputWrapper>
                      <RiMessage2Line className="input-icon" style={{ top: '22px', transform: 'none' }} />
                      <textarea id="message" {...register('message')} placeholder="..." aria-invalid={!!errors.message} />
                    </InputWrapper>
                    {errors.message && <FormError>{errors.message.message}</FormError>}
                  </FormGroup>
                  
                  <Button type="submit" variant="primary" size="large" disabled={formStatus === 'submitting'} $fullWidth>
                    {formStatus === 'submitting' ? '...' : tFooter('formSend')}
                  </Button>
                </Form>
              )}
            </ContactFormWrapper>
          </FadeInWhenVisible>
        </ContentGrid>

        <BottomSection>
          <FadeInWhenVisible>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: theme.colors.primary, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                <RiQuestionAnswerLine /> {t('faqTitle')}
              </h2>
              {faqItems.map((item, index) => (
                <FaqItem key={index} question={item.q} answer={item.a} />
              ))}
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.2}>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: theme.colors.primary, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                <RiMapPin2Line /> {t('mapTitle')}
              </h2>
              <MapContainer>
                <iframe src="https://maps.google.com/maps?q=22.477244,106.582163&t=k&z=16&ie=UTF8&iwloc=&output=embed" loading="lazy" title="Map" allowFullScreen></iframe>
              </MapContainer>
            </div>
          </FadeInWhenVisible>
        </BottomSection>
      </Container>
    </PageWrapper>
  );
}