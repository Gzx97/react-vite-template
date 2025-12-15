import js from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended, eslintPluginPrettierRecommended],
  files: ["**/*.{ts,tsx}"],
  ignores: ["dist", "node_modules", ".vscode", ".husky"],
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
    // 禁用「不可达代码」检测（核心：防止删除return后的代码）
    "no-unreachable": "off",
    // TS项目需额外禁用@typescript-eslint的对应规则
    "@typescript-eslint/no-unreachable": "off",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unsafe-function-type": "off",
    "no-unused-vars": [
      "warn",
      {
        vars: "all",
        args: "none", // 核心修改：不检测函数参数是否未使用
        argsIgnorePattern: "^_", // 可选：下划线开头的参数自动忽略（如 _userId）
        ignoreRestSiblings: true,
        caughtErrors: "none",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        // 可选配置（根据需求调整）
        argsIgnorePattern: "^_", // 忽略以下划线开头的参数（如 (_props) => {}）
        varsIgnorePattern: "^_", // 忽略以下划线开头的变量
        caughtErrorsIgnorePattern: "^_", // 忽略 catch 中以下划线开头的错误变量
      },
    ],
    "no-multiple-empty-lines": ["error", { max: 1 }], // 禁止多个空行
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
  },
});
