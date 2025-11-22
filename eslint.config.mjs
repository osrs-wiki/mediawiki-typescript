import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'import': importPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'import/namespace': 'off',
      'import/no-unresolved': 'off',
      'import/order': [
        'warn',
        {
          'alphabetize': {
            order: 'asc',
            caseInsensitive: true,
          },
          'groups': [
            ['builtin', 'external'],
            'internal',
            ['sibling', 'parent', 'index'],
            'object',
          ],
          'newlines-between': 'always',
          'pathGroupsExcludedImportTypes': ['builtin'],
        },
      ],
    },
  },
  prettierConfig,
  {
    ignores: ['dist', 'node_modules', '.turbo'],
  },
];
