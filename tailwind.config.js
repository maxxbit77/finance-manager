module.exports = {
  purge: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#42acd2',
          DEFAULT: '#358aa8',
          dark: '#2e7893',
        },
        secondary: {
          light: '#88ffcc',
          DEFAULT: '#55ffb6',
          dark: '#3bb37f',
        },
        terciary: {
          DEFAULT: '#1f2937',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
