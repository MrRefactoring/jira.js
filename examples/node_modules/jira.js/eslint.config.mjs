import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylisticTs from '@stylistic/eslint-plugin-ts'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    plugins: {
      '@stylistic/ts': stylisticTs,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@stylistic/ts/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/ts/indent': ['error', 2],
      '@stylistic/ts/object-curly-newline': ['error', { consistent: true }],
      '@stylistic/ts/object-curly-spacing': ['error', 'always'],
      '@stylistic/ts/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
      '@stylistic/ts/quotes': ['error', 'single'],
      '@stylistic/ts/quote-props': ['error', 'as-needed'],
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
];
