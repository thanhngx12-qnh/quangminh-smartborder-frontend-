// dir: ~/quangminh-smart-border/frontend/src/hooks/useTracking.ts
import useSWR from 'swr';
import { Consignment } from '@/types'; // Chúng ta sẽ cần thêm kiểu này

export function useTrackingInfo(awb: string) {
  // Key là endpoint API. Chỉ fetch khi `awb` có giá trị.
  const key = awb ? [`/consignments/lookup/${awb}`, {}] : null;
  const { data, error, isLoading } = useSWR<Consignment>(key);

  return {
    consignment: data,
    isLoading,
    isError: error,
  };
}