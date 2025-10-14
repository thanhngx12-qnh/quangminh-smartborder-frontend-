// dir: ~/quangminh-smart-border/frontend/src/styles/styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      // Semantic Colors - Màu theo ngữ nghĩa
      background: string;        // Nền chính của trang
      surface: string;           // Nền cho card, section
      text: string;              // Chữ chính
      textSecondary: string;     // Chữ phụ, mô tả
      textMuted: string;         // Chữ rất nhạt (thêm mới)
      
      // Brand Colors - Màu thương hiệu
      primary: string;           // Màu chính (Navy)
      secondary: string;         // Màu phụ (thêm mới)
      accent: string;            // Màu nổi bật (Cyan)
      
      // Status Colors - Màu trạng thái
      success: string;           // Xanh lá thành công
      warning: string;           // Cam cảnh báo (thêm mới)
      error: string;             // Đỏ lỗi (thêm mới)
      info: string;              // Xanh dương thông tin (thêm mới)
      
      // Utility Colors - Màu tiện ích
      white: string;
      black: string;             // Thêm mới
      
      // Border & Divider Colors
      border: string;            // Viền chính
      borderLight: string;       // Viền nhạt (thêm mới)
      divider: string;           // Đường phân cách (thêm mới)
      
      // Component Specific
      header: {
        bg: string;
        text: string;
      };
      footer: {
        bg: string;
        text: string;
        textSecondary: string;
      };
    };
    fonts: {
      body: string;
      heading: string;           // Thêm mới
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}