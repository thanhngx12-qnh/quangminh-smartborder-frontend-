// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/page.tsx
'use client';

import HeroSection from '@/components/sections/HomePage/HeroSection';
import KpiSection from '@/components/sections/HomePage/KpiSection';
import FeaturedServicesSection from '@/components/sections/HomePage/FeaturedServicesSection'; // <-- Import
import { mockFeaturedServices } from '@/lib/mock-data'; // <-- Import dữ liệu giả

export default function Home() {
  // Sau này, đây sẽ là nơi chúng ta gọi SWR/hook để fetch API
  const featuredServices = mockFeaturedServices;

  return (
    <>
      <HeroSection />
      <KpiSection />
      {/* Truyền dữ liệu vào component thông qua props */}
      <FeaturedServicesSection services={featuredServices} />
      {/* Các section khác sẽ được thêm vào đây */}
    </>
  );
}