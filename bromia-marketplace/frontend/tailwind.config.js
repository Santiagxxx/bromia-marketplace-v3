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
        'float-slow': 'floatSlow 5s ease-in-out infinite',
        'float-delayed': 'floatSlow 6s ease-in-out 1.5s infinite',
        'wiggle-soft': 'wiggleSoft 2.5s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2.2s cubic-bezier(0.24, 0, 0.38, 1) infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1.5deg)' },
        },
        wiggleSoft: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.96)', boxShadow: '0 0 0 0 rgba(217, 78, 143, 0.45)' },
          '70%': { transform: 'scale(1)', boxShadow: '0 0 0 12px rgba(217, 78, 143, 0)' },
          '100%': { transform: 'scale(0.96)', boxShadow: '0 0 0 0 rgba(217, 78, 143, 0)' },
        }
      }
    },
  },
  plugins: [],
}
