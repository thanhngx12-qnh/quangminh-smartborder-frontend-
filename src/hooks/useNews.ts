// dir: ~/quangminh-smart-border/frontend/src/hook/useNews.ts
import useSWR from 'swr';
import { News, Service } from '@/types';
import { PaginatedResult } from '@/types';

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
/**
 * Hook lấy danh sách tin tức có phân trang và lọc theo danh mục
 * @param locale Ngôn ngữ hiện tại
 * @param page Số trang
 * @param categoryId ID của danh mục (tùy chọn)
 */
export function usePaginatedNews(locale: string, page: number, categoryId?: string | number) {
  // 1. Khởi tạo các tham số mặc định
  const queryParams = new URLSearchParams({
    locale,
    status: 'PUBLISHED',
    page: page.toString(),
    limit: '9', // Mỗi trang 9 bài để chia lưới 3 cột đều đẹp
  });

  // 2. Nếu có categoryId thì mới thêm vào query string
  if (categoryId) {
    queryParams.append('categoryId', categoryId.toString());
  }

  // 3. Tạo URL hoàn chỉnh
  const queryString = `/news?${queryParams.toString()}`;

  const { data, error, isLoading, mutate } = useSWR<ApiResponse<PaginatedResult<News>>>(
    queryString,
    fetcher
  );

  return {
    // Trả về đúng object PaginatedResult chứa { data, total, page, lastPage }
    result: data?.data, 
    isLoading,
    isError: error,
    mutate, // Trả về thêm hàm refresh dữ liệu
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

export function useFeaturedNews(locale: string) {
  // Gọi API với tham số featured=true và giới hạn 3 bài
  const queryString = `/news?locale=${locale}&status=PUBLISHED&featured=true&limit=3`;

  // Lưu ý: Backend trả về phân trang, nên ta lấy data.data
  const { data, error, isLoading } = useSWR<ApiResponse<PaginatedNewsResult>>(
    queryString,
    fetcher
  );

  return {
    // Trả về mảng bài viết (data.data.data)
    news: data?.data?.data || [], 
    isLoading,
    isError: error,
  };
}

export function useFeaturedServices(locale: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  // Gọi API lấy danh sách dịch vụ, lọc theo featured=true
  const { data, error, isLoading } = useSWR(`${API_URL}/services?featured=true&locale=${locale}`, fetcher);

  return {
    services: (data?.data?.data as Service[]) || (data?.data as Service[]) || [],
    isLoading,
    isError: error
  };
}