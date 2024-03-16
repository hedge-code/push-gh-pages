import swc from "@rollup/plugin-swc";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

const file = (format) => `lib/push-gh-pages.${format}`;

/**
 * @param {import('rollup').RollupOptions} config
 * @returns {import('rollup').RollupOptions}
 */
const bundle = (config) => ({
  input: "src/main.ts",
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    swc({ swc: { minify: true, jsc: {} } }),
  ],
  ...config,
});

export default [
  bundle({
    output: {
      file: file`mjs`,
      format: "esm",
    },
  }),
  bundle({
    watch: false,
    output: {
      file: file`cjs`,
      format: "cjs",
    },
  }),
];
