
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './examples/v3/index.js',
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`,
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: ['transform-decorators-legacy'],
          presets: ['es2015', 'react', 'stage-0'],
          babelrc: false,
        },
      },
    ],
  },
  plugins: [
    new HtmlPlugin({ template: 'examples/index.html' }),
  ],
}
