import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs';

const extensions = [
  '.js', '.jsx', '.ts', '.tsx'
]

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  },
  plugins: [
    commonjs(),
    resolve({
      extensions,
      browser: true
    }),
    babel({
      extensions,
      minified: true,
      comments: false,
      babelHelpers: 'bundled',
      exclude: [/\/core-js\//],
      inputSourceMap: true
    })
  ]
}