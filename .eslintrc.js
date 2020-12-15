module.exports = {
  root: true,
  env: {
    node: true,
    webextensions: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/valid-v-model': 0,
    'global-require': 0,
    'no-tabs': 0,
    'no-mixed-spaces-and-tabs': 0,
    'max-len': 0,
  },
};
