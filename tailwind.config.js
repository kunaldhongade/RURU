/** @type {import('tailwindcss').Config} */
export default {
  darkMode:'class', // with this we're telling tailwind to control the dark mode with dark class.
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins'],
      },
    },
  },
  plugins: [],
};
