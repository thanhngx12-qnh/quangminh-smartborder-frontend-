// dir: ~/quangminh-smart-border/frontend/src/hooks/useNews.ts
import useSWR from 'swr';
import { News } from '@/types';

interface PaginatedNewsResult {
  data: News[];
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}

export function useLatestNews(locale: string) {
  // API endpoint để lấy các bài viết đã PUBLISHED
  // Giả sử chúng ta muốn lấy 3 bài mới nhất
  const { data, error, isLoading } = useSWR<News[]>(['/news', { locale, status: 'PUBLISHED', _limit: 3 }]);

  return {
    news: data,
    isLoading,
    isError: error,
  };
}

export function usePaginatedNews(locale: string, page: number) {
  const { data, error, isLoading } = useSWR<PaginatedNewsResult>([
    '/news', 
    { locale, status: 'PUBLISHED', page, limit: 9 }
  ]);

  return {
    result: data,
    isLoading,
    isError: error,
  };
}