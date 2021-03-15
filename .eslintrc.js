module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-unused-vars': ['warn'], // instead of default error
    indent: ['warn', 2], // instead of default 4
  },
  // fix: 'module' is not defined
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
};
