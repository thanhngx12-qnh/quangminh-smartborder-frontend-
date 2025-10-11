// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/page.tsx
'use client';

import HeroSection from '@/components/sections/HomePage/HeroSection';
import KpiSection from '@/components/sections/HomePage/KpiSection';
import FeaturedServicesSection from '@/components/sections/HomePage/FeaturedServicesSection';
import LatestNewsSection from '@/components/sections/HomePage/LatestNewsSection'; // <-- Import
import { mockFeaturedServices, mockLatestNews } from '@/lib/mock-data'; // <-- Import

export default function Home() {
  const featuredServices = mockFeaturedServices;
  const latestNews = mockLatestNews;

  return (
    <>
      <HeroSection />
      <KpiSection />
      <FeaturedServicesSection services={featuredServices} />
      <LatestNewsSection news={latestNews} />
    </>
  );
}