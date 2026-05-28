import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eefaff',
          100: '#d8f2ff',
          200: '#b9e9ff',
          300: '#85daff',
          400: '#48c2ff',
          500: '#1ea6ff',
          600: '#0086e6',
          700: '#006bb8',
          800: '#005a96',
          900: '#054b7c'
        },
        accent: {
          400: '#ff7a3d',
          500: '#ff5a14',
          600: '#e84300'
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(30,166,255,0.55)'
      },
      backgroundImage: {
        'grid-light':
          'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
        'grid-dark':
          'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
};

export default config;
