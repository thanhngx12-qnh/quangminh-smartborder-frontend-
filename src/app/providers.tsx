// dir: ~/quangminh-smart-border/frontend/src/app/providers.tsx
'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '@/styles/GlobalStyles';
import { lightTheme, darkTheme } from '@/styles/theme';
import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';
import { SWRConfig } from 'swr';
import { fetcher } from '@/lib/fetcher';
import { useUIStore } from '@/hooks/useUIStore';

type ProvidersProps = {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
  timeZone: string;
};

export function Providers({ children, locale, messages, timeZone }: ProvidersProps) {
  const theme = useUIStore((state) => state.theme);
  
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // SỬA LỖI Ở ĐÂY:
  // Luôn sử dụng một theme mặc định (lightTheme) cho lần render trên server.
  // Khi client render, nó sẽ chuyển sang theme đúng từ store.
  const currentTheme = isClient && theme === 'dark' ? darkTheme : lightTheme;

  return (
    <SWRConfig value={{ fetcher, revalidateOnFocus: false }}>
      <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
        {/* 
          Luôn bọc ThemeProvider ở ngoài.
          GlobalStyles sẽ luôn nhận được một theme hợp lệ.
        */}
        <ThemeProvider theme={currentTheme}>
          <GlobalStyles />
          {children}
        </ThemeProvider>
      </NextIntlClientProvider>
    </SWRConfig>
  );
}