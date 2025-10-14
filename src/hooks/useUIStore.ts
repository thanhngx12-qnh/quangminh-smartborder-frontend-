// dir: ~/quangminh-smart-border/frontend/src/hooks/useUIStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // Import middleware để lưu vào localStorage

type Theme = 'light' | 'dark';

interface UIState {
  theme: Theme;
  toggleTheme: () => void;
}

// Sử dụng `persist` middleware để tự động lưu trạng thái theme vào localStorage
// Điều này giúp lựa chọn của người dùng được ghi nhớ giữa các lần truy cập
export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light', // Giá trị mặc định
      toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light'
      })),
    }),
    {
      name: 'ui-theme-storage', // Tên key trong localStorage
    }
  )
);