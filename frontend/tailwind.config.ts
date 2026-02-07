import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          500: '#2563eb',
          700: '#1d4ed8'
        },
        accent: '#86efac'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(30,64,175,0.12)'
      }
    }
  },
  plugins: []
};

export default config;
