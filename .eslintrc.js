module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["standard"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "comma-dangle": ["error", "only-multiline"],
    semi: [
      "error",
      "always",
      {
        omitLastInOneLineBlock: true,
      },
    ],
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "space-before-function-paren": ["off"],
  },
};
