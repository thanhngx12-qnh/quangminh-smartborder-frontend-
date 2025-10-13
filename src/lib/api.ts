// dir: ~/quangminh-smart-border/frontend/src/lib/api.ts
import axios from 'axios';

// Lấy URL của backend từ biến môi trường
// Cung cấp một giá trị mặc định cho môi trường dev
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Sau này khi có logic đăng nhập, chúng ta sẽ thêm interceptor ở đây
 * để tự động đính kèm token vào mỗi request.
 * 
 * Ví dụ:
 * api.interceptors.request.use(config => {
 *   const token = getAuthToken(); // một hàm để lấy token từ localStorage/Zustand
 *   if (token) {
 *     config.headers.Authorization = `Bearer ${token}`;
 *   }
 *   return config;
 * });
 */

export default api;