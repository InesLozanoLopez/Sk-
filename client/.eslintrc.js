module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "react-app",
  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaVersion: 7,
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
  },
  rules: {
    indent: ["error", 2],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
  },
  plugins: ["@typescript-eslint"],
};
