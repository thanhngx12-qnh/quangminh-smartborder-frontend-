// dir: ~/quangminh-smart-border/frontend/src/lib/mock-data.ts

import { Service } from '@/types';

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