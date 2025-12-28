// dir: frontend/src/app/[locale]/terms/page.tsx
'use client';

import { useTranslations } from 'next-intl';
import StaticPageLayout from '@/components/shared/StaticPageLayout';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';

export default function TermsPage() {
  const t = useTranslations('TermsPage');
  
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