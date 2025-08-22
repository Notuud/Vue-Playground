const vue = require('eslint-plugin-vue')
const tseslint = require('@typescript-eslint/eslint-plugin')
const tsparser = require('@typescript-eslint/parser')
const prettier = require('eslint-plugin-prettier')
const globals = require('globals')

module.exports = [
  {
    files: ['**/*.ts', '**/*.vue'],
    ignores: ['dist/**', 'node_modules/**'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        parser: '@typescript-eslint/parser', // for <script setup lang="ts">
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
      ],
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': tseslint,
      prettier,
    },
    rules: {
      // Vue 3 recommended rules
      ...vue.configs['vue3-recommended']?.rules,

      // TypeScript recommended rules
      ...tseslint.configs.recommended.rules,

      // Prettier integration
      // 'prettier/prettier': 'error',

      // Custom tweaks
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]