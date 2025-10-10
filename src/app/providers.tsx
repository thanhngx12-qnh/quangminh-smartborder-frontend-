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
  timeZone: string; // <-- Thêm prop timeZone
};

export function Providers({ children, locale, messages, timeZone }: ProvidersProps) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={timeZone} // <-- Cung cấp timeZone cho provider
    >
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}