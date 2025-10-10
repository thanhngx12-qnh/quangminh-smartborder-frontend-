// dir: ~/quangminh-smart-border/frontend/src/styles/styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      surface: string;
      text: string;
      primary: string;
      accent: string;
      green: string;
      white: string;
    };
    fonts: {
      body: string;
    };
  }
}