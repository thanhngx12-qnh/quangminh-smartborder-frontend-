// dir: frontend/src/app/[locale]/privacy/page.tsx
'use client';

import { useTranslations } from 'next-intl';
import StaticPageLayout from '@/components/shared/StaticPageLayout';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';

export default function PrivacyPage() {
  const t = useTranslations('PrivacyPage');
  
  return (
    <FadeInWhenVisible>
      <StaticPageLayout 
        title={t('title')}
        lastUpdated={t('lastUpdated')}
        content={t('content')}
      />
    </FadeInWhenVisible>
  );
}