// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/page.tsx
'use client';

// Bỏ import useLocale và useFeaturedServices vì không dùng đến nữa
// import { useLocale } from 'next-intl';
// import { useFeaturedServices } from '@/hooks/useServices';

import HeroSection from '@/components/sections/HomePage/HeroSection';
import KpiSection from '@/components/sections/HomePage/KpiSection';
import FeaturedServicesSection from '@/components/sections/HomePage/FeaturedServicesSection';
import LatestNewsSection from '@/components/sections/HomePage/LatestNewsSection';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';

// Import cả hai bộ dữ liệu mock
import { mockFeaturedServices, mockLatestNews } from '@/lib/mock-data';

export default function Home() {
  // Bỏ toàn bộ logic gọi hook SWR
  // const locale = useLocale();
  // const { services, isLoading, isError } = useFeaturedServices(locale);
  
  // Sử dụng trực tiếp dữ liệu mock
  const featuredServices = mockFeaturedServices;
  const latestNews = mockLatestNews;

  // Bỏ các đoạn kiểm tra isLoading và isError
  // if (isLoading) { ... }
  // if (isError) { ... }

  return (
    <>
      <HeroSection />
      
      <FadeInWhenVisible>
        <KpiSection />
      </FadeInWhenVisible>
      
      {/* 
        Bây giờ `featuredServices` luôn tồn tại (vì nó là mock data),
        nên chúng ta có thể bỏ điều kiện `services &&` nếu muốn,
        nhưng giữ lại cũng không sao.
      */}
      {featuredServices && (
        <FadeInWhenVisible>
          <FeaturedServicesSection services={featuredServices} />
        </FadeInWhenVisible>
      )}

      <FadeInWhenVisible>
        <LatestNewsSection news={latestNews} />
      </FadeInWhenVisible>
    </>
  );
}