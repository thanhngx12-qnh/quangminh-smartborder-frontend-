// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/page.tsx
'use client';

import HeroSection from '@/components/sections/HomePage/HeroSection';
import KpiSection from '@/components/sections/HomePage/KpiSection';
import FeaturedServicesSection from '@/components/sections/HomePage/FeaturedServicesSection';
import LatestNewsSection from '@/components/sections/HomePage/LatestNewsSection';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible'; // <-- Import

import { mockFeaturedServices, mockLatestNews } from '@/lib/mock-data';

export default function Home() {
  const featuredServices = mockFeaturedServices;
  const latestNews = mockLatestNews;

  return (
    <>
      {/* HeroSection thường không cần animation vì nó xuất hiện ngay lập tức */}
      <HeroSection />
      
      {/* Bọc các section còn lại */}
      <FadeInWhenVisible>
        <KpiSection />
      </FadeInWhenVisible>
      
      <FadeInWhenVisible>
        <FeaturedServicesSection services={featuredServices} />
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        <LatestNewsSection news={latestNews} />
      </FadeInWhenVisible>
    </>
  );
}