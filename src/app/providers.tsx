// dir: ~/quangminh-smart-border/frontend/src/app/providers.tsx
'use client';

import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '@/styles/GlobalStyles';
import { lightTheme } from '@/styles/theme';
import { NextIntlClientProvider } from 'next-intl';

type ProvidersProps = {
  children: React.ReactNode;
  locale: string;
  messages: any;
};

export function Providers({ children, locale, messages }: ProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}