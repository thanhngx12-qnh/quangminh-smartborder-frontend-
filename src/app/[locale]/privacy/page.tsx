// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/privacy/page.tsx
'use client';

import { useTranslations } from 'next-intl';
import StaticPageLayout from '@/components/shared/StaticPageLayout';

export default function PrivacyPage() {
  const t = useTranslations('PrivacyPage');
  
  return (
    <StaticPageLayout 
      title={t('title')}
      lastUpdated={t('lastUpdated')}
      content={t('content')}
    />
  );
}