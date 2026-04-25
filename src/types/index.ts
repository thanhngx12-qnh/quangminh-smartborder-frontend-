// dir: frontend/src/types/index.ts

/**
 * Interface cho Bản dịch Danh mục (V3.0)
 */
export interface CategoryTranslation {
  locale: string;
  name: string;
  slug: string;
  description?: string;
}

/**
 * Interface cho Danh mục (V3.0 - Đa ngôn ngữ)
 */
export interface Category {
  id: number;
  type: 'NEWS' | 'SERVICE';
  parentId?: number | null;
  translations: CategoryTranslation[]; // name và slug đã nằm trong này
}

/**
 * Interface cho Bản dịch Dịch vụ (SEO Fallback)
 */
export interface ServiceTranslation {
  locale: 'vi' | 'en' | 'zh';
  title: string;
  slug: string;
  shortDesc: string;
  content?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogImage?: string;
}

/**
 * Interface cho Dịch vụ
 */
export interface Service {
  id: number;
  code: string;
  categoryId?: number;
  category?: Category; // Liên kết tới interface Category mới ở trên
  coverImage?: string;
  featured?: boolean;
  translations: ServiceTranslation[];
}

/**
 * Interface cho Bản dịch Tin tức (SEO Fallback)
 */
export interface NewsTranslation {
  locale: 'vi' | 'en' | 'zh';
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogImage?: string;
}

/**
 * Interface cho Tin tức
 */
export interface News {
  id: number;
  categoryId?: number;
  category?: Category; // Liên kết tới interface Category mới ở trên
  coverImage?: string;
  publishedAt?: string;
  translations: NewsTranslation[];
}

// --- Các Interface Tracking & Tuyển dụng (Giữ nguyên) ---

export interface TrackingEvent {
  id: number;
  eventCode: string;
  description: string;
  eventTime: string;
  location?: string;
}

export interface Consignment {
  id: number;
  awb: string;
  origin: string;
  destination: string;
  status: string;
  estimatedDeliveryDate?: string;
  aiPredictedEta?: number;
  events: TrackingEvent[];
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}

export type JobStatus = 'OPEN' | 'CLOSED';

export interface JobPosting {
  id: number;
  title: string;
  location: string;
  description: string;
  requirements: string;
  status: JobStatus;
  createdAt: string;
}