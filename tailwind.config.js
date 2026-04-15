/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-primary': '#00A3FF', // Azul tech moderno e leve
        'game-purple': '#8A2BE2',  // Roxo neon tech
        'game-blue': '#00A3FF',    // Mesmo que o primário para consistência
        'game-accent': '#FFB800',
        'game-forest': '#7A8A25',
        'game-earth': '#633C1D',
        'game-light': '#F9F9F9',
        'game-dark': '#0d0d1a',    // Um tom de preto/azul muito escuro para o "tech dark"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        tech: ['Outfit', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'cursive'], // Para o toque retro
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
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


