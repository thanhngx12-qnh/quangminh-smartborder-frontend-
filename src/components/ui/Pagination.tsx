// dir: ~/quangminh-smart-border/frontend/src/components/ui/Pagination.tsx
'use client';

import styled, { css } from 'styled-components';
import { Link } from '@/navigation';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

const PaginationWrapper = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
`;

interface PageLinkProps {
  $isActive?: boolean;
  $isDisabled?: boolean;
}

const PageLink = styled(Link)<PageLinkProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }

  ${({ $isActive, theme }) =>
    $isActive &&
    css`
      background-color: ${theme.colors.accent};
      border-color: ${theme.colors.accent};
      color: ${theme.colors.white};
      cursor: default;
    `}
  
  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    `}
`;

const Ellipsis = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  const getPageNumbers = () => {
    const pageNumbers = [];
    // Logic để hiển thị ... khi có quá nhiều trang
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) pageNumbers.push('...');
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - 2) pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <PaginationWrapper aria-label="Pagination">
      <PageLink 
        // SỬA LỖI Ở ĐÂY: Dùng chuỗi URL
        href={`${basePath}?page=${currentPage - 1}`}
        $isDisabled={currentPage === 1}
        as="a"
      >
        <RiArrowLeftSLine />
      </PageLink>

      {pageNumbers.map((num, index) =>
        num === '...' ? (
          <Ellipsis key={`ellipsis-${index}`}>...</Ellipsis>
        ) : (
          <PageLink
            key={num}
            // SỬA LỖI Ở ĐÂY: Dùng chuỗi URL
            href={`${basePath}?page=${num}`}
            $isActive={currentPage === num}
            as="a"
          >
            {num}
          </PageLink>
        )
      )}

      <PageLink
        // SỬA LỖI Ở ĐÂY: Dùng chuỗi URL
        href={`${basePath}?page=${currentPage + 1}`}
        $isDisabled={currentPage === totalPages}
        as="a"
      >
        <RiArrowRightSLine />
      </PageLink>
    </PaginationWrapper>
  );
}