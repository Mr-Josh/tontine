import eslint from "@eslint/js";
import expoConfig from "eslint-config-expo/flat.js";

export default [
  eslint.configs.recommended,
  ...expoConfig,
  {
    ignores: [
      "node_modules/**",
      ".expo/**",
      "dist/**",
      "coverage/**",
      ".turbo/**",
    ],
  },
];
