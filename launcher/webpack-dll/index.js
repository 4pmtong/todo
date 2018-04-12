/**
 ** ********************************************************
 ** @file index.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:47:51
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:47:52
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const { DllPlugin } = require('webpack');
const entry = require('../webpack-dll/entry');

const library = '[name]_[chunkhash:6]';

/**
 * @param {Object} options - custom options
 * @param {string} options.manifestPath - manifest json file's absolute path
 * @return {WebpackConfig} webpack dll config
 */
module.exports = (options = {}) => ({
  entry,

  output: {
    library
  },

  resolve: {
    alias: require('../webpack-base/alias')
  },

  plugins: [
    new DllPlugin({
      name: library,
      path: options.manifestPath
    })
  ]
});
