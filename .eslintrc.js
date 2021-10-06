module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {
    radix: 'off',
    'prefer-destructuring': 'off',
    'no-restricted-syntax': 'off',
    'no-unused-vars': 'off',
    'no-alert': 'off',
    'no-undef': 'off',
    'guard-for-in': 'off',
    'no-var': 'off',
    'no-nested-ternary': 'off',
    'no-return-assign': 'off',
    'no-shadow': 'off',
    'no-empty': 'off',
    'no-underscore-dangle': 'off',
    'func-names': 'off',
    'import/no-unresolved': 'off',
    'consistent-return': 'off',
    'import/extensions': 'off',
    'no-use-before-define': 'off',
    'no-param-reassign': 'off',
    'no-console': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-filename-extension': 'off',
    'react/no-array-index-key': 'off',
    'react/prop-types': 'off',

    'react-hooks/rules-of-hooks': 'error',
  },
};
