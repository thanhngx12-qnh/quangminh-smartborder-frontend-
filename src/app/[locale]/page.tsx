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

export default function Home() {
  const locale = useLocale();
  const { services, isLoading } = useFeaturedServices(locale);

  // THÊM: Dữ liệu cấu trúc Organization Schema cho SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Tà Lùng Logistics",
    "legalName": "Công ty TNHH Thương mại Vận tải Phú Anh",
    "url": "https://talunglogistics.com",
    "logo": "https://talunglogistics.com/images/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+84-963-320-335",
      "contactType": "customer service",
      "areaServed": ["VN", "CN"],
      "availableLanguage": ["Vietnamese", "Chinese", "English"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Cửa khẩu Quốc tế Tà Lùng, xã Phục Hoà",
      "addressLocality": "Cao Bằng",
      "addressCountry": "VN"
    }
  };

  return (
    <>
      {/* Script chèn Schema cho Google Bot đọc */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* 1. HERO SECTION */}
      <HeroSection />
      
      {/* 2. KPI SECTION */}
      <FadeInWhenVisible>
        <KpiSection />
      </FadeInWhenVisible>

      {/* 3. WHY CHOOSE US */}
      <WhyChooseUsSection />

      {/* 4. SERVICES */}
      <FadeInWhenVisible>
        <FeaturedServicesSection services={services ||[]} />
      </FadeInWhenVisible>

      {/* 5. LATEST NEWS */}
      <LatestNewsSection />

      {/* 6. PARTNERS */}
      <PartnersSection />
    </>
  );
}