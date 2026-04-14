/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-primary': '#FF4655', // Vermelho vibrante estilo Riot/Valorant
        'game-accent': '#FFB800', // Cor de cenoura/ouro
        'game-forest': '#7A8A25', // Verde do seu jogo
        'game-earth': '#633C1D',  // Marrom do seu jogo
        'game-light': '#F9F9F9',
        'game-dark': '#111111',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        tech: ['Outfit', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'cursive'], // Para o toque retro
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


