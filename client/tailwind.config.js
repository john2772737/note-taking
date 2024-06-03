/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '30': '7.5rem',
        '15': '3.75rem',
      },
    },
  },
  plugins: [],
}

