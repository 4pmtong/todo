/**
 ** ********************************************************
 ** @file prod.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:46:31
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:46:33
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const merge = require('webpack-merge');
const {
  optimize: { CommonsChunkPlugin }
} = require('webpack');
const SWPrecachePlugin = require('sw-precache-webpack-plugin');
const baseConfig = require('../webpack-base');
const baseLoaders = require('../webpack-base/loaders');
const basePlugins = require('../webpack-base/plugins');
const baseProdConfig = require('../webpack-prod');
const baseClientConfig = require('../webpack-client');
const dllReferenceConfig = require('../webpack-dll/reference');
const pkg = require('../../package.json');
const extractCss = require('../webpack-prod/extract-css');
const { prod } = require('../config/env');
const { vars } = require('../config/dir-vars');

module.exports = merge(
  baseConfig(),
  baseLoaders({
    hash: true,
    extractCss
  }),
  basePlugins({
    vue: { loaders: { css: extractCss } },
    useProgress: true
  }),
  baseProdConfig(),
  baseClientConfig(),
  dllReferenceConfig({
    glob: prod.dllPattern,
    manifest: prod.dllManifest
  }),
  {
    output: {
      filename: `${vars.scripts}/[name].bundle.[chunkhash:6].js`,
      chunkFilename: `${vars.scripts}/[name].[chunkhash:6].js`
    },

    plugins: [
      new CommonsChunkPlugin({
        name: 'common',
        minChunks: (module, count) =>
          !new RegExp(vars.node).test(module.context) &&
          !/\.css$/.test(module.request) &&
          count >= 5
      }),
      new CommonsChunkPlugin({ name: 'manifest' }),
      new SWPrecachePlugin({
        cacheId: pkg.name,
        filename: prod.sw,
        minify: true,
        dontCacheBustUrlsMatching: /./,
        staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
        runtimeCaching: [{ urlPattern: '*', handler: 'networkFirst' }]
      })
    ]
  }
);
