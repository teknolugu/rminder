/* eslint-disable */
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
    	colors: {
        primary: '#3B82F6',
    		'light-blue': colors.lightBlue,
	      indigo: colors.indigo,
	      cyan: colors.cyan,
	      purple: colors.purple,
	      fuchsia: colors.fuchsia,
	      orange: colors.orange,
        rose: colors.rose,
    	},
    },
  },
  variants: {
    extend: {},
  },
};
