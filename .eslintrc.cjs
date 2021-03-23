module.exports = {
  extends: [
    'eslint:recommended',
  ],
  parser: 'babel-eslint',
  env: {
    'browser': true,
    'es6': true,
    'node': true,
  },
  rules: {
    'indent': ['error', 2],
    'no-console': 'off',
    'no-unreachable': 'off',
    'no-unused-vars': 'off',
    'semi': ["error", 'always'],
  },
};