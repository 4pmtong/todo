/**
 ** ********************************************************
 ** @file prod.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:49:34
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:49:35
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const merge = require('webpack-merge');
const baseConfig = require('../webpack-base');
const baseLoaders = require('../webpack-base/loaders');
const basePlugins = require('../webpack-base/plugins');
const baseProdConfig = require('../webpack-prod');
const baseServerConfig = require('../webpack-server');
const extractCss = require('../webpack-prod/extract-css');

module.exports = merge(
  baseConfig(),
  baseLoaders({ hash: true, extractCss }),
  basePlugins({
    vue: { loaders: { css: extractCss } },
    useProgress: true
  }),
  baseProdConfig(),
  baseServerConfig()
);
