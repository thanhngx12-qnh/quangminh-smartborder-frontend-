// dir: ~/quangminh-smart-border/frontend/src/types/index.ts

export interface ServiceTranslation {
  locale: 'vi' | 'en' | 'zh';
  title: string;
  slug: string;
  shortDesc: string;
  content?: string; // <-- SỬA LỖI Ở ĐÂY: Thêm 'content' (có thể là optional)
}

export interface Service {
  id: number;
  code: string;
  coverImage?: string;
  translations: ServiceTranslation[];
}

export interface NewsTranslation {
  locale: 'vi' | 'en' | 'zh';
  title: string;
  slug: string;
  excerpt: string;
  content?: string; // <-- Thêm 'content' cho News luôn cho nhất quán
}

export interface News {
  id: number;
  coverImage?: string;
  publishedAt?: string;
  translations: NewsTranslation[];
}