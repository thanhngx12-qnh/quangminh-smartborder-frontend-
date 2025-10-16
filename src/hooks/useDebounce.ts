// dir: ~/quangminh-smart-border/frontend/src/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

// Hook này nhận một giá trị và một khoảng thời gian chờ (delay)
export function useDebounce(value: string, delay: number): string {
  // State để lưu trữ giá trị đã được debounce
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Thiết lập một timeout
    const handler = setTimeout(() => {
      setDebouncedValue(value); // Chỉ cập nhật giá trị sau khi hết thời gian chờ
    }, delay);

    // Hàm dọn dẹp: Hủy bỏ timeout nếu `value` hoặc `delay` thay đổi
    // Điều này xảy ra khi người dùng vẫn đang gõ
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Chỉ chạy lại effect nếu value hoặc delay thay đổi

  return debouncedValue;
}