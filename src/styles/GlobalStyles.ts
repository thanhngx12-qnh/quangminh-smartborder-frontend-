// dir: frontend/src/styles/GlobalStyles.ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Reset cơ bản */
  *, *::before, *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    height: 100%;
  }

  body {
    height: 100%;
    margin: 0;
    padding: 0;
    
    /* Sử dụng màu và font từ Theme Provider */
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    
    line-height: 1.6;
    overflow-x: hidden; /* Tránh thanh cuộn ngang không mong muốn */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  /* Typography Style - Áp dụng Font Montserrat cho tiêu đề */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.primary}; /* Mặc định tiêu đề màu Xanh Phú Anh */
    font-weight: 700;
    line-height: 1.25;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.accent}; /* Hover màu đỏ */
    }
  }

  button, input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }
  
  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Utility Class cho Container (giữ layout gọn gàng) */
  .container {
    width: 100%;
    max-width: 1280px; /* Chuẩn màn hình desktop hiện đại */
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.md};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      padding: 0 ${({ theme }) => theme.spacing.lg};
    }
  }
`;