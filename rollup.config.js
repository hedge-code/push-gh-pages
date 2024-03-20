import json from "@rollup/plugin-json";
import { dts } from "rollup-plugin-dts";
import { swc } from "rollup-plugin-swc3";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

const file = (name) => `lib/${name}`;

/**
 * @param {import('rollup').RollupOptions} config
 * @returns {import('rollup').RollupOptions}
 */
const bundle = (config) => ({
  plugins: [nodeResolve(), commonjs(), json(), swc({ minify: true, jsc: {} })],
  ...config,
});

export default [
  bundle({
    input: "src/cli.ts",
    output: {
      file: file`cli.mjs`,
      format: "esm",
    },
  }),
  bundle({
    input: "src/main.ts",
    output: {
      file: file`main.mjs`,
      format: "esm",
    },
  }),
  bundle({
    input: "src/main.ts",
    watch: false,
    output: {
      file: file`main.cjs`,
      format: "cjs",
    },
  }),
  bundle({
    input: "src/main.ts",
    output: {
      file: file`types.d.ts`,
      format: "es",
    },
    plugins: [nodeResolve(), commonjs(), json(), dts()],
  }),
];
