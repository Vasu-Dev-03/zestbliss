/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out forwards',
        'slideIn': 'slideIn 0.3s ease-in-out forwards',
        'heartbeat': 'heartbeat 1.5s ease-in-out',
        'check': 'check 0.5s ease-in-out forwards',
        'bounce-slow': 'bounce 3s infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse-shadow': 'pulse-shadow 2s infinite',
        'notification-pulse': 'notification-pulse 2s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        }
      },
      transitionDuration: {
        '400': '400ms',
        '2000': '2000ms',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      zIndex: {
        '60': '60',
        '70': '70',
      },
      boxShadow: {
        'soft': '0 4px 10px rgba(0, 0, 0, 0.05)',
        'medium': '0 6px 15px rgba(0, 0, 0, 0.1)',
        'hard': '0 8px 30px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
  // Enable JIT mode for faster builds
  mode: 'jit',
} 