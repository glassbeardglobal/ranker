const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'webapp', 'src', 'index.js')
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'webapp', 'build')
  },
  module: {
    rules: [
      {
        // Lint first before Babel processes js
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        oneOf: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                presets: ['es2015', 'react'],
                cacheDirectory: true
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: 'webapp/public/favicon.ico',
      template: 'webapp/public/index.html'
    })
  ]
};
