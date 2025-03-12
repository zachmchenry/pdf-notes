// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // <-- Add this line to enable class-based dark mode
  theme: {
    extend: {},
  },
  plugins: [],
}
