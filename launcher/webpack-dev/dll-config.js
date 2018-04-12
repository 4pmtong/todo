/**
 ** ********************************************************
 ** @file dll-config.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:46:58
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:46:59
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const path = require('path');
const merge = require('webpack-merge');
const baseLoaders = require('../webpack-base/loaders');
const basePlugins = require('../webpack-base/plugins');
const baseDevConfig = require('../webpack-dev');
const baseDllConfig = require('../webpack-dll');
const entry = require('../webpack-dll/entry');
const { getDllPackageList } = require('../utils/debris');
const { dev } = require('../config/env');
const { dirs } = require('../config/dir-vars');

module.exports = merge(
  baseLoaders({
    dll: getDllPackageList(entry).map(pkg => path.join(dirs.node, pkg))
  }),
  basePlugins({
    useProgress: true
  }),
  baseDevConfig(),
  baseDllConfig({
    manifestPath: path.join(dirs.dll, dev.dllManifest)
  }),
  {
    output: {
      path: dirs.dll,
      filename: '[name].bundle.js'
    }
  }
);
