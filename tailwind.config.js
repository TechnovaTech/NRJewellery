/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': '#F9F9F9',
        'text-primary': '#111111',
        'text-secondary': '#555555',
        'accent-black': '#000000',
        'border-light': '#E0E0E0',
        'gold': '#C6A664',
        'hover-beige': '#F2E8D5',
      },
      fontFamily: {
        'poppins': ['Playfair Display', 'serif'],
        'inter': ['Lato', 'sans-serif'],
        'space': ['Crimson Text', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shine': 'shine 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #8FBC8F, 0 0 10px #8FBC8F, 0 0 15px #8FBC8F' },
          '100%': { boxShadow: '0 0 10px #8FBC8F, 0 0 20px #8FBC8F, 0 0 30px #8FBC8F' },
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}