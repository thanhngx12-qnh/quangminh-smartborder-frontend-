// dir: frontend/src/components/shared/Breadcrumbs.tsx
'use client';

import styled from 'styled-components';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { RiHome4Line, RiArrowRightSLine } from 'react-icons/ri';

const BreadcrumbNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center; /* Căn giữa mặc định cho Desktop */
  width: 100%;
  padding: 0;
  margin-bottom: 24px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  
  /* Hỗ trợ cuộn ngang nếu nội dung quá dài */
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch; /* Cuộn mượt trên iOS */

  /* Ẩn thanh cuộn để thẩm mỹ */
  &::-webkit-scrollbar { display: none; }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 768px) {
    justify-content: flex-start; /* Trên mobile căn trái để dễ theo dõi từ đầu */
    padding: 0 4px;
  }
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
  flex-shrink: 0; /* Ngăn item bị co lại */

  a, span.current {
    display: inline-block;
    max-width: 150px; /* Giới hạn chiều rộng text để không quá dài */
    overflow: hidden;
    text-overflow: ellipsis; /* Hiện dấu ... nếu tiêu đề quá dài */
    white-space: nowrap;
    vertical-align: middle;
    transition: color 0.2s ease;

    @media (min-width: 769px) {
      max-width: 400px; /* Desktop cho phép tiêu đề dài hơn */
    }
  }

  a {
    display: flex;
    align-items: center;
    gap: 4px;
    color: inherit;
    text-decoration: none;

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
    flex-shrink: 0;
  }

  svg.home-icon {
    font-size: 16px;
    flex-shrink: 0;
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
          <Link href="/">
            <RiHome4Line className="home-icon" /> <span>{t('home')}</span>
          </Link>
        </BreadcrumbItem>

        {items.map((item, index) => (
          <BreadcrumbItem key={index}>
            <RiArrowRightSLine className="separator" />
            {item.href ? (
              <Link href={item.href as never} title={item.label}>
                {item.label}
              </Link>
            ) : (
              <span className="current" title={item.label}>
                {item.label}
              </span>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </BreadcrumbNav>
  );
}