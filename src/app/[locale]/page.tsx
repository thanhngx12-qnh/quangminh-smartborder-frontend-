// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/page.tsx
'use client';

import { useLocale } from 'next-intl';
import HeroSection from '@/components/sections/HomePage/HeroSection';
import KpiSection from '@/components/sections/HomePage/KpiSection';
import FeaturedServicesSection from '@/components/sections/HomePage/FeaturedServicesSection';
import LatestNewsSection from '@/components/sections/HomePage/LatestNewsSection';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import { useFeaturedServices } from '@/hooks/useServices'; // <-- Import hook
import { mockLatestNews } from '@/lib/mock-data'; // Vẫn dùng mock cho News

export default function Home() {
  const locale = useLocale();
  const { services, isLoading, isError } = useFeaturedServices(locale);
  const latestNews = mockLatestNews; // Tạm thời vẫn giữ mock data cho News

  // Xử lý trạng thái loading và error
  if (isLoading) {
    return <div>Loading...</div>; // Có thể thay bằng một component skeleton đẹp hơn
  }

  if (isError) {
    return <div>Failed to load services.</div>;
  }

  return (
    <>
      <HeroSection />
      
      <FadeInWhenVisible>
        <KpiSection />
      </FadeInWhenVisible>
      
      {/* Chỉ render khi có dữ liệu */}
      {services && (
        <FadeInWhenVisible>
          <FeaturedServicesSection services={services} />
        </FadeInWhenVisible>
      )}

      {/* Tương tự, sau này sẽ thay bằng hook useLatestNews */}
      <FadeInWhenVisible>
        <LatestNewsSection news={latestNews} />
      </FadeInWhenVisible>
    </>
  );
}