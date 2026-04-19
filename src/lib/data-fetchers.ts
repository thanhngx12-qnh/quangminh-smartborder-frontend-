// dir: ~/quangminh-smart-border/frontend/src/lib/data-fetchers.ts
import 'server-only'; // Đảm bảo file này chỉ được dùng trên server
import { Service, News, Category } from '@/types';

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

export async function getAllServicesForSitemap(): Promise<Service[]> {
  try {
    // Gọi endpoint danh sách với limit lớn để lấy toàn bộ slug
    const res = await fetch(`${API_BASE_URL}/services?limit=100`, {
      next: { revalidate: 86400 } 
    });
    if (!res.ok) return [];
    const json = await res.json();
    
    // Kiểm tra: Nếu API trả về cấu trúc phân trang { data: { data: [...] } }
    // Hoặc trả về thẳng { data: [...] }
    const services = json.data?.data || json.data || [];
    return Array.isArray(services) ? services : [];
  } catch (error) {
    console.error('Sitemap Fetch Services Error:', error);
    return [];
  }
}

// Hàm fetch TẤT CẢ tin tức (Nâng cấp để quét sạch bài viết)
export async function getAllNewsForSitemap(): Promise<News[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/news?limit=200`, {
      next: { revalidate: 86400 }
    });
    if (!res.ok) return [];
    const json = await res.json();
    
    const news = json.data?.data || json.data || [];
    return Array.isArray(news) ? news : [];
  } catch (error) {
    console.error('Sitemap Fetch News Error:', error);
    return [];
  }
}

/**
 * Hàm fetch danh sách Danh mục
 * @param type 'NEWS' hoặc 'SERVICE'
 */
export async function getCategories(type: 'NEWS' | 'SERVICE'): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/categories?type=${type}`, {
      next: { revalidate: 3600 } // Cache 1 giờ
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error(`Failed to fetch categories for ${type}:`, error);
    return [];
  }
}