// dir: ~/quangminh-smart-border/frontend/src/i18n.ts
import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({locale}) => {
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});