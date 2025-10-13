// dir: ~/quangminh-smart-border/frontend/src/hooks/useServices.ts
import useSWR from 'swr';
import { Service } from '@/types';

export function useFeaturedServices(locale: string) {
  // Key của SWR giờ là một mảng: [endpoint, params object]
  // Điều này đảm bảo URL gọi đi luôn là /services
  const { data, error, isLoading } = useSWR<Service[]>(['/services', { featured: true, locale }]);

  return {
    services: data,
    isLoading,
    isError: error,
  };
}