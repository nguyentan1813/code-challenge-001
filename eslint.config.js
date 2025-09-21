/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const js = require("@eslint/js")
const tseslint = require("typescript-eslint")
const prettier = require("eslint-config-prettier")
const eslintPluginPrettier = require("eslint-plugin-prettier")

module.exports = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    files: ["src/**/*.{ts,js}"],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
]
