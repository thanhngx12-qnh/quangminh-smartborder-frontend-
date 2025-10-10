// dir: ~/quangminh-smart-border/frontend/src/styles/GlobalStyles.ts
'use client'
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
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
    font-family: ${({ theme }) => theme.fonts.body};
    transition: all 0.25s linear;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;