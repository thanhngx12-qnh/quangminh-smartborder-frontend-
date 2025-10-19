// dir: ~/quangminh-smart-border/frontend/src/components/shared/StaticPageLayout.tsx
'use client';

import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import FadeInWhenVisible from '../animations/FadeInWhenVisible';

// --- Styled Components ---
const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
`;

const PageHeader = styled.header`
  padding: 80px 20px;
  background-color: ${({ theme }) => theme.colors.surface};
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  h1 {
    font-size: 42px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }
  
  time {
    margin-top: 8px;
    display: block;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 14px;
  }
`;

const ContentWrapper = styled.article`
  max-width: 800px;
  margin: 60px auto;
  padding: 0 20px;
  
  // Style cho nội dung Markdown
  font-size: 16px;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textSecondary};

  h2, h3 { /* ... (style giống như trang chi tiết tin tức) */ }
  p, li, a, blockquote { /* ... */ }
`;

// --- Component ---
interface StaticPageLayoutProps {
  title: string;
  lastUpdated: string;
  content: string;
}

export default function StaticPageLayout({ title, lastUpdated, content }: StaticPageLayoutProps) {
  return (
    <PageWrapper>
      <FadeInWhenVisible>
        <PageHeader>
          <h1>{title}</h1>
          <time>{lastUpdated}</time>
        </PageHeader>
      </FadeInWhenVisible>
      
      <FadeInWhenVisible>
        <ContentWrapper>
          {/* Thay thế \n bằng \n\n để ReactMarkdown hiểu là xuống dòng */}
          <ReactMarkdown>{content.replace(/\n/g, '  \n')}</ReactMarkdown>
        </ContentWrapper>
      </FadeInWhenVisible>
    </PageWrapper>
  );
}