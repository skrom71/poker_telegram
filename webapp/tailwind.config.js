/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: 'Rubik, ui-serif',
      },
      scale: {
        99: '0.99',
      },
      colors: {
        slate: {
          50: '#f3f4f6',
          100: '#e5e7eb',
          200: '#d1d5db',
          300: '#9ca3af',
          400: '#6b7280',
          500: '#4b5563',
          600: '#374151',
          700: '#27313b',
          800: '#19262d',
          900: '#11181e',
          950: '#0f171c',
        },
      },
    },
  },
  plugins: [],
}
