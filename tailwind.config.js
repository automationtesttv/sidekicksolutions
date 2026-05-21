/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./views/**/*.html",
    "./public/js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        peach: {
          100: '#fff1ee',
          200: '#ffe4dc',
          300: '#ffccc0',
          400: '#ffaa99',
        },
        rose: {
          soft: '#fff0f3',
        },
      },
      backgroundImage: {
        'gradient-hero':   'linear-gradient(135deg, #fdf4ff 0%, #fce7f3 40%, #eff6ff 100%)',
        'gradient-card':   'linear-gradient(135deg, #ffffff 0%, #fdf4ff 100%)',
        'gradient-accent': 'linear-gradient(90deg, #f9a8d4 0%, #c4b5fd 50%, #93c5fd 100%)',
        'gradient-warm':   'linear-gradient(135deg, #ffedd5 0%, #fce7f3 100%)',
        'gradient-subtle': 'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)',
        'gradient-cta':    'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
        'gradient-badge':  'linear-gradient(90deg, #fdf2f8 0%, #fef3c7 100%)',
      },
      boxShadow: {
        'card':    '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 4px 24px 0 rgb(0 0 0 / 0.06)',
        'card-lg': '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 10px 40px -8px rgb(0 0 0 / 0.10)',
        'nav':     '0 1px 0 0 rgb(0 0 0 / 0.06)',
        'btn':     '0 4px 14px 0 rgb(124 58 237 / 0.35)',
        'glow':    '0 0 40px 0 rgb(167 139 250 / 0.25)',
      },
      letterSpacing: {
        tightest: '-0.05em',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'fade-up':      'fadeUp 0.6s ease forwards',
        'fade-in':      'fadeIn 0.5s ease forwards',
        'slide-right':  'slideRight 0.5s ease forwards',
        'float':        'float 6s ease-in-out infinite',
        'pulse-slow':   'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-x':   'gradientX 8s ease infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%':   { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
