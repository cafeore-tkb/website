// @ts-check

/** @type {import("stylelint").Config} */
export default {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-html/astro",
    "stylelint-config-recess-order",
  ],
  ignoreFiles: ["**/node_modules/**", "**/dist/**"],
};
