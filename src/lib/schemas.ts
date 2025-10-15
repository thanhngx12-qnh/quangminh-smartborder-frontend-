// dir: ~/quangminh-smart-border/frontend/src/lib/schemas.ts
import { z } from 'zod';

// Định nghĩa schema cho form liên hệ
export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự." }),
  email: z.string().email({ message: "Email không hợp lệ." }),
  
  // SỬA LỖI Ở ĐÂY: Thêm validation cho trường phone
  phone: z.string().min(9, { message: "Số điện thoại phải có ít nhất 9 chữ số." }),

  message: z.string().min(10, { message: "Nội dung phải có ít nhất 10 ký tự." }),
});

// Suy ra kiểu dữ liệu TypeScript từ schema
export type ContactFormValues = z.infer<typeof contactFormSchema>;