// dir: ~/quangminh-smart-border/frontend/src/hooks/useCareers.ts
import useSWR from 'swr';
import { JobPosting } from '@/types'; // Cần thêm JobPosting vào `types/index.ts`
import { PaginatedResult } from '@/types';

// Định nghĩa kiểu dữ liệu cho kết quả phân trang
type PaginatedJobPostingsResult = PaginatedResult<JobPosting>;

// Hook để lấy danh sách tin tuyển dụng có phân trang
export function usePaginatedJobPostings(locale: string, page: number, status: 'OPEN' | 'CLOSED' = 'OPEN') {
  const { data, error, isLoading } = useSWR<PaginatedJobPostingsResult>([
    '/careers/postings', 
    { locale, page, limit: 10, status }
  ]);

  return {
    result: data,
    isLoading,
    isError: error,
  };
}

// Hook để lấy chi tiết một tin tuyển dụng
export function useJobPostingById(id?: number) {
  const key = id ? [`/careers/postings/${id}`, {}] : null;
  const { data, error, isLoading } = useSWR<JobPosting>(key);
  
  return {
    jobPosting: data,
    isLoading,
    isError: error,
  };
}