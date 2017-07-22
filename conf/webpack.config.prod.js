const config = require('./webpack.config.base.js');

const extension = {
  devtool: 'source-map'
};

module.exports = Object.assign({}, extension, config);
