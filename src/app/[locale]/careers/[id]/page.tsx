// dir: frontend/src/app/[locale]/careers/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '@/navigation';
import { useParams } from 'next/navigation'; // Dùng useParams an toàn hơn cho Client Component
import { useJobPostingById } from '@/hooks/useCareers';
import { applicationFormSchema, ApplicationFormValues } from '@/lib/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postJobApplication } from '@/lib/api';
import styled from 'styled-components';
import parse from 'html-react-parser'; // Import parser HTML

import Button, { ButtonLink } from '@/components/ui/Button';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import { RiMapPinLine, RiTimeLine, RiArrowLeftLine, RiUploadCloud2Line } from 'react-icons/ri';
import ErrorState from '@/components/ui/ErrorState';
import ArticlePageSkeleton from '@/components/skeletons/ArticlePageSkeleton'; // Tận dụng Skeleton bài viết

// --- Styled Components ---

const PageWrapper = styled.div`
  padding: 80px 20px;
  background-color: ${({ theme }) => theme.colors.surfaceAlt}; // Nền xám nhẹ làm nổi bật nội dung trắng
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const BackButtonWrapper = styled.div`
  margin-bottom: 30px;
`;

const PageHeader = styled.header`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 50px auto;
  
  h1 { 
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: clamp(28px, 4vw, 42px); 
    font-weight: 700; 
    color: ${({ theme }) => theme.colors.primary}; 
    line-height: 1.3; 
    margin-bottom: 16px;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  color: ${({ theme }) => theme.colors.textSecondary};

  span { 
    display: flex; 
    align-items: center; 
    gap: 8px; 
    font-size: 15px;
    font-weight: 500;
    
    svg { color: ${({ theme }) => theme.colors.accent}; }
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); // Cột nội dung gấp đôi cột form
  align-items: start;
  gap: 40px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

// Wrapper đặc biệt để style cho HTML từ TinyMCE
const RichTextWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 40px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.card};

  // --- Reset & Style cho nội dung HTML thô ---
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  line-height: 1.8;

  h2, h3, h4 {
    font-family: ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.primary};
    margin-top: 32px;
    margin-bottom: 16px;
    font-weight: 700;
  }

  h2 { font-size: 24px; border-bottom: 2px solid ${({ theme }) => theme.colors.border}; padding-bottom: 10px; }
  h3 { font-size: 20px; }

  p { margin-bottom: 16px; }

  ul, ol {
    margin-bottom: 20px;
    padding-left: 24px;
    
    li {
      margin-bottom: 8px;
      &::marker { color: ${({ theme }) => theme.colors.accent}; font-weight: bold; }
    }
  }

  strong { color: ${({ theme }) => theme.colors.primary}; font-weight: 700; }
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 20px 0;
  }

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Sidebar = styled.aside`
  position: sticky;
  top: 100px; // Sticky khi cuộn
  background-color: ${({ theme }) => theme.colors.background};
  padding: 32px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.lg}; // Shadow đậm hơn để nổi bật
  z-index: 10;

  @media (max-width: 992px) {
    position: static; // Tắt sticky trên mobile
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  label {
    font-weight: 600;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text};
  }

  input[type="text"],
  input[type="email"],
  input[type="tel"] {
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.surfaceAlt};
    font-size: 15px;
    transition: all 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.accent};
      background-color: ${({ theme }) => theme.colors.background};
      box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.1);
    }
  }
`;

// Custom File Input Styling
const FileInputWrapper = styled.div`
  position: relative;
  
  input[type="file"] {
    display: none; // Ẩn input gốc
  }

  label.file-label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 20px;
    border: 2px dashed ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.surfaceAlt};
    color: ${({ theme }) => theme.colors.textSecondary};
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
    font-size: 14px;

    &:hover {
      border-color: ${({ theme }) => theme.colors.accent};
      color: ${({ theme }) => theme.colors.accent};
      background-color: rgba(255, 0, 0, 0.05);
    }

    svg { font-size: 24px; }
  }
`;

const FormError = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.error};
  margin-top: 4px;
`;

const FormSuccess = styled.div`
  padding: 24px;
  background-color: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.success};
  text-align: center;
  font-weight: 500;
`;

// --- Main Component ---

// Props rỗng vì ta dùng useParams()
export default function CareerDetailPage() {
  const t = useTranslations('CareerDetailPage');
  const tCommon = useTranslations('General');
  const locale = useLocale();
  const router = useRouter();
  
  // Dùng useParams để lấy ID an toàn cho Client Component
  const params = useParams();
  const idParam = params?.id;
  const jobId = idParam ? parseInt(Array.isArray(idParam) ? idParam[0] : idParam, 10) : 0;

  const { jobPosting, isLoading, isError } = useJobPostingById(jobId);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  // State để hiển thị tên file đã chọn
  const [fileName, setFileName] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
  });

  // Theo dõi file input để update UI
  const fileValue = watch('cv');
  useEffect(() => {
    if (fileValue && fileValue.length > 0) {
      setFileName(fileValue[0].name);
    }
  }, [fileValue]);

  // Set Title SEO
  useEffect(() => {
    if (jobPosting) document.title = `${jobPosting.title} - Phú Anh Logistics`;
  }, [jobPosting]);

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
      setFileName(null);
    } catch (error) {
      console.error("Submission failed:", error);
      setFormStatus('error');
    }
  };

  if (isLoading) return <ArticlePageSkeleton />;

  if (isError || !jobPosting) {
    return (
      <ErrorState 
        title={t('notFoundTitle')}
        description={t('notFoundDescription')}
        actionText="Quay lại danh sách"
        fullScreen
      />
    );
  }
  
  return (
    <PageWrapper>
      <Container>
        <BackButtonWrapper>
          <ButtonLink href="/careers" variant="ghost" size="small" as="a">
            <RiArrowLeftLine style={{ marginRight: 8 }} /> Quay lại tuyển dụng
          </ButtonLink>
        </BackButtonWrapper>

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
          {/* Cột trái: Nội dung mô tả (HTML từ TinyMCE) */}
          <FadeInWhenVisible delay={0.1}>
            <RichTextWrapper>
              <SectionTitle>{t('jobDescription')}</SectionTitle>
              {/* Dùng html-react-parser để render HTML an toàn */}
              <div>{parse(jobPosting.description || '')}</div>
              
              <div style={{ margin: '40px 0', borderTop: '1px dashed #ddd' }} />
              
              <SectionTitle>{t('requirements')}</SectionTitle>
              <div>{parse(jobPosting.requirements || '')}</div>
            </RichTextWrapper>
          </FadeInWhenVisible>
          
          {/* Cột phải: Form Ứng tuyển (Sticky) */}
          <FadeInWhenVisible delay={0.2}>
            <Sidebar>
              <SectionTitle style={{ textAlign: 'center' }}>{t('applyTitle')}</SectionTitle>
              
              {formStatus === 'success' ? (
                <FormSuccess>
                  <h3>{t('applySuccess')}</h3>
                  <p style={{ marginTop: 10, fontSize: 14 }}>Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.</p>
                  <Button onClick={() => setFormStatus('idle')} variant="outline" size="small" style={{ marginTop: 20 }}>
                    Nộp đơn khác
                  </Button>
                </FormSuccess>
              ) : (
                <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <FormGroup>
                    <label htmlFor="applicantName">{t('form.nameLabel')}</label>
                    <input id="applicantName" type="text" {...register('applicantName')} placeholder="Nguyễn Văn A" />
                    {errors.applicantName && <FormError>{errors.applicantName.message}</FormError>}
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="email">{t('form.emailLabel')}</label>
                    <input id="email" type="email" {...register('email')} placeholder="email@example.com"/>
                    {errors.email && <FormError>{errors.email.message}</FormError>}
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="phone">{t('form.phoneLabel')}</label>
                    <input id="phone" type="tel" {...register('phone')} placeholder="09xxxxxxxxx"/>
                    {errors.phone && <FormError>{errors.phone.message}</FormError>}
                  </FormGroup>
                  
                  <FormGroup>
                    <label>{t('form.cvLabel')}</label>
                    <FileInputWrapper>
                      <input id="cv" type="file" accept=".pdf,.doc,.docx" {...register('cv')} />
                      <label htmlFor="cv" className="file-label">
                        <RiUploadCloud2Line />
                        <span>{fileName || "Click để tải lên CV (PDF/DOC)"}</span>
                      </label>
                    </FileInputWrapper>
                    {errors.cv && <FormError>{errors.cv.message as string}</FormError>}
                  </FormGroup>

                  <Button type="submit" variant="primary" size="large" disabled={formStatus === 'submitting'} $fullWidth>
                    {formStatus === 'submitting' ? t('form.submittingButton') : t('form.submitButton')}
                  </Button>
                  
                  {formStatus === 'error' && (
                    <FormError style={{textAlign: 'center', marginTop: 10}}>
                      Có lỗi xảy ra. Vui lòng kiểm tra lại.
                    </FormError>
                  )}
                </Form>
              )}
            </Sidebar>
          </FadeInWhenVisible>
        </ContentGrid>
      </Container>
    </PageWrapper>
  );
}