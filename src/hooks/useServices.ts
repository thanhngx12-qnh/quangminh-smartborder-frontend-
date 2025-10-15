import useSWR from 'swr';
import { Service } from '@/types';
import { PaginatedResult } from '@/types';

export type PaginatedServiceResult = PaginatedResult<Service>;

export function useFeaturedServices(locale: string) {
  const { data, error, isLoading } = useSWR<PaginatedServiceResult>([
    '/services', 
    { featured: true, locale, limit: 6 } // Chỉ lấy tối đa 6 dịch vụ nổi bật
  ]);

  return {
    services: data?.data, 
    isLoading,
    isError: error,
  };
}


export function useAllServices(locale: string, page: number) {
  const { data, error, isLoading } = useSWR<PaginatedServiceResult>([
    '/services', 
    { locale, page, limit: 9 } // Lấy 9 dịch vụ mỗi trang
  ]);

  return {
    result: data, // Trả về toàn bộ object kết quả
    isLoading,
    isError: error,
  };
}

export function useServiceBySlug(slug: string, locale: string) {
  const key = slug && locale ? [`/services/slug/${locale}/${slug}`, {}] : null;
  const { data, error, isLoading } = useSWR<Service>(key);

  return {
    service: data,
    isLoading,
    isError: error,
  };
} 