/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'source': ['Source Sans 3', 'system-ui', 'sans-serif'],
        'tiktok': ['TikTok Sans', 'system-ui', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'], // Set Inter as default sans font
      },
    },
  },
  plugins: [],
}
