/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-purple': {
          DEFAULT: '#8A2BE2',
          glow: 'rgba(138, 43, 226, 0.5)',
        },
        'game-blue': {
          DEFAULT: '#00BFFF',
          glow: 'rgba(0, 191, 255, 0.5)',
        },
        'game-dark': '#0B0B0F',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        tech: ['Outfit', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}


