// dir: frontend/src/styles/styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: 'light' | 'dark';
    colors: {
      // Semantic Colors
      background: string;
      surface: string;      // Nền card/box
      surfaceAlt: string;   // Nền phụ (ví dụ: xám nhạt cho section xen kẽ)
      
      text: string;
      textSecondary: string;
      textMuted: string;
      textInverse: string;  // Chữ trên nền tối (thường là trắng)

      // Brand Colors (Phú Anh Logistics)
      primary: string;      // Màu chính: Xanh dương #003366
      primaryLight: string; // Hover link/button
      primaryDark: string;  // Nền đậm hơn
      
      secondary: string;    // Màu phụ trợ (background phụ)
      accent: string;       // Màu điểm nhấn: Đỏ #FF0000
      accentHover: string;

      // Status Colors
      success: string;
      warning: string;
      error: string;
      info: string;

      // Utility
      white: string;
      black: string;
      
      // Borders
      border: string;
      divider: string;

      // Component Specific
      header: {
        bg: string;
        text: string;
        borderBottom: string;
      };
      footer: {
        bg: string;
        text: string;
        textSecondary: string;
      };
    };
    fonts: {
      body: string;
      heading: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    // Responsive Breakpoints
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
      wide: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
      card: string;
      hover: string;
    };
  }
}