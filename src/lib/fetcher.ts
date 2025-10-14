// dir: ~/quangminh-smart-border/frontend/src/lib/fetcher.ts
import api from './api';

type QueryParams = Record<string, string | number | boolean | undefined>;

// Fetcher sẽ luôn nhận một mảng [url, params]
// Nếu không có params, nó sẽ là một object rỗng
export const fetcher = ([url, params]: [string, QueryParams]) => 
  api.get(url, { params }).then(res => res.data.data);