const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  // devtool: 'inline-source-map',
  entry: './example/index.tsx',
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`,
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [new HtmlPlugin({ template: 'example/index.html' })],
  devServer: {
    stats: 'errors-only',
  },
}
