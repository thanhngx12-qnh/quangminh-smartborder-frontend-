import useSWR from 'swr';
import { News } from '@/types';

// 1. Định nghĩa cấu trúc phản hồi từ Server (Lớp vỏ ngoài cùng)
interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

// Cấu trúc dữ liệu phân trang (Lớp vỏ bên trong)
interface PaginatedNewsResult {
  data: News[];
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}

// --- Fetcher (Nếu bạn chưa cấu hình global) ---
// Thêm hàm này vào nếu SWR của bạn chưa có fetcher mặc định
const fetcher = (url: string) => fetch(process.env.NEXT_PUBLIC_API_URL + url).then(r => r.json());
// ----------------------------------------------

export function useLatestNews(locale: string) {
  // Thay đổi kiểu dữ liệu Generic của useSWR thành ApiResponse<News[]>
  const { data, error, isLoading } = useSWR<ApiResponse<News[]>>(
    `/news?locale=${locale}&status=PUBLISHED&limit=3`,
    fetcher // Đảm bảo có fetcher
  );

  return {
    // Bóc lớp vỏ data ra
    news: data?.data, 
    isLoading,
    isError: error,
  };
}

export function usePaginatedNews(locale: string, page: number) {
  // Thay đổi URL query param cho đúng chuẩn fetch
  const queryString = `/news?locale=${locale}&status=PUBLISHED&page=${page}&limit=9`;

  const { data, error, isLoading } = useSWR<ApiResponse<PaginatedNewsResult>>(
    queryString,
    fetcher
  );

  return {
    // QUAN TRỌNG: Lấy data.data để trả về đúng object PaginatedNewsResult
    result: data?.data, 
    isLoading,
    isError: error,
  };
}

export function useNewsBySlug(slug: string, locale: string) {
  const { data, error, isLoading } = useSWR<ApiResponse<News>>(
    slug ? `/news/slug/${locale}/${slug}` : null,
    fetcher
  );

  return {
    news: data?.data, // Bóc vỏ
    isLoading,
    isError: error,
  };
}