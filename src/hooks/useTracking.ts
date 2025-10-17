// dir: ~/quangminh-smart-border/frontend/src/hooks/useTracking.ts
import useSWR from 'swr';
import { Consignment } from '@/types';

// Sửa lại hook để nhận một chuỗi AWB (có thể là null)
export function useTrackingInfo(awbs: string | null) {
  // Key là một mảng. SWR sẽ chỉ fetch khi `awbs` có giá trị và không rỗng.
  const shouldFetch = awbs && awbs.trim() !== '';
  const key = shouldFetch ? ['/consignments/lookup', { awbs }] : null;

  // API mới trả về một MẢNG các vận đơn, nên kiểu dữ liệu là Consignment[]
  const { data, error, isLoading, mutate } = useSWR<Consignment[]>(key);

  return {
    consignments: data,
    isLoading,
    isError: error,
    mutate, // Export `mutate` để có thể trigger re-fetch thủ công
  };
}