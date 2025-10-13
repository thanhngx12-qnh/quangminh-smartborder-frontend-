// dir: ~/quangminh-smart-border/frontend/src/lib/fetcher.ts
import api from './api';

// Hàm fetcher sẽ nhận URL (hoặc một key) từ SWR và trả về dữ liệu
// SWR sẽ tự động truyền 'url' làm đối số đầu tiên
export const fetcher = (url: string) => api.get(url).then(res => res.data.data);

/**
 * Tại sao lại là res.data.data?
 * - res.data: là response body từ Axios.
 * - res.data.data: là do chúng ta đã cấu hình TransformInterceptor ở backend,
 *   toàn bộ dữ liệu thật nằm trong thuộc tính 'data' của response.
 *   Ví dụ: { statusCode: 200, message: 'Success', data: [...] }
 */