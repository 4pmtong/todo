/**
 ** ********************************************************
 ** @file plugins.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:45:26
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:45:27
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const os = require('os');
const HappyPack = require('happypack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const barTheme = require('../utils/bar-theme');

const happyPackConfig = {
  verbose: false,
  threadPool: HappyPack.ThreadPool({ size: os.cpus().length })
};

/**
 * @typedef {Object} WebpackConfig
 * @param {Object} [options={}] - custom options
 * @param {Object} [options.vue] - vue-loader options
 * @param {boolean} [options.useProgress] - whether use progress bar
 * @returns {WebpackConfig} - webpack plugins options
 */
module.exports = (options = {}) => ({
  plugins: [
    new HappyPack(
      Object.assign(happyPackConfig, {
        id: 'babel',
        loaders: [
          {
            loader: 'babel-loader',
            options: { cacheDirectory: true }
          }
        ]
      })
    ),
    new HappyPack(
      Object.assign(happyPackConfig, {
        id: 'vue',
        loaders: [
          {
            loader: 'vue-loader',
            options: options.vue
          }
        ]
      })
    )
  ].concat(options.useProgress ? [new ProgressBarPlugin(barTheme.options)] : [])
});
