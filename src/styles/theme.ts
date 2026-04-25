// dir: frontend/src/styles/theme.ts
import { DefaultTheme } from 'styled-components';

const breakpoints = {
  mobile: '576px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
};

const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  card: '0 6px 16px rgba(0,0,0,0.08)',
  hover: '0 12px 24px rgba(0,0,0,0.12)',
};

const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
};

export const lightTheme: DefaultTheme = {
  name: 'light',
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceAlt: '#F8F9FA',
    
    text: '#1A1A1A',
    textSecondary: '#404040', // Đậm hơn (từ #4B5563) để đạt chuẩn tương phản
    textMuted: '#636363',     // Đậm hơn (từ #9CA3AF) để khách hàng dễ đọc
    textInverse: '#FFFFFF',

    primary: '#003366',
    primaryLight: '#004c99',
    primaryDark: '#002244',
    
    secondary: '#E6F0FA',
    
    // SỬA: Đỏ đậm hơn một chút (#E60000) để đạt chuẩn Accessibility 4.5:1
    accent: '#E60000',
    accentHover: '#B30000',

    success: '#0D9488', // Teal đậm hơn cho A11y
    warning: '#D97706', // Cam đậm hơn
    error: '#DC2626',
    info: '#2563EB',

    white: '#FFFFFF',
    black: '#000000',

    border: '#D1D5DB', // Đậm hơn một chút để phân tách khối rõ ràng
    divider: '#E5E7EB',

    header: {
      bg: '#FFFFFF',
      text: '#003366',
      borderBottom: '#D1D5DB',
    },
    footer: {
      bg: '#003366',
      text: '#FFFFFF',
      textSecondary: '#E5E7EB',
    },
  },
  fonts: {
    body: 'var(--font-inter), sans-serif',
    heading: 'var(--font-montserrat), sans-serif',
  },
  spacing,
  breakpoints,
  shadows,
};

export const darkTheme: DefaultTheme = {
  name: 'dark',
  colors: {
    background: '#0B1120',
    surface: '#111827',
    surfaceAlt: '#1F2937',
    
    text: '#F9FAFB',
    textSecondary: '#D1D5DB',
    textMuted: '#9CA3AF',
    textInverse: '#111827',

    primary: '#3B82F6',
    primaryLight: '#60A5FA',
    primaryDark: '#1D4ED8',
    
    secondary: '#1E293B',
    
    accent: '#FF4D4D', // Đỏ sáng hơn cho nền tối
    accentHover: '#FF0000',

    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    info: '#60A5FA',

    white: '#FFFFFF',
    black: '#000000',

    border: '#374151',
    divider: '#374151',

    header: {
      bg: '#111827',
      text: '#F9FAFB',
      borderBottom: '#374151',
    },
    footer: {
      bg: '#0B1120',
      text: '#F9FAFB',
      textSecondary: '#9CA3AF',
    },
  },
  fonts: {
    body: 'var(--font-inter), sans-serif',
    heading: 'var(--font-montserrat), sans-serif',
  },
  spacing,
  breakpoints,
  shadows,
};