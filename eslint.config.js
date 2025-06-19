import css from "@eslint/css";
import js from "@eslint/js";
import json from "@eslint/json";
import { defineConfig } from "eslint/config";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import unusedImports from "eslint-plugin-unused-imports";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";


// Base configurations
const baseConfig = {
  files: ["**/*.{js,mjs,cjs,ts,vue}"],
  languageOptions: { globals: globals.browser },
};

// Import rules configuration
const importRules = {
  "import/order": [
    "warn",
    {
      groups: ["builtin", "external", "internal", ["parent", "sibling", "index"]],
      pathGroups: [{ pattern: "@/**", group: "internal" }],
      pathGroupsExcludedImportTypes: ["builtin"],
      alphabetize: { order: "asc", caseInsensitive: true },
      "newlines-between": "always",
    },
  ],
  "import/extensions": [
    "error",
    "ignorePackages",
    {
      "ts": "never",
      "js": "never",
      "vue": "always"
    }
  ]
};

// Unused imports rules configuration
const unusedImportsRules = {
  "no-unused-vars": "off",
  "unused-imports/no-unused-imports": "error",
  "unused-imports/no-unused-vars": [
    "warn",
    {
      vars: "all",
      varsIgnorePattern: "^_",
      args: "after-used",
      argsIgnorePattern: "^_",
    },
  ],
};

export default defineConfig([
  // Core configurations
  js.configs.recommended,
  tseslint.configs.recommended,
  pluginVue.configs["flat/essential"],
  prettierConfig,

  // JavaScript/TypeScript/Vue files configuration
  {
    ...baseConfig,
    plugins: { prettier },
    rules: {
      "prettier/prettier": "warn",
    },
  },

  // Vue specific configuration
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
    rules: {
      "vue/multi-word-component-names": "off"
    }
  },

  // JSON files configuration
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
  },

  // CSS files configuration
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
  },

  // Import rules configuration
  {
    files: ["**/*.{js,ts,vue}"],
    plugins: { import: importPlugin },
    rules: importRules,
  },

  // Unused imports configuration
  {
    plugins: { "unused-imports": unusedImports },
    rules: unusedImportsRules,
  },
]);
