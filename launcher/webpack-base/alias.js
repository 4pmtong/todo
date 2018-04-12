/**
 ** ********************************************************
 ** @file alias.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:44:36
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:44:43
 ** @tutorial https://webpack.js.org/configuration/resolve/#resolve-alias
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const path = require('path');
const { dirs } = require('../config/dir-vars');

module.exports = Object.assign({}, dirs, {
  vue$: 'vue/dist/vue.runtime.common.js',

  design$: path.join(dirs.launcher, 'config', 'design.js'),

  envUtil$: path.join(dirs.launcher, 'config', 'env-util.js')
});
