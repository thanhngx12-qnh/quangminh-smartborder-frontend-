// dir: ~/quangminh-smart-border/frontend/src/lib/fetcher.ts
import api from './api';

// Định nghĩa một kiểu dữ liệu chung cho params
type QueryParams = Record<string, string | number | boolean | undefined>;

// Fetcher sẽ nhận một mảng [url, params]
// Chúng ta sẽ dùng 'unknown' và ép kiểu nếu cần, nhưng cách tốt hơn là dùng Record
export const fetcher = ([url, params]: [string, QueryParams]) => 
  api.get(url, { params }).then(res => res.data.data);