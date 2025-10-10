// dir: ~/quangminh-smart-border/frontend/src/styles/theme.ts
import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  colors: {
    background: '#FFFFFF',
    surface: '#F6F9FB',
    text: '#0B1F34',
    primary: '#0B2E4A', // Navy
    accent: '#00A99D', // Cyan
    green: '#10B981',
    white: '#FFFFFF',
  },
  fonts: {
    body: 'Inter, sans-serif',
  },
  // ... sau này có thể thêm breakpoints, spacing, ...
};

export const darkTheme: DefaultTheme = {
  colors: {
    background: '#0B1220',
    surface: '#0F1724',
    text: '#E6EEF8',
    primary: '#FFFFFF',
    accent: '#00A99D',
    green: '#10B981',
    white: '#FFFFFF',
  },
  fonts: {
    body: 'Inter, sans-serif',
  },
};