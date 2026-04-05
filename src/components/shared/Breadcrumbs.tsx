// dir: frontend/src/components/shared/Breadcrumbs.tsx
'use client';

import styled from 'styled-components';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { RiHome4Line, RiArrowRightSLine } from 'react-icons/ri';

const BreadcrumbNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center; /* Căn giữa cho đồng bộ với Header trang tĩnh */
  padding: 0;
  margin-bottom: 24px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  overflow-x: auto;
  white-space: nowrap;

  &::-webkit-scrollbar { display: none; }
`;

const BreadcrumbList = styled.ol`
  display: flex;
  list-style: none;
  align-items: center;
  gap: 8px;
  padding: 0;
  margin: 0;
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;

  a {
    display: flex;
    align-items: center;
    gap: 4px;
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }

  span.current {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }

  svg.separator {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 16px;
  }
`;

interface BreadcrumbsProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const t = useTranslations('Navigation');

  // Schema JSON-LD cho Breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": t('home'),
        "item": "https://talunglogistics.com"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": item.href ? `https://talunglogistics.com${item.href}` : undefined
      }))
    ]
  };

  return (
    <BreadcrumbNav aria-label="Breadcrumb">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BreadcrumbList>
        <BreadcrumbItem>
          {/* Sửa href thành string template để tránh lỗi Type */}
          <Link href="/">
            <RiHome4Line /> {t('home')}
          </Link>
        </BreadcrumbItem>

        {items.map((item, index) => (
          <BreadcrumbItem key={index}>
            <RiArrowRightSLine className="separator" />
            {item.href ? (
              /* ĐÃ FIX LỖI: Sử dụng ép kiểu string thay vì any */
              <Link href={item.href as never}>{item.label}</Link>
            ) : (
              <span className="current">{item.label}</span>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </BreadcrumbNav>
  );
}