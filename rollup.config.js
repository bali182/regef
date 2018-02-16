import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'index.js',
      format: 'cjs',
    },
  ],
  plugins: [
    external(),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs(),
  ],
}
