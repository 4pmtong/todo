/**
 ** ********************************************************
 ** @file extract-css.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:48:42
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:48:43
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = ExtractTextPlugin.extract({
  use: [
    {
      loader: 'css-loader',
      options: { minimize: true }
    },
    'postcss-loader'
  ],
  fallback: 'vue-style-loader'
});
