// dir: ~/quangminh-smart-border/frontend/src/styles/theme.ts
import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  name: 'light', // <--- THÊM DÒNG NÀY
  colors: {
    // Semantic Colors
    background: '#FFFFFF',           // Nền chính sáng
    surface: '#F8FAFC',              // Nền card, section sáng
    text: '#0F172A',                 // Chữ chính đậm
    textSecondary: '#64748B',        // Chữ phụ trung bình
    textMuted: '#94A3B8',            // Chữ rất nhạt
    
    // Brand Colors
    primary: '#1E293B',              // Navy đậm - màu chính
    secondary: '#334155',            // Navy trung bình - màu phụ
    accent: '#0EA5E9',               // Cyan - màu nổi bật
    
    // Status Colors
    success: '#10B981',              // Xanh lá thành công
    warning: '#F59E0B',              // Cam cảnh báo
    error: '#EF4444',                // Đỏ lỗi
    info: '#3B82F6',                 // Xanh dương thông tin
    
    // Utility Colors
    white: '#FFFFFF',
    black: '#0F172A',
    
    // Border Colors
    border: '#E2E8F0',               // Viền chính sáng
    borderLight: '#F1F5F9',          // Viền rất nhạt
    divider: '#E2E8F0',              // Đường phân cách
    
    // Component Specific
    header: {
      bg: '#1E293B',                 // Navy đậm cho header
      text: '#FFFFFF',               // Chữ trắng trên header
    },
    footer: {
      bg: '#1E293B',                 // Navy đậm cho footer
      text: '#F1F5F9',               // Chữ sáng trên footer
      textSecondary: '#94A3B8',      // Chữ phụ trên footer
    },
  },
  fonts: {
    body: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    heading: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
};

export const darkTheme: DefaultTheme = {
  name: 'dark', // <--- THÊM DÒNG NÀY
  colors: {
    // Semantic Colors
    background: '#0F172A',           // Nền chính tối
    surface: '#1E293B',              // Nền card, section tối
    text: '#F1F5F9',                 // Chữ chính sáng
    textSecondary: '#CBD5E1',        // Chữ phụ sáng
    textMuted: '#64748B',            // Chữ nhạt trên nền tối
    
    // Brand Colors
    primary: '#F1F5F9',              // Chữ sáng làm primary trên nền tối
    secondary: '#E2E8F0',            // Màu xám sáng
    accent: '#0EA5E9',               // Cyan giữ nguyên
    
    // Status Colors
    success: '#34D399',              // Xanh lá sáng hơn trên nền tối
    warning: '#FBBF24',              // Cam sáng hơn
    error: '#F87171',                // Đỏ sáng hơn
    info: '#60A5FA',                 // Xanh dương sáng hơn
    
    // Utility Colors
    white: '#FFFFFF',
    black: '#0F172A',
    
    // Border Colors
    border: '#334155',               // Viền tối
    borderLight: '#475569',          // Viền sáng hơn trên nền tối
    divider: '#334155',              // Đường phân cách tối
    
    // Component Specific
    header: {
      bg: '#1E293B',                 // Nền tối cho header
      text: '#F1F5F9',               // Chữ sáng trên header
    },
    footer: {
      bg: '#0F172A',                 // Nền tối hơn cho footer
      text: '#F1F5F9',               // Chữ sáng trên footer
      textSecondary: '#64748B',      // Chữ phụ trên footer
    },
  },
  fonts: {
    body: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    heading: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
};