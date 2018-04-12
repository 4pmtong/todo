/**
 ** ********************************************************
 ** @file stats.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:45:37
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:45:43
 ** @tutorial https://webpack.js.org/configuration/stats
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

module.exports = {
  // assets order by name
  assetsSort: 'name',

  children: false,

  chunks: false,

  colors: true,

  warnings: false,

  // only log emmited files
  cachedAssets: false,

  // not show detail modules information
  maxModules: 0,

  // equals to cli --hide-modules
  modules: false,

  reasons: false,

  source: false,

  moduleTrace: false
};
