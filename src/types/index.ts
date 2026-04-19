// dir: ~/quangminh-smart-border/frontend/src/types/index.ts
// dir: frontend/src/types/index.ts

/**
 * Interface cho Danh mục (Mới)
 */
export interface Category {
  id: number;
  name: string;
  slug: string;
  type: 'NEWS' | 'SERVICE';
}

/**
 * Interface cho Bản dịch Dịch vụ (Cập nhật SEO)
 */
export interface ServiceTranslation {
  locale: 'vi' | 'en' | 'zh';
  title: string;
  slug: string;
  shortDesc: string;
  content?: string;
  // --- CÁC TRƯỜNG SEO MỚI ---
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogImage?: string;
}

/**
 * Interface cho Dịch vụ (Cập nhật Category)
 */
export interface Service {
  id: number;
  code: string;
  categoryId?: number; // Liên kết danh mục
  category?: Category; // Dữ liệu danh mục đính kèm
  coverImage?: string;
  featured?: boolean;
  translations: ServiceTranslation[];
}

/**
 * Interface cho Bản dịch Tin tức (Cập nhật SEO)
 */
export interface NewsTranslation {
  locale: 'vi' | 'en' | 'zh';
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  // --- CÁC TRƯỜNG SEO MỚI ---
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogImage?: string;
}

/**
 * Interface cho Tin tức (Cập nhật Category)
 */
export interface News {
  id: number;
  categoryId?: number; // Liên kết danh mục
  category?: Category; // Dữ liệu danh mục đính kèm
  coverImage?: string;
  publishedAt?: string;
  translations: NewsTranslation[];
}

// --- Các Interface khác giữ nguyên ---

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