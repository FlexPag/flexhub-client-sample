// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:react/jsx-runtime',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:unicorn/recommended',
    'plugin:sonarjs/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'sonarjs', 'unicorn'],
  rules: {
    'no-nested-ternary': 'off',
    'unicorn/no-nested-ternary': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'import/extensions': [
      'error',
      'always',
      {
        ignorePackages: true,
        pattern: {
          tsx: 'never',
          ts: 'never',
        },
      },
    ],
    'import/no-unresolved': 'off',
    'no-use-before-define': 'off',
    'import/order': [
      'error',
      {
        groups: [['external', 'builtin'], 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: 'app/**',
            group: 'parent',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'no-throw-literal': 'off',
    'consistent-return': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        replacements: {
          props: {
            properties: false,
          },
          ref: {
            reference: false,
          },
          params: {
            parameters: false,
          },
        },
      },
    ],
    'react/require-default-props': 'off',
    'react/destructuring-assignment': 'off',
    'no-param-reassign': 'off',
    'unicorn/no-array-for-each': 'off',
    'no-restricted-syntax': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-fragments': ['error', 'element'],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
      },
    },
  },
};
