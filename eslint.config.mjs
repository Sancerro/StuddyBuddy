import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never", propElementValues: "always" },
      ],
      "react/self-closing-comp": ["error", { component: true, html: true }],
      "no-restricted-syntax": [
        "warn",
        {
          // Target: const helper = () => {} inside const Component = () => {}
          // Space ' ' is descendant combinator (any level deep)
          selector: "VariableDeclarator[id.name=/^[A-Z]/] > ArrowFunctionExpression > BlockStatement VariableDeclarator[init.type=/^(ArrowFunctionExpression|FunctionExpression)$/][id.name!=/^use/][id.name!=/^handle/]",
          message: "❌ Do not define pure functions inside components (even nested). Move them outside the component scope or create a custom hook (useX).",
        },
        {
          // Target: const helper = () => {} inside function Component() {}
          selector: "FunctionDeclaration[id.name=/^[A-Z]/] > BlockStatement VariableDeclarator[init.type=/^(ArrowFunctionExpression|FunctionExpression)$/][id.name!=/^use/][id.name!=/^handle/]",
          message: "❌ Do not define pure functions inside components (even nested). Move them outside the component scope or create a custom hook (useX).",
        },
        {
          // Target: function helper() {} inside any component
          selector: ":matches(FunctionDeclaration[id.name=/^[A-Z]/], VariableDeclarator[id.name=/^[A-Z]/] > ArrowFunctionExpression) > BlockStatement FunctionDeclaration[id.name!=/^use/][id.name!=/^handle/]",
          message: "❌ Do not define named functions inside components (even nested). Move them outside.",
        },
      ],
    },
  },
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
