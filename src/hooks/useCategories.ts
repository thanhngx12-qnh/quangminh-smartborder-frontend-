// dir: frontend/src/hooks/useCategories.ts
import useSWR from 'swr';
import { Category } from '@/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCategories(type: 'NEWS' | 'SERVICE') {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { data, error, isLoading } = useSWR(`${API_URL}/categories?type=${type}`, fetcher);

  // Bóc tách dữ liệu linh hoạt: 
  // Thử lấy data.data (nếu Backend bọc 1 lớp) hoặc data.data.data (nếu bọc 2 lớp)
  const rawData = data?.data;
  const categories = Array.isArray(rawData) 
    ? rawData 
    : (Array.isArray(rawData?.data) ? rawData.data : []);

  return {
    categories: categories as Category[],
    isLoading,
    isError: error
  };
}