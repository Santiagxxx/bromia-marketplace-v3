/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bromia: {
          lavender: '#F2D9FA',
          'lavender-soft': '#FAF0FD',
          'lavender-deep': '#E4BDF2',
          cocoa: '#5D3228',
          'cocoa-dark': '#3E1F18',
          'cocoa-light': '#845044',
          berry: '#D94E8F',
          'berry-soft': '#FCE7F1',
          gold: '#E5A93C',
          cream: '#FFFDFB'
        }
      },
      fontFamily: {
        display: ['"Fredoka"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        script: ['"Caveat"', 'cursive']
      },
      boxShadow: {
        'bromia': '0 14px 34px -10px rgba(93, 50, 40, 0.14)',
        'bromia-lg': '0 24px 48px -12px rgba(93, 50, 40, 0.22)',
      },
      animation: {
        'float-slow': 'floatSlow 5.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
        'float-delayed': 'floatSlow 6.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) 1.5s infinite',
        'wiggle-soft': 'wiggleSoft 2.5s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2.2s cubic-bezier(0.24, 0, 0.38, 1) infinite',
        'gentle-drift': 'gentleDrift 8s ease-in-out infinite',
        'drift-delayed': 'gentleDrift 9s ease-in-out 2s infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'bounce-subtle': 'bounceSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(1deg)' },
        },
        wiggleSoft: {
          '0%, 100%': { transform: 'rotate(-2.5deg)' },
          '50%': { transform: 'rotate(2.5deg)' },
        },
        gentleDrift: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(8px, -12px) scale(1.04)' },
          '66%': { transform: 'translate(-8px, -6px) scale(0.97)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.025)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.96)', boxShadow: '0 0 0 0 rgba(217, 78, 143, 0.45)' },
          '70%': { transform: 'scale(1)', boxShadow: '0 0 0 10px rgba(217, 78, 143, 0)' },
          '100%': { transform: 'scale(0.96)', boxShadow: '0 0 0 0 rgba(217, 78, 143, 0)' },
        }
      }
    },
  },
  plugins: [],
}
