/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chat-dark': '#131313',
        'chat-gray': '#2e333d',
        'chat-blue': '#6b8afd',
        'home-blue': '#290131',
      },
    },
  },
  plugins: [],
}

