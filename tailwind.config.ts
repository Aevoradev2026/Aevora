import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        black: '#000000',
        void: '#05050A',
        surface: '#0A0A12',
        'border-dim': 'rgba(255,255,255,0.07)',
        'border-mid': 'rgba(255,255,255,0.12)',
        'text-primary': '#ffffff',
        'text-secondary': 'rgba(255,255,255,0.5)',
        'text-muted': 'rgba(255,255,255,0.28)',
        'galaxy-orange': '#ff8040',
        'galaxy-pink': '#ff50a0',
        'galaxy-purple': '#8040ff',
        'galaxy-blue': '#2050ff',
      },
      animation: {
        'spin-slow': 'spin 22s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
}
export default config
