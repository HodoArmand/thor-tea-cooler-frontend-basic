/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./*.{html,js}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      spacing: {
        '18': '4.2rem',
        '19': '4.4rem',
        '20': '4.6rem',
        '22': '4.8rem',
        '23': '4.9rem',
      },
      transitionProperty: {
        'bg': 'background',
        'height': 'height',
        'spacing': 'margin, padding',
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        'spin-slower': 'spin 3s linear infinite',
        'spin-veryslow': 'spin 4s linear infinite',
        'reverse-spin': 'reverse-spin 1s linear infinite',
        'reverse-spin-slow': 'reverse-spin 2s linear infinite',
        'reverse-spin-slower': 'reverse-spin 3s linear infinite',
        'reverse-spin-veryslow': 'reverse-spin 4s linear infinite',
      },
      keyframes: {
        'reverse-spin': {
          from: {
            transform: 'rotate(360deg)'
          },
        }
      }
    },
  }
}