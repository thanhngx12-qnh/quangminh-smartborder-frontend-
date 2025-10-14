// dir: ~/quangminh-smart-border/frontend/src/components/shared/ServiceCard/index.tsx
'use client';

import styled from 'styled-components';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/navigation';
import { Service } from '@/types';

// --- Styled Components ---
const CardWrapper = styled(Link)`
  display: block;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: ${({ theme }) => theme.colors.surface};     

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  
  img {
    object-fit: cover;
  }
`;

const CardContent = styled.div`
  padding: 24px;

  h3 {
    font-size: 22px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.textSecondary}; 
    line-height: 1.6;
  }
`;

// --- Main Component ---
interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const locale = useLocale();
  const translation = service.translations.find(t => t.locale === locale) || service.translations[0];

  return (
    <CardWrapper href={`/services/${translation.slug}`} as="a">
      <ImageWrapper>
        <Image 
          src={service.coverImage || '/placeholder.jpg'} 
          alt={translation.title} 
          fill
        />
      </ImageWrapper>
      <CardContent>
        <h3>{translation.title}</h3>
        <p>{translation.shortDesc}</p>
      </CardContent>
    </CardWrapper>
  );
}