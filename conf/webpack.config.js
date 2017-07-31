const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, '..', 'webapp', 'src', 'index.js')
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '..', 'webapp', 'build')
  },
  resolve: {
    alias: {
      common: path.resolve(__dirname, '..', 'webapp', 'src', 'common'),
      components: path.resolve(__dirname, '..', 'webapp', 'src', 'components')
    },
    modules: [
      path.resolve(__dirname, '..', 'node_modules')
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
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                presets: ['latest', 'react'],
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
    // Generates index.html from template
    new HtmlWebpackPlugin({
      favicon: 'webapp/public/favicon.ico',
      template: 'webapp/public/index.html'
    })
  ]
};
