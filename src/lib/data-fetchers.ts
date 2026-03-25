// dir: ~/quangminh-smart-border/frontend/src/lib/data-fetchers.ts
import 'server-only'; // Đảm bảo file này chỉ được dùng trên server
import { Service, News } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Hàm fetch chi tiết một dịch vụ
export async function getServiceBySlug(slug: string, locale: string): Promise<Service | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/services/slug/${locale}/${slug}`, {
      next: { revalidate: 3600 } // Cache dữ liệu trong 1 giờ
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error(`Failed to fetch service by slug ${slug}:`, error);
    return null;
  }
}

// Hàm fetch chi tiết một bài viết
export async function getNewsBySlug(slug: string, locale: string): Promise<News | null> {
    try {
        const res = await fetch(`${API_BASE_URL}/news/slug/${locale}/${slug}`, {
            next: { revalidate: 3600 }
        });
        if (!res.ok) return null;
        const json = await res.json();
        return json.data;
    } catch (error) {
        console.error(`Failed to fetch news by slug ${slug}:`, error);
        return null;
    }
}


// Hàm fetch TẤT CẢ dịch vụ (cho sitemap)
export async function getAllServicesForSitemap(): Promise<Service[]> {
  try {
    // Giả định endpoint này trả về tất cả dịch vụ và bản dịch của chúng
    const res = await fetch(`${API_BASE_URL}/services/all`, {
      next: { revalidate: 86400 } // Cache 1 ngày
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Failed to fetch all services for sitemap:', error);
    return [];
  }
}

// Hàm fetch TẤT CẢ tin tức (cho sitemap)
export async function getAllNewsForSitemap(): Promise<News[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/news/all`, {
      next: { revalidate: 86400 } // Cache 1 ngày
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Failed to fetch all news for sitemap:', error);
    return [];
  }
}