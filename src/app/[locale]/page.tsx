// dir: ~/quangminh-smart-border/frontend/src/app/[locale]/page.tsx
'use client';

import HeroSection from '@/components/sections/HomePage/HeroSection';
import KpiSection from '@/components/sections/HomePage/KpiSection'; // <-- Import

export default function Home() {
  return (
    <>
      <HeroSection />
      <KpiSection /> {/* <-- Thêm vào đây */}
      {/* Các section khác sẽ được thêm vào đây */}
    </>
  );
}