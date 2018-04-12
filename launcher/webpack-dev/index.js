/**
 ** ********************************************************
 ** @file index.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:47:10
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:47:11
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const { DefinePlugin } = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const { dev } = require('../config/env');

module.exports = () => ({
  devtool: 'cheap-module-eval-source-map',

  stats: 'none',

  performance: false,

  plugins: [
    new DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(dev.env) }
    }),
    new FriendlyErrorsPlugin()
  ]
});
