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
        'neon-purple': '#D4AF37',
        'neon-teal': '#8B4513',
        'neon-pink': '#CD853F',
        'electric-blue': '#F5F5DC',
        'pastel-purple': '#FFFAF0',
        'pastel-teal': '#FDF5E6',
        'pastel-pink': '#FAF0E6',
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