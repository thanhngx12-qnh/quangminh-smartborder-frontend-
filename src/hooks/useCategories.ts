// dir: frontend/src/hooks/useCategories.ts
import useSWR from 'swr';
import { Category } from '@/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCategories(type: 'NEWS' | 'SERVICE') {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { data, error, isLoading } = useSWR(`${API_URL}/categories?type=${type}`, fetcher);

  return {
    categories: (data?.data as Category[]) || [],
    isLoading,
    isError: error
  };
}