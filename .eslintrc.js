export const env = {
  browser: true,
  es2021: true,
  jest: false,
  extends: [
    'plugin:react/recommended',
    'plugin:i18next/recommended'
  ],

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'i18next'],
  rules: {
    'react/jsx-indent': [1, 2],
    'react/jsx-indent-props': [1, 2],
    indent: [1, 2],
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'warn',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'i18next/no-literal-string': [
      'error', 
      { 
        markupOnly: true,
        ignoreAttribute: ['data-testid', 'to'] 
      }
    ]
  },
  globals: {
    __IS_DEV__: true,
  },
};
export const extends = ['plugin:storybook/recommended'];
