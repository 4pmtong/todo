/**
 ** ********************************************************
 ** @file index.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:44:11
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:44:17
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const prodConfig = require('../webpack-client/prod');

module.exports = merge(prodConfig, {
  profile: true,

  plugins: [
    new BundleAnalyzerPlugin({
      analyzerHost: 'localhost',
      analyzerPort: 3001,
      openAnalyzer: true,
      generateStatsFile: true,
      statsFilename: 'stats.json'
    })
  ]
});
