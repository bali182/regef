import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'

const pkg = require('./package.json')

export default {
  input: 'src/index.ts',
  output: [{ file: pkg.main, format: 'cjs', sourcemap: true }],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [typescript({ useTsconfigDeclarationDir: true }), commonjs()],
}
