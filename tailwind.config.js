/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        white: '#fff',
        black: '#000',
        crayola: '#b0b7bf',
        chineseBlack: '#121212',
        manatee: '#97a1ac',
        darkGreen: '#002E22',
        darkSlateGray: '#355F53',
        antiFlashWhite: '#EFF1F3',
        columbiaBlue: '#C4DBD5',
        graniteGray: '#5E646B',
        brightGray: '#E5F2EF', // Used the last value for bright-gray
        spanishViridian: '#008060',
        oriolesOrange: '#EB4B1A',
        lava: '#CD1C13',
        platinum: '#DFE3E6',
        feldgrau: '#445B54',
        vividGamboge: '#FD9400',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      spacing: {
        18: '4.5rem',
        72: '18rem',
      },
    },
  },
  plugins: [],
};
