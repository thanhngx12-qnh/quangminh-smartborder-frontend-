// dir: ~/quangminh-smart-border/frontend/src/styles/GlobalStyles.ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
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
  
  /* Thêm các độ đậm nhạt khác nếu bạn cần */

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    /* font-family vẫn giữ nguyên, nó sẽ sử dụng @font-face ở trên */
    font-family: ${({ theme }) => theme.fonts.body};
    transition: all 0.25s linear;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;