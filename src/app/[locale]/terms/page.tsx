// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/terms/page.tsx
'use client';

import { useTranslations } from 'next-intl';
import StaticPageLayout from '@/components/shared/StaticPageLayout';

export default function TermsPage() {
  const t = useTranslations('TermsPage');
  
  return (
    <StaticPageLayout 
      title={t('title')}
      lastUpdated={t('lastUpdated')}
      content={t('content')}
    />
  );
}