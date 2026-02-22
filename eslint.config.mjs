import js from "@eslint/js";
import globals from "globals";

export default [
  // Tavsiya etilgan qoidalarni qo'llash
  js.configs.recommended,

  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es6
      },
      parserOptions: {
        ecmaFeatures: {
          modules: true,
          spread: true,
          restParams: true
        }
      }
    },
    rules: {
      "no-unused-vars": "error", // 2 - bu error darajasi
      "no-undef": "error"
    }
  }
];
