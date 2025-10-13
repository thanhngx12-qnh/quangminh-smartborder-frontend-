// dir: ~/quangminh-smart-border/frontend/src/hooks/useNews.ts
import useSWR from 'swr';
import { News } from '@/types';

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