'use client';

import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#e6f0e6',
          100: '#c0dbc0',
          200: '#99c599',
          300: '#73b073',
          400: '#4da94d',
          500: '#2d622f', // brand green
          600: '#245228',
          700: '#1c3d1c',
          800: '#142911',
          900: '#0a1405',
        },
        danger: {
          50: '#fdeaea',  // very light red
          100: '#f8c8c8',
          200: '#f39f9f',
          300: '#ed7676',
          400: '#e64d4d',
          500: '#741111', // brand red
        },
        neutral: {
          50: '#F2F0EB', // background
          100: '#E0DDD6',
          200: '#CAC6BD',
          300: '#B5B0A5',
          400: '#A09B8C',
          500: '#8B8674',
          600: '#75705F',
          700: '#605A4B',
          800: '#4A4537',
          900: '#353222',
        },
      },
    },
  },
  typography: {
    h1: {
      fontFamily: 'Playball, cursive',
      fontSize: '1.5rem',
      color: '#741111', // default h1 color
    },
  },
});

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <CssVarsProvider theme={theme}>
      {children}
    </CssVarsProvider>
  );
}
