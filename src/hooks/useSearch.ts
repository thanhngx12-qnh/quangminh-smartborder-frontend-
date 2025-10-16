// dir: ~/quangminh-smart-border/frontend/src/hooks/useSearch.ts
import useSWR from 'swr';
import { Service, News } from '@/types';

// "Hợp đồng dữ liệu" cho kết quả tìm kiếm từ backend
interface SearchResult {
  services: Service[];
  news: News[];
}

export function useSearch(query: string, locale: string) {
  // Chỉ thực hiện fetch khi query có ít nhất 2 ký tự
  const shouldFetch = query && query.trim().length >= 2;
  
  const { data, error, isLoading } = useSWR<SearchResult>(
    // Nếu `shouldFetch` là false, key sẽ là `null` và SWR sẽ không gọi API
    shouldFetch ? ['/search', { q: query, locale }] : null
  );

  return {
    results: data,
    isLoading,
    isError: error,
  };
}