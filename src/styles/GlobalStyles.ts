// dir: ~/quangminh-smart-border/frontend/src/styles/GlobalStyles.ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Định nghĩa các biến CSS toàn cục (CSS Variables) */
  :root {
    /* (Chúng ta sẽ định nghĩa các biến màu ở đây sau nếu cần) */
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Định nghĩa font face cho Inter */
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter-SemiBold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  
  /* Reset CSS */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html {
    /* Đảm bảo trang chiếm toàn bộ chiều cao viewport */
    height: 100%;
  }

  body {
    height: 100%;
    /* SỬA LỖI TRÀN MÀN HÌNH */
    /* Thay vì max-width: 100vw, hãy để trình duyệt tự quản lý */
    overflow-x: hidden;
    line-height: 1.5; /* Thêm line-height mặc định cho dễ đọc */

    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  /* Cải thiện khả năng đọc của input, button, ... */
  input, button, textarea, select {
    font: inherit;
    color: inherit;
  }
  
  /* Bỏ style mặc định của button */
  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  /* Style link chung */
  a {
    color: inherit;
    text-decoration: none;
  }
  
  /* Style cho hình ảnh responsive */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }
  
  /* Loại bỏ animation cho những người dùng không mong muốn */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;