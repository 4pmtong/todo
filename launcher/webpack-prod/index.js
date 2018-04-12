/**
 ** ********************************************************
 ** @file index.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:48:52
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:48:53
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const path = require('path');
const {
  DefinePlugin,
  HashedModuleIdsPlugin,
  optimize: { ModuleConcatenationPlugin }
} = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const { prod } = require('../config/env');
const { dirs, vars } = require('../config/dir-vars');

module.exports = () => ({
  devtool: 'source-map',

  stats: require('../webpack-base/stats'),

  plugins: [
    new DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(prod.env) }
    }),
    new HashedModuleIdsPlugin(),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { autoprefixer: false, safe: true }
    }),
    new ParallelUglifyPlugin({
      cacheDir: path.join(dirs.node, '.cache', 'uglify'),
      sourceMap: true
    }),
    new ExtractTextPlugin(`${vars.styles}/[name].bundle.[contenthash:6].css`),
    new ModuleConcatenationPlugin()
  ]
});
