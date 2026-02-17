/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.tsx',
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#ffd301',
        secondary: '#07a23a',
        primarybg: '#f8eb67',
        quaternary: '#333333',
        quinary: '#444444',
        senary: '#555555',
      },
    },
  },
  plugins: [],
};
