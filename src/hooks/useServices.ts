// dir: ~/quangminh-smart-border/frontend/src/hooks/useServices.ts
import useSWR from 'swr';
import { Service } from '@/types'; // Import kiểu dữ liệu

export function useFeaturedServices(locale: string) {
  // Key của SWR: endpoint API
  // SWR sẽ tự động gọi fetcher với key này
  const { data, error, isLoading } = useSWR<Service[]>(`/services?featured=true&locale=${locale}`);

  return {
    services: data,
    isLoading,
    isError: error,
  };
}

// Có thể tạo thêm các hook khác ở đây
// export function useAllServices(locale: string) { ... }
// export function useServiceBySlug(slug: string, locale: string) { ... }