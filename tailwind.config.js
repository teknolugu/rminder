const colors = require('tailwindcss/colors');
const customTheme = require('comps-ui/dist/theme');
const switchTheme = require('switch-theme');

module.exports = {
  purge: false,
  darkMode: false,
  theme: {
    extend: {
    	colors: {
    		'light-blue': colors.lightBlue,
	      indigo: colors.indigo,
	      cyan: colors.cyan,
	      purple: colors.purple,
	      fuchsia: colors.fuchsia,
	      orange: colors.orange,
    	},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [switchTheme(customTheme)],
};
