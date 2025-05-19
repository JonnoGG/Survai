// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";

/** @type {import("eslint").Linter.Config[]} */
export default [
    js.configs.recommended,

    // node/backend files
    {
        files: ["**/*.js"],
        languageOptions: {
            sourceType: "commonjs",
            globals: {
                ...globals.node,
                ...globals.browser,
                __basedir: "readonly"
            },
        },
        rules: {
            "no-unused-vars": ["error", { caughtErrorsIgnorePattern: "^_" }],
        },
    },

    // browser/frontend files
    {
        files: ["public/**/**/*.js"],
        languageOptions: {
            sourceType: "module",
            globals: {
                ...globals.browser,
            },
        },
    },
];
