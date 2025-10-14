// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/not-found.tsx
'use client';

import styled from 'styled-components';
import { useTranslations } from 'next-intl';
import { ButtonLink } from '@/components/ui/Button';

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: calc(100vh - 200px); // Chiều cao màn hình trừ đi Header/Footer
  padding: 40px 20px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const Title = styled.h1`
  font-size: 80px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  line-height: 1;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 16px;
`;

const Description = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 500px;
  margin-top: 8px;
  margin-bottom: 32px;
`;

export default function NotFoundPage() {
  const t = useTranslations('NotFound');

  return (
    <NotFoundWrapper>
      <Title>404</Title>
      <Subtitle>{t('title')}</Subtitle>
      <Description>{t('description')}</Description>
      <ButtonLink href="/" variant="primary" as="a">
        {t('goHome')}
      </ButtonLink>
    </NotFoundWrapper>
  );
}