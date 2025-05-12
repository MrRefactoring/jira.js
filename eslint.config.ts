import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import stylisticJs from '@stylistic/eslint-plugin-js';
import stylisticTs from '@stylistic/eslint-plugin-ts';

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.{js,mjs,cjs,ts}'], languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@stylistic/js': stylisticJs,
      '@stylistic/ts': stylisticTs,
    },
    rules: {
      '@stylistic/js/no-trailing-spaces': 'error',
      '@stylistic/ts/indent': ['error', 2],
      '@stylistic/ts/lines-between-class-members': [
        'error',
        'always',
        {
          exceptAfterOverload: true,
          exceptAfterSingleLine: true,
        },
      ],
      '@stylistic/ts/padding-line-between-statements': [
        'error',
        // Return statements
        { blankLine: 'always', prev: '*', next: 'return' },
        // Import statements
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
      ],
      '@stylistic/ts/quotes': ['error', 'single'],
      '@stylistic/ts/semi': ['error', 'always'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off', // todo fix it
      '@typescript-eslint/no-unnecessary-condition': 'error', // todo fix it
      '@typescript-eslint/no-unsafe-argument': 'off', // todo fix it
      '@typescript-eslint/no-unsafe-assignment': 'off', // todo fix it
      '@typescript-eslint/no-unsafe-call': 'off', // todo fix it
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@stylistic/ts/object-curly-spacing': ["error", "always"]
    },
  },
]);
