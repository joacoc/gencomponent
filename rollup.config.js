const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const typescript = require('@rollup/plugin-typescript')
const postcss = require('rollup-plugin-postcss')
const tailwind = require('@tailwindcss/postcss')
const autoprefixer = require('autoprefixer')
const dts = require('rollup-plugin-dts')

module.exports = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
        // Simple/hacky way to do two things:
        // 1. Make all the components client-side.
        //    The ideal for the future would be to have a separate entry/build for server-side components and client-side components.
        // 2. Generate type declarations for the components.
        banner: "'use client'" + '\n' + "require('./index.css');" + '\n',
      },
    ],
    plugins: [
      postcss({
        plugins: [tailwind],
        extract: true,
      }),
      resolve({
        browser: true,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
      }),
    ],
    external: ['react', 'react-dom', 'next'],
  },
]
