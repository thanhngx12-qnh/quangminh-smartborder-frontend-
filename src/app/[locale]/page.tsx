// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/page.tsx
'use client'; // <-- Bắt buộc phải có ở đây

import { useTranslations } from 'next-intl';
import styled from 'styled-components';

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 3rem;
`;

export default function Home() {
  const t = useTranslations('Navigation');
  return (
    <main style={{ padding: '2rem' }}>
      <Title>{t('services')}</Title>
      <p>Welcome to Quang Minh Smart Border Frontend!</p>
    </main>
  );
}