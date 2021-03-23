module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  parser: 'babel-eslint',
  env: {
    'browser': true,
    'es6': true,
    'node': true,
  },
  settings: {
    react: {
      version: '17.0',
    },
  },
  rules: {
    'indent': ['error', 2],
    'no-console': 'off',
    'no-unreachable': 'off',
    'no-unused-vars': 'off',
    'react/display-name': 'off',
    'semi': ["error", 'always'],
  },
};