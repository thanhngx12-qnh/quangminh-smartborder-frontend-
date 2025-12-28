// dir: frontend/src/components/shared/StaticPageLayout.tsx
'use client';

import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import FadeInWhenVisible from '../animations/FadeInWhenVisible';

// --- Styled Components ---

const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 80vh;
`;

const PageHeader = styled.header`
  padding: 80px 20px;
  background-color: ${({ theme }) => theme.colors.surfaceAlt}; // Nền xám nhẹ
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 8px;
  }
  
  time {
    display: block;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 14px;
    font-style: italic;
  }
`;

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 20px;
`;

const Prose = styled.article`
  font-size: 16px;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};

  h2 {
    font-size: 24px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-top: 40px;
    margin-bottom: 16px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.border};
    padding-bottom: 8px;
  }
  
  h3 {
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin-top: 30px;
    margin-bottom: 12px;
  }

  p {
    margin-bottom: 20px;
  }

  ul, ol {
    margin-bottom: 20px;
    padding-left: 24px;
  }

  li {
    margin-bottom: 8px;
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: underline;
    &:hover { text-decoration: none; }
  }
  
  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

interface StaticPageLayoutProps {
  title: string;
  lastUpdated?: string; // Optional
  children?: React.ReactNode; // Hỗ trợ custom children
  content?: string; // Hỗ trợ markdown string
}

export default function StaticPageLayout({ title, lastUpdated, content, children }: StaticPageLayoutProps) {
  return (
    <PageWrapper>
      <FadeInWhenVisible>
        <PageHeader>
          <h1>{title}</h1>
          {lastUpdated && <time>{lastUpdated}</time>}
        </PageHeader>
      </FadeInWhenVisible>
      
      <ContentContainer>
        <FadeInWhenVisible delay={0.2}>
          <Prose>
            {content ? (
              // Xử lý markdown: thay thế \n bằng \n\n để xuống dòng đúng
              <ReactMarkdown>{content.replace(/\n/g, '\n\n')}</ReactMarkdown>
            ) : (
              children
            )}
          </Prose>
        </FadeInWhenVisible>
      </ContentContainer>
    </PageWrapper>
  );
}