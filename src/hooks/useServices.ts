// // dir: ~/quangminh-smart-border/frontend/src/hooks/useServices.ts
// import useSWR from 'swr';
// import { Service } from '@/types';

// export function useFeaturedServices(locale: string) {
//   // Key của SWR giờ là một mảng: [endpoint, params object]
//   // Điều này đảm bảo URL gọi đi luôn là /services
//   const { data, error, isLoading } = useSWR<Service[]>(['/services', { featured: true, locale }]);

//   return {
//     services: data,
//     isLoading,
//     isError: error,
//   };
// }

// dir: ~/quangminh-smart-border/frontend/src/hooks/useServices.ts
import useSWR from 'swr';
import { Service } from '@/types';

export function useFeaturedServices(locale: string) {
  const { data, error, isLoading } = useSWR<Service[]>(['/services', { featured: true, locale }]);

  return {
    services: data,
    isLoading,
    isError: error,
  };
}

// THÊM HOOK MỚI Ở ĐÂY
export function useAllServices(locale: string) {
  // Key của SWR chỉ cần endpoint và locale
  const { data, error, isLoading } = useSWR<Service[]>(['/services', { locale }]);

  return {
    services: data,
    isLoading,
    isError: error,
  };
}

export function useServiceBySlug(slug: string, locale: string) {
  // SỬA LẠI KEY Ở ĐÂY
  // Truyền một object params rỗng để khớp với fetcher
  const key = slug && locale ? [`/services/slug/${locale}/${slug}`, {}] : null;
  const { data, error, isLoading } = useSWR<Service>(key);

  return {
    service: data,
    isLoading,
    isError: error,
  };
} 