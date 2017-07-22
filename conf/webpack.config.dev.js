const path = require('path');

const config = require('./webpack.config.base.js');

console.log('loaded!!!!!!!!!!!');

const extension = {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '..', 'webapp', 'build')
  }
};

module.exports = Object.assign({}, extension, config);
