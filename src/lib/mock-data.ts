// dir: ~/quangminh-smart-border/frontend/src/lib/mock-data.ts

import { Service, News } from '@/types';

export const mockFeaturedServices: Service[] = [
  {
    id: 1,
    code: 'road_transport',
    coverImage: '/services/transport.jpg', // Ảnh sẽ được thêm vào public/services
    translations: [
      {
        locale: 'vi',
        title: 'Vận Tải Đường Bộ',
        slug: 'van-tai-duong-bo',
        shortDesc: 'Vận chuyển hàng hóa nhanh chóng, an toàn qua biên giới Việt-Trung.'
      }
    ]
  },
  {
    id: 2,
    code: 'warehouse',
    coverImage: '/services/warehouse.jpg',
    translations: [
      {
        locale: 'vi',
        title: 'Dịch Vụ Kho Bãi',
        slug: 'dich-vu-kho-bai',
        shortDesc: 'Lưu trữ, bảo quản hàng hóa trong hệ thống kho bãi hiện đại.'
      }
    ]
  },
  {
    id: 3,
    code: 'customs_clearance',
    coverImage: '/services/customs.jpg',
    translations: [
      {
        locale: 'vi',
        title: 'Khai Báo Hải Quan',
        slug: 'khai-bao-hai-quan',
        shortDesc: 'Thủ tục thông quan chuyên nghiệp, tối ưu hóa thời gian và chi phí.'
      }
    ]
  },
    {
    id: 4,
    code: 'ecommerce_logistics',
    coverImage: '/services/ecommerce.jpg',
    translations: [
      {
        locale: 'vi',
        title: 'Logistics TMĐT',
        slug: 'logistics-thuong-mai-dien-tu',
        shortDesc: 'Giải pháp logistics toàn diện cho các nhà bán hàng online.'
      }
    ]
  },
    {
    id: 5,
    code: 'insurance',
    coverImage: '/services/insurance.jpg',
    translations: [
      {
        locale: 'vi',
        title: 'Bảo Hiểm Hàng Hóa',
        slug: 'bao-hiem-hang-hoa',
        shortDesc: 'Đảm bảo an toàn tuyệt đối cho tài sản của bạn trong quá trình vận chuyển.'
      }
    ]
  },
];

export const mockLatestNews: News[] = [
  {
    id: 1,
    coverImage: '/news/news-1.jpg',
    publishedAt: '2025-10-08T10:00:00Z',
    translations: [
      {
        locale: 'vi',
        title: 'Chính sách mới về thông quan hàng hóa tại cửa khẩu Tà Lùng',
        slug: 'chinh-sach-moi-thong-quan-ta-lung',
        excerpt: 'Cập nhật các quy định mới nhất có hiệu lực từ Quý 4, 2025, giúp doanh nghiệp tối ưu hóa quy trình xuất nhập khẩu...'
      }
    ]
  },
  {
    id: 2,
    coverImage: '/news/news-2.jpg',
    publishedAt: '2025-09-25T14:30:00Z',
    translations: [
      {
        locale: 'vi',
        title: 'Phú Anh Logistics mở rộng hệ thống kho bãi thông minh',
        slug: 'quang-minh-mo-rong-kho-bai-thong-minh',
        excerpt: 'Với việc áp dụng công nghệ IoT và tự động hóa, hệ thống kho bãi mới hứa hẹn giảm 30% thời gian xử lý hàng hóa...'
      }
    ]
  },
  {
    id: 3,
    coverImage: '/news/news-3.jpg',
    publishedAt: '2025-09-15T09:00:00Z',
    translations: [
      {
        locale: 'vi',
        title: 'Hội thảo Hợp tác Logistics Việt - Trung 2025 thành công tốt đẹp',
        slug: 'hoi-thao-hop-tac-logistics-viet-trung-2025',
        excerpt: 'Sự kiện quy tụ hơn 200 doanh nghiệp, mở ra nhiều cơ hội hợp tác và phát triển cho ngành logistics hai nước...'
      }
    ]
  }
];