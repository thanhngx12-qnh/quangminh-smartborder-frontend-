// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/page.tsx
'use client';

import { useLocale } from 'next-intl';
import HeroSection from '@/components/sections/HomePage/HeroSection';
import KpiSection from '@/components/sections/HomePage/KpiSection';
import FeaturedServicesSection from '@/components/sections/HomePage/FeaturedServicesSection';
import LatestNewsSection from '@/components/sections/HomePage/LatestNewsSection';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import { useFeaturedServices } from '@/hooks/useServices';
import { useLatestNews } from '@/hooks/useNews';
import HomePageSkeleton from '@/components/skeletons/HomePageSkeleton'; // <-- Import
import WhyChooseUsSection from '@/components/sections/HomePage/WhyChooseUsSection'; // <-- Import
import PartnersSection from '@/components/sections/HomePage/PartnersSection'; 

export default function Home() {
  const locale = useLocale();
  
  const { services, isLoading: isLoadingServices, isError: isErrorServices } = useFeaturedServices(locale);
  const { news, isLoading: isLoadingNews, isError: isErrorNews } = useLatestNews(locale);

  // Kết hợp trạng thái loading
  const isLoading = isLoadingServices || isLoadingNews;

  return (
    <>
      {/* HeroSection luôn được hiển thị */}
      <HeroSection />
      
      {/* 
        Nếu đang tải, hiển thị skeleton.
        Nếu không, hiển thị nội dung thật.
      */}
      {isLoading ? (
        <HomePageSkeleton />
      ) : (
        <>
          <FadeInWhenVisible>
            <KpiSection />
          </FadeInWhenVisible>
          
          {isErrorServices ? (
            <div>Failed to load services.</div>
          ) : (
            services && services.length > 0 && (
              <FadeInWhenVisible>
                <FeaturedServicesSection services={services} />
              </FadeInWhenVisible>
            )
          )}

          <WhyChooseUsSection />

          {isErrorNews ? (
            <div>Failed to load news.</div>
          ) : (
            news && news.length > 0 && (
              <FadeInWhenVisible>
                <LatestNewsSection news={news} />
              </FadeInWhenVisible>
            )
          )}

          <PartnersSection />
        </>
      )}
    </>
  );
}