/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        proxi: {
          900: '#0f172a', // Deep slate
          800: '#1e293b',
          700: '#334155',
          accent: '#06b6d4',  // Cyan 500
          accentHover: '#0891b2', // Cyan 600
          neon: '#8b5cf6', // Violet 500
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
