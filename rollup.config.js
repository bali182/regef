import typescript from 'rollup-plugin-typescript'

export default {
  entry: './src/index.tsx',
  dest: './dist/bundle.js',
  targets: [
    {
      entry: 'index.js',
      dest: `./dist/bundle.js`,
      format: 'cjs',
    }
  ],
  plugins: [
    typescript()
  ]
}