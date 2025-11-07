// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/careers/[id]/page.tsx
'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '@/navigation';
import { useJobPostingById } from '@/hooks/useCareers';
import { applicationFormSchema, ApplicationFormValues } from '@/lib/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postJobApplication } from '@/lib/api';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import Button from '@/components/ui/Button';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import { RiMapPinLine, RiTimeLine } from 'react-icons/ri';
import ErrorState from '@/components/ui/ErrorState'; // Import component ErrorState
import { useEffect } from 'react';
import parse from 'html-react-parser';

// --- Styled Components ---
const PageWrapper = styled.div`
  padding: 80px 20px;
  background-color: ${({ theme }) => theme.colors.surface};
  min-height: calc(100vh - 88px);
`;

const PageHeader = styled.header`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 40px auto;
  
  h1 { 
    font-size: 42px; 
    font-weight: 700; 
    color: ${({ theme }) => theme.colors.text}; 
    line-height: 1.3; 
  }
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px 32px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 16px;

  span { 
    display: flex; 
    align-items: center; 
    gap: 8px; 
    font-size: 14px;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  align-items: start;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const DescriptionSection = styled.article`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 40px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};

  h2 { 
    font-size: 24px; 
    font-weight: 600; 
    color: ${({ theme }) => theme.colors.text}; 
    margin-bottom: 16px; 
    padding-bottom: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border}; 
  }

  p, li {
    font-size: 16px;
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  p { margin-bottom: 16px; }
  ul, ol { margin: 0 0 16px 20px; }
  li { margin-bottom: 8px; }
`;

const ApplicationFormWrapper = styled.aside`
  position: sticky;
  top: 120px;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 32px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  h2 { 
    font-size: 24px; 
    font-weight: 600; 
    color: ${({ theme }) => theme.colors.text}; 
    margin-bottom: 24px; 
    text-align: center;
  }
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

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px; // Khoảng cách giữa các FormGroup
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px; // Khoảng cách giữa label và input
  
  label {
    font-weight: 500;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text};
  }

  // Style chung cho các input text, email, tel và textarea
  input:not([type='file']),
  textarea {
    width: 100%;
    padding: 10px 14px;
    border-radius: 8px;
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
      box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15); // Tăng độ mờ cho đẹp hơn
    }

    &[aria-invalid="true"] {
        border-color: ${({ theme }) => theme.colors.error};
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }
  
  // Style riêng cho input[type="file"]
  input[type="file"] {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textSecondary};

    // Tùy chỉnh nút "Choose File"
    &::file-selector-button {
      padding: 8px 12px;
      margin-right: 12px;
      border-radius: 6px;
      border: 1px solid ${({ theme }) => theme.colors.border};
      background-color: ${({ theme }) => theme.colors.surface};
      color: ${({ theme }) => theme.colors.text};
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: ${({ theme }) => theme.colors.border};
      }
    }
  }
`;
const FormError = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.error};
`;

// --- Main Component ---
interface CareerDetailPageProps {
  params: { id: string };
}

export default function CareerDetailPage({ params }: CareerDetailPageProps) {
  const t = useTranslations('CareerDetailPage');
  const t_errors = useTranslations('Errors');
  const t_careers_page = useTranslations('CareersPage');
  const locale = useLocale();
  const router = useRouter();
  const jobId = parseInt(params.id, 10);
  const { jobPosting, isLoading, isError } = useJobPostingById(jobId);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const t_meta = useTranslations('Metadata');

  useEffect(() => {
    if (jobPosting) {
      document.title = t_meta('careerTitle', { jobTitle: jobPosting.title });

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        const description = jobPosting.description.substring(0, 155).replace(/\s+/g, ' ').trim() + '...';
        metaDesc.setAttribute('content', description);
      }
    }
    return () => {
      document.title = t_meta('defaultTitle');
    };
  }, [jobPosting, t_meta]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
  });

  const onSubmit = async (data: ApplicationFormValues) => {
    setFormStatus('submitting');
    const formData = new FormData();
    formData.append('applicantName', data.applicantName);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    if (data.cv && data.cv.length > 0) {
      formData.append('cv', data.cv[0]);
    }

    try {
      await postJobApplication(jobId, formData);
      setFormStatus('success');
      reset();
    } catch (error) {
      console.error("Application submission failed:", error);
      setFormStatus('error');
      alert(t('applyError'));
    } finally {
      if (formStatus === 'submitting') {
          setFormStatus('idle');
      }
    }
  };

  if (isLoading) return <LoadingState>Loading job details...</LoadingState>;

  if (isError || !jobPosting) {
    return (
      <ErrorState 
        title={t('notFoundTitle')}
        description={t('notFoundDescription')}
        actionText={t_errors('goBackTo', { pageName: t_careers_page('title') })}
        onAction={() => router.push('/careers' as never)} 
      />
    );
  }
  
  return (
    <PageWrapper>
      <FadeInWhenVisible>
        <PageHeader>
          <h1>{jobPosting.title}</h1>
          <MetaInfo>
            <span><RiMapPinLine /> {jobPosting.location}</span>
            <span><RiTimeLine /> {new Date(jobPosting.createdAt).toLocaleDateString(locale)}</span>
          </MetaInfo>
        </PageHeader>
      </FadeInWhenVisible>

      <ContentGrid>
        <FadeInWhenVisible>
          <DescriptionSection>
            <h2>{t('jobDescription')}</h2>
            {parse(jobPosting.description || '<p>No content available.</p>')}
            <h2 style={{ marginTop: '40px' }}>{t('requirements')}</h2>
            {parse(jobPosting.requirements || '<p>No content available.</p>')}
          </DescriptionSection>
        </FadeInWhenVisible>
        
        <FadeInWhenVisible>
          <ApplicationFormWrapper>
            <h2>{t('applyTitle')}</h2>
            {formStatus === 'success' ? (
              <FormSuccess role="status">{t('applySuccess')}</FormSuccess>
            ) : (
              <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <FormGroup>
                  <label htmlFor="applicantName">{t('form.nameLabel')}</label>
                  <input id="applicantName" type="text" {...register('applicantName')} aria-invalid={!!errors.applicantName} />
                  {errors.applicantName && <FormError role="alert">{errors.applicantName.message}</FormError>}
                </FormGroup>

                <FormGroup>
                  <label htmlFor="email">{t('form.emailLabel')}</label>
                  <input id="email" type="email" {...register('email')} aria-invalid={!!errors.email}/>
                  {errors.email && <FormError role="alert">{errors.email.message}</FormError>}
                </FormGroup>

                <FormGroup>
                  <label htmlFor="phone">{t('form.phoneLabel')}</label>
                  <input id="phone" type="tel" {...register('phone')} aria-invalid={!!errors.phone}/>
                  {errors.phone && <FormError role="alert">{errors.phone.message}</FormError>}
                </FormGroup>
                
                <FormGroup>
                  <label htmlFor="cv">{t('form.cvLabel')}</label>
                  <input id="cv" type="file" accept=".pdf,.doc,.docx" {...register('cv')} aria-invalid={!!errors.cv}/>
                  {errors.cv && <FormError role="alert">{errors.cv.message as string}</FormError>}
                </FormGroup>

                <Button type="submit" disabled={formStatus === 'submitting'} style={{width: '100%', marginTop: '16px'}}>
                  {formStatus === 'submitting' ? t('form.submittingButton') : t('form.submitButton')}
                </Button>
                {formStatus === 'error' && <FormError role="alert" style={{textAlign: 'center'}}>Đã có lỗi xảy ra. Vui lòng thử lại sau.</FormError>}
              </Form>
            )}
          </ApplicationFormWrapper>
        </FadeInWhenVisible>
      </ContentGrid>
    </PageWrapper>
  );
}