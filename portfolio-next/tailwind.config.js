/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#0B1221', // Deep Midnight Navy
        surface: '#151B28',
        primary: '#F8FAFC',
        secondary: '#94A3B8',
        accent: '#FF3300',
        text: {
          primary: '#F1F5F9',
          secondary: '#64748B',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};