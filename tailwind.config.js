/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        heading: ['Raleway', 'sans-serif'],
      },
      colors: {
        // --- CORE BRAND PALETTE ---
        'brand-navy': '#1B3A7B',
        'brand-orange': '#35B0AB',
        'brand-orange-hover': '#2d8f8a',

        'grey-300': '#D1D5DB',
        'grey-700': '#374151',

        // --- LIGHT MODE PALETTE ---
        'text-primary': '#1B3A7B',
        'text-secondary': '#3C4858',
        'text-on-accent': '#FFFFFF',

        'bg-primary': '#F6F8FD',
        'bg-secondary': '#FFFFFF',
        'bg-tertiary': '#EDF2F7',

        'border-color': '#DFE4E9',
        'border-strong': '#3C5A80',

        // --- DARK MODE PALETTE ---
        'dark-brand-orange': '#35B0AB',
        'dark-brand-orange-hover': '#4DCFCA',

        'dark-text-primary': '#F6F8FD',
        'dark-text-secondary': '#9CA3AF',
        'dark-text-on-accent': '#FFFFFF',

        'dark-bg-primary': '#0A1931',
        'dark-bg-secondary': '#102A4C',
        'dark-bg-tertiary': '#1F3A61',
        
        'dark-border-color': '#3C5A80',
        'dark-border-strong': '#F6F8FD',

        // --- SYSTEM COLORS ---
        'system-success': '#22c55e', 'system-error': '#ef4444', 'system-warning': '#f59e0b', 'system-info': '#3b82f6',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms',
        'slow': '500ms',
      },
      transitionTimingFunction: {
        'out': 'ease-out',
        'in': 'ease-in',
        'in-out': 'ease-in-out',
      },
      keyframes: {
        'bar-scale': {
          '0%, 100%': { transform: 'scaleY(0.4)' },
          '50%': { transform: 'scaleY(1)' },
        },
        'grid-fade': {
          '0%, 70%, 100%': { opacity: '0.2', transform: 'scale(0.7)' },
          '35%': { opacity: '1', transform: 'scale(1)' },
        },
        'pulsar': {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '0' },
        },
        'spin-reverse': {
          'to': { transform: 'rotate(-360deg)' },
        },
        'shimmer': {
          '100%': { transform: 'translateX(100%)' },
        },
        'toast-in': {
          'from': { opacity: '0', transform: 'translateX(100%)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        'toast-out': {
          'from': { opacity: '1', transform: 'translateX(0)' },
          'to': { opacity: '0', transform: 'translateX(100%)' },
        },
        'slide-in-left': {
          'from': { transform: 'translateX(-100%)' },
          'to': { transform: 'translateX(0)' }
        },
        'slide-out-left': {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(-100%)' }
        },
        'slide-in-right': {
          'from': { transform: 'translateX(100%)' },
          'to': { transform: 'translateX(0)' }
        },
        'slide-out-right': {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(100%)' }
        },
        'progress-stripes': {
          'from': { backgroundPosition: '1rem 0' },
          'to': { backgroundPosition: '0 0' }
        },
      },
      animation: {
        'bar-scale': 'bar-scale 1.2s infinite ease-in-out',
        'grid-fade': 'grid-fade 1.5s infinite ease-in-out',
        'pulsar': 'pulsar 1.2s infinite cubic-bezier(0.4, 0, 0.6, 1)',
        'spin-reverse': 'spin-reverse 1s linear infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'toast-in': 'toast-in 0.3s ease-out forwards',
        'toast-out': 'toast-out 0.3s ease-in forwards',
        'slide-in-left': 'slide-in-left 0.3s ease-out',
        'slide-out-left': 'slide-out-left 0.3s ease-in',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'slide-out-right': 'slide-out-right 0.3s ease-in',
        'progress-stripes': 'progress-stripes 1s linear infinite',
      },
      fill: ({ theme }) => theme('colors'),
      stroke: ({ theme }) => theme('colors'),
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}