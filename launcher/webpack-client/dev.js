/**
 ** ********************************************************
 ** @file dev.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:46:04
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:46:05
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const merge = require('webpack-merge');
const { HotModuleReplacementPlugin } = require('webpack');
const baseConfig = require('../webpack-base');
const baseLoaders = require('../webpack-base/loaders');
const basePlugins = require('../webpack-base/plugins');
const baseDevConfig = require('../webpack-dev');
const baseClientConfig = require('../webpack-client');
const dllReferenceConfig = require('../webpack-dll/reference');
const { dev } = require('../config/env');
const { vars } = require('../config/dir-vars');

module.exports = merge(
  baseConfig(),
  baseLoaders({ useEslint: true }),
  basePlugins(),
  baseDevConfig(),
  baseClientConfig(),
  dllReferenceConfig({ manifest: dev.dllManifest }),
  {
    output: {
      filename: `${vars.scripts}/[name].bundle.js`,
      chunkFilename: `${vars.scripts}/[name].js`
    },

    plugins: [new HotModuleReplacementPlugin()]
  }
);
