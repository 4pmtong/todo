/**
 ** ********************************************************
 ** @file dev.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:49:11
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:49:12
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const merge = require('webpack-merge');
const baseConfig = require('../webpack-base');
const baseLoaders = require('../webpack-base/loaders');
const basePlugins = require('../webpack-base/plugins');
const baseDevConfig = require('../webpack-dev');
const baseServerConfig = require('../webpack-server');

module.exports = merge(
  baseConfig(),
  baseLoaders(),
  basePlugins(),
  baseDevConfig(),
  baseServerConfig()
);
