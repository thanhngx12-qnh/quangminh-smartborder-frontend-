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