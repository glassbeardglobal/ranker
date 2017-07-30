const config = require('./webpack.config.js');

const extension = {
  devtool: 'source-map'
};

module.exports = Object.assign({}, extension, config);
