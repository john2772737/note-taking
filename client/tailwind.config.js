/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      height: {
        '30': '7.5rem',
        '15': '3.75rem',
        '40' : '10rem'
      },
      width: {
        '15': '3.75rem',
        '30': '7.5rem',
        '50': '50rem',
        '200px' : '200px',

      },
      margin: {
        '30': '7.5rem',
        '50': '12.5rem',
      },
      spacing: {
        '30': '7.5rem', // Equivalent to 30 * 0.25 rem
      },
      padding: {
        '20px' : '20px',
      },
    },
  },
  plugins: [],
}

