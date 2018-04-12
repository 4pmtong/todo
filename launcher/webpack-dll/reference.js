/**
 ** ********************************************************
 ** @file reference.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:48:03
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:48:04
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const path = require('path');
const { DllReferencePlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const entry = require('../webpack-dll/entry');
const { dirs, vars } = require('../config/dir-vars');

/**
 * @param {Object} options - custom options
 * @param {string} [options.glob] - specific glob
 * @param {string} options.manifest - dll manifest
 * @returns {WebpackConfig} webpack dll reference config
 */
module.exports = (options = {}) => ({
  plugins: [
    new CopyWebpackPlugin(
      Object.keys(entry).map(key => ({
        from: path.join(
          dirs.dll,
          `${key}.bundle${options.glob || ''}.js?(.map)`
        ),
        to: path.join(dirs.build, vars.scripts, '[name].[ext]')
      }))
    ),
    new DllReferencePlugin({
      manifest: require(`${dirs.dll}/${options.manifest}`)
    })
  ]
});
