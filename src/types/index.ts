// Chúng ta sẽ tạo một file để định nghĩa các kiểu dữ liệu dùng chung
// dir: ~/quangminh-smart-border/frontend/src/types/index.ts

export interface ServiceTranslation {
  locale: 'vi' | 'en' | 'zh';
  title: string;
  slug: string;
  shortDesc: string;
}

export interface Service {
  id: number;
  code: string;
  coverImage?: string;
  translations: ServiceTranslation[];
}