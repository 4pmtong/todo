/**
 ** ********************************************************
 ** @file dll-config.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:48:28
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:48:30
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const path = require('path');
const merge = require('webpack-merge');
const baseLoaders = require('../webpack-base/loaders');
const basePlugins = require('../webpack-base/plugins');
const baseProdConfig = require('../webpack-prod');
const baseDllConfig = require('../webpack-dll');
const entry = require('../webpack-dll/entry');
const extractCss = require('../webpack-prod/extract-css');
const { getDllPackageList } = require('../utils/debris');
const { prod } = require('../config/env');
const { dirs } = require('../config/dir-vars');

module.exports = merge(
  baseLoaders({
    hash: true,
    extractCss,
    dll: getDllPackageList(entry).map(pkg => path.join(dirs.node, pkg))
  }),
  basePlugins({
    vue: { loaders: { css: extractCss } },
    useProgress: true
  }),
  baseProdConfig(),
  baseDllConfig({
    extractCss: require('./extract-css'),
    manifestPath: path.join(dirs.dll, prod.dllManifest)
  }),
  {
    output: {
      path: dirs.dll,
      filename: '[name].bundle.[chunkhash:6].js'
    }
  }
);
