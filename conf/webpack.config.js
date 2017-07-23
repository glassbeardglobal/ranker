const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, '..', 'webapp', 'src', 'index.js')
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '..', 'webapp', 'build')
  },
  resolve: {
    modules: [
      path.resolve(__dirname, '..', 'node_modules'),
      path.resolve(__dirname, '..', 'webapp', 'src')
    ]
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
          },
          {
            test: /\.css$/,
            use: [
              {
                loader: 'style-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 1
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                  config: {
                    path: path.resolve(__dirname, 'postcss.config.js')
                  }
                }
              }
            ]
          }
        ]
      }
    ]
  },
  plugins: [
    // Clears webapp/build folder
    new CleanWebpackPlugin([
      path.resolve(__dirname, '..', 'webapp', 'build')
    ], {
      root: path.resolve(__dirname, '..', 'webapp')
    }),
    // Generates index.html from template
    new HtmlWebpackPlugin({
      favicon: 'webapp/public/favicon.ico',
      template: 'webapp/public/index.html'
    })
  ]
};
