// dir: ~/quangminh-smart-border/frontend/src/lib/schemas.ts
import { z } from 'zod';

// Định nghĩa schema cho form liên hệ
export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự." }),
  email: z.string().email({ message: "Email không hợp lệ." }),
  
  // SỬA LỖI Ở ĐÂY: Thêm validation cho trường phone
  phone: z.string().min(9, { message: "Số điện thoại phải có ít nhất 9 chữ số." }),

  message: z.string().min(10, { message: "Nội dung phải có ít nhất 10 ký tự." }),
   serviceId: z.string().optional(),
});

// Suy ra kiểu dữ liệu TypeScript từ schema
export type ContactFormValues = z.infer<typeof contactFormSchema>;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf", 
  "application/msword", 
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

// Cập nhật schema với các thông điệp lỗi chi tiết
export const applicationFormSchema = z.object({
  applicantName: z.string().min(2, "Họ và tên là bắt buộc."),
  email: z.string().email("Email không hợp lệ."),
  phone: z.string().min(9, "Số điện thoại không hợp lệ."),
  cv: z.any()
    .refine((files) => files?.length >= 1, "CV là bắt buộc.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Kích thước tối đa là 5MB.`)
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), 
      "Chỉ chấp nhận các định dạng .pdf, .doc, .docx."
    ),
});

export type ApplicationFormValues = z.infer<typeof applicationFormSchema>;