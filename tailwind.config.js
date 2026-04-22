/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#E6F0FF',
          600: '#0052CC',
          700: '#003D99',
        },
        accent: {
          50:  '#E6F9F1',
          500: '#00B876',
        },
        warning: { 500: '#F59E0B' },
        danger:  { 500: '#EF4444' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
