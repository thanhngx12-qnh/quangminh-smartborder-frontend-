// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/page.tsx
'use client';

import { useLocale } from 'next-intl';
import HeroSection from '@/components/sections/HomePage/HeroSection';
import KpiSection from '@/components/sections/HomePage/KpiSection';
import FeaturedServicesSection from '@/components/sections/HomePage/FeaturedServicesSection';
import LatestNewsSection from '@/components/sections/HomePage/LatestNewsSection';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import { useFeaturedServices } from '@/hooks/useServices';
import { useLatestNews } from '@/hooks/useNews'; // <-- Import hook mới

// Component Skeleton để hiển thị khi đang tải dữ liệu
const SkeletonLoader = () => (
  <div style={{ textAlign: 'center', padding: '80px' }}>Loading content...</div>
);

export default function Home() {
  const locale = useLocale();
  
  // Gọi cả hai hook để fetch dữ liệu song song
  const { services, isLoading: isLoadingServices, isError: isErrorServices } = useFeaturedServices(locale);
  const { news, isLoading: isLoadingNews, isError: isErrorNews } = useLatestNews(locale);

  // Hiển thị trạng thái loading nếu một trong hai đang tải
  if (isLoadingServices || isLoadingNews) {
    return <SkeletonLoader />;
  }

  // Hiển thị lỗi nếu một trong hai gặp lỗi
  if (isErrorServices) {
    return <div>Failed to load services.</div>;
  }
  if (isErrorNews) {
    return <div>Failed to load news.</div>;
  }

  return (
    <>
      <HeroSection />
      
      <FadeInWhenVisible>
        <KpiSection />
      </FadeInWhenVisible>
      
      {/* Render section services nếu có dữ liệu */}
      {services && services.length > 0 && (
        <FadeInWhenVisible>
          <FeaturedServicesSection services={services} />
        </FadeInWhenVisible>
      )}

      {/* Render section news nếu có dữ liệu */}
      {news && news.length > 0 && (
        <FadeInWhenVisible>
          <LatestNewsSection news={news} />
        </FadeInWhenVisible>
      )}
    </>
  );
}