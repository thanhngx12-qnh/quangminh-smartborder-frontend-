// dir: frontend/src/app/[locale]/page.tsx
'use client';

import { useLocale } from 'next-intl';
import HeroSection from '@/components/sections/HomePage/HeroSection';
import KpiSection from '@/components/sections/HomePage/KpiSection';
import FeaturedServicesSection from '@/components/sections/HomePage/FeaturedServicesSection';
import LatestNewsSection from '@/components/sections/HomePage/LatestNewsSection';
import WhyChooseUsSection from '@/components/sections/HomePage/WhyChooseUsSection';
import PartnersSection from '@/components/sections/HomePage/PartnersSection';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import { useFeaturedServices } from '@/hooks/useServices';
// Không cần import useLatestNews vì component LatestNewsSection đã tự xử lý

export default function Home() {
  const locale = useLocale();
  
  // Chỉ cần fetch Services ở đây để truyền props
  const { services, isLoading } = useFeaturedServices(locale);

  return (
    <>
      {/* 1. HERO SECTION: Hiển thị ngay lập tức để giữ chân người dùng (LCP tối ưu) */}
      <HeroSection />
      
      {/* 2. KPI SECTION: Số liệu ấn tượng (Static Content) */}
      <FadeInWhenVisible>
        <KpiSection />
      </FadeInWhenVisible>

      {/* 3. WHY CHOOSE US: Lý do chọn (Static Content) */}
      <WhyChooseUsSection />

      {/* 4. SERVICES: Dữ liệu động */}
      {/* Chúng ta không chặn toàn bộ trang bằng Skeleton. 
          Nếu đang loading, FeaturedServicesSection sẽ nhận mảng rỗng hoặc undefined,
          bên trong component đó đã xử lý render an toàn. */}
      <FadeInWhenVisible>
        <FeaturedServicesSection services={services || []} />
      </FadeInWhenVisible>

      {/* 5. LATEST NEWS: Tự quản lý data fetching bên trong */}
      <LatestNewsSection />

      {/* 6. PARTNERS: Footer uy tín */}
      <PartnersSection />
    </>
  );
}