import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

// Replaces CRA's "react-app" preset, which came from react-scripts.
export default tseslint.config(
  { ignores: ["build", "node_modules"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      // CRA's react-app preset reported these as warnings and did not enable
      // no-explicit-any at all. Kept at that severity so the migration does not
      // smuggle in a 36-error cleanup of unrelated code; tighten deliberately.
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-unused-expressions": "warn",
      // Header sets this from the route on mount; pre-existing and deliberate.
      // Flagged by eslint-plugin-react-hooks 7, which CRA never ran.
      "react-hooks/set-state-in-effect": "warn",
    },
  }
);
