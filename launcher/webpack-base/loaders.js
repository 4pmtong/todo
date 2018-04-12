/**
 ** ********************************************************
 ** @file loaders.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:45:13
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:45:14
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const { dirs, vars } = require('../config/dir-vars');

const happypackLoader = 'happypack/loader';

/**
 * @param {Object} [options={}] - custom options
 * @param {boolean} [options.useEslint] - whether use eslint-loader
 * @param {boolean} [options.hash] - webpack hash, not use in development env
 * @param {Object|boolean} [options.extractCss] - extract css
 * @param {string[]|RegExp} [options.dll] - dll rules limit
 * @returns {WebpackConfig} - webpack loader config
 */
module.exports = (options = {}) => ({
  module: {
    rules: (options.useEslint
      ? [
        {
          test: /\.(vue|js)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: [dirs.src],
          options: { cache: true }
        }
      ]
      : []
    ).concat([
      {
        test: /\.vue$/,
        loader: `${happypackLoader}?id=vue`,
        include: options.dll || [dirs.src]
      },
      {
        test: /\.js$/,
        loader: `${happypackLoader}?id=babel`,
        include: options.dll || [dirs.src, dirs.launcher]
      },
      {
        test: /\.(svg|woff2?|ttf|eot)\??.*$/,
        loader: 'url-loader',
        include: options.dll || [dirs.fonts],
        options: {
          limit: 10000,
          name: `${vars.fonts}/[name]${options.hash ? '.[hash:6]' : ''}.[ext]`
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'url-loader',
        include: options.dll || [dirs.src],
        exclude: [dirs.fonts],
        options: {
          limit: 10000,
          name: options.hash
            ? `${vars.images}/[name].[hash:6].[ext]`
            : '[path][name].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: options.extractCss || [
          'vue-style-loader',
          'css-loader',
          'postcss-loader'
        ],
        include: options.dll || [dirs.src]
      }
    ])
  }
});
