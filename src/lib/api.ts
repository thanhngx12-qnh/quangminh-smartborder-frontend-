// dir: ~/quangminh-smart-border/frontend/src/lib/api.ts
import axios from 'axios';
import { ContactFormValues } from './schemas'; 

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

export const postQuoteRequest = async (data: ContactFormValues) => {
  // API backend mong đợi các trường: customerName, email, details
  const payload = {
    customerName: data.name,
    email: data.email,
    details: data.message,
  };
  
  // Dùng instance `api` để gọi POST /quotes
  const response = await api.post('/quotes', payload);
  return response.data;
};

export const postJobApplication = async (jobId: number, data: FormData) => {
  // Khi gửi FormData, header Content-Type sẽ tự động được set
  const response = await api.post(`/careers/postings/${jobId}/apply`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export default api;

