export default {
  content: [
    './app/page.jsx',
    './app/layout.jsx',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
