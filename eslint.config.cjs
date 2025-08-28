// ESLint shares configuration via this file. Keep it as CJS because
// `package.json` uses "type": "module" — ESLint expects a CommonJS
// config when the project is ESM. This file sets parsers, plugins and
// per-file overrides for TypeScript and Vue Single File Components.
const vue = require('eslint-plugin-vue')
const vueParser = require('vue-eslint-parser')
const tseslint = require('@typescript-eslint/eslint-plugin')
const tsparser = require('@typescript-eslint/parser')
const prettier = require('eslint-plugin-prettier')
const globals = require('globals')

module.exports = [
  {
    files: ['**/*.ts', '**/*.vue'],
    ignores: ['dist/**', 'node_modules/**'],
    // languageOptions configures the parser used for files matched above.
    // We use vue-eslint-parser to properly parse SFC templates and delegate
    // script parsing to @typescript-eslint/parser via parserOptions.parser.
    languageOptions: {
      // Use the vue parser at the top level so .vue SFCs (template blocks)
      // are parsed correctly. Delegate TS script parsing to the
      // @typescript-eslint parser via `parserOptions.parser`.
      parser: vueParser,
      parserOptions: {
        // The script blocks inside .vue files should be parsed by the TS parser.
        parser: tsparser,
        ecmaVersion: 2021,
        sourceType: 'module',
        // Ensure .vue files are recognized by the parser pipeline.
        extraFileExtensions: ['.vue'],
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
    // Plugins provide additional rules. Keep eslint-plugin-prettier so that
    // formatting errors surface as lint issues when enabled.
    plugins: {
      vue,
      '@typescript-eslint': tseslint,
      prettier,
    },
    // Project rules. We start from the recommended rule sets above and then
    // apply a small number of local overrides.
    rules: {
      // Vue 3 recommended rules
      ...vue.configs['vue3-recommended']?.rules,

      // TypeScript recommended rules
      ...tseslint.configs.recommended.rules,

      // Prettier integration — enable to fail linting on formatting issues.
      // 'prettier/prettier': 'error',

      // Custom tweaks
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]