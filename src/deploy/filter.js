/**
 ** ********************************************************
 ** @file filter.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:55:01
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:55:02
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

import { getRequireModules } from 'utils/debris';

const modules = require.context('filters', true, /\.js$/);

modules.keys().forEach(key => {
  const { path, name } = getRequireModules('js', key);
  const module = require(`filters/${path}`);
  Vue.filter(KEBABCASE(name), module.default || module);
});
