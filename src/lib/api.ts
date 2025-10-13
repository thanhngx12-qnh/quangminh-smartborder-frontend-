// dir: ~/quangminh-smart-border/frontend/src/lib/api.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Thêm bước kiểm tra
if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined. Please check your .env file.");
}

console.log("API Base URL used by Axios:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;