import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import replace from "@rollup/plugin-replace";
import postcss from "rollup-plugin-postcss";
import packageJson from "./package.json";

const common = {
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      declaration: false,
    }),
    postcss({
      extensions: [".css"],
    }),
    replace({
      values: {
        'process.env.NODE_ENV': JSON.stringify('production')
      },
      preventAssignment: true,
    }),
  ]
}

export default [
  {
    ...common,
    input: "src/index.tsx",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
  },
  {
    ...common,
    input: "src/react_supervenn.tsx",
    output: [
      {
        file: packageJson.umd,
        format: "umd",
        name: 'react_supervenn',
        amd: {
          id: 'react_supervenn',
        },
        sourcemap: false,
      },
    ],
    plugins: [
      ...common.plugins,
      replace({
        values: {
          'process.env.NODE_ENV': JSON.stringify('production')
        },
        preventAssignment: true,
      }),
    ],
  },
]
