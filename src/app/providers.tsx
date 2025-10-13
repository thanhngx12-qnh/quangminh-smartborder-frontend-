// dir: ~/quangminh-smart-border/frontend/src/app/providers.tsx
'use client';

import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '@/styles/GlobalStyles';
import { lightTheme } from '@/styles/theme';
import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl'; // <-- Import AbstractIntlMessages
import { SWRConfig } from 'swr';
import { fetcher } from '@/lib/fetcher';

type ProvidersProps = {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages; // <-- SỬA LỖI Ở ĐÂY: Sử dụng kiểu dữ liệu cụ thể
  timeZone: string;
};

export function Providers({ children, locale, messages, timeZone }: ProvidersProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        revalidateOnFocus: false,
      }}
    >
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone={timeZone}
      >
        <ThemeProvider theme={lightTheme}>
          <GlobalStyles />
          {children}
        </ThemeProvider>
      </NextIntlClientProvider>
    </SWRConfig>
  );
}