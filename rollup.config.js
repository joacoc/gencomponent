const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const postcss = require('rollup-plugin-postcss'); // Import postcss plugin
const {dts} = require('rollup-plugin-dts');
const tailwind = require('@tailwindcss/postcss');

module.exports = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
      }),
      postcss({ 
        minimize: true, 
        plugins: [
          tailwind,
        ]
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
      }),
    ],
    external: ['react', 'react-dom', 'next'],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'esm',
    },
    plugins: [
      peerDepsExternal(),
      dts(),
      postcss({ 
        minimize: true, 
        plugins: [
          tailwind,
        ]
      })],
  },
];