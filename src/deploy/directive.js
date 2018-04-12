/**
 ** ********************************************************
 ** @file directive.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:54:52
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:54:53
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

import { getRequireModules } from 'utils/debris';

const modules = require.context('directives', true, /\.js$/);

modules.keys().forEach(key => {
  const { path, name } = getRequireModules('js', key);
  const module = require(`directives/${path}`);
  Vue.directive(KEBABCASE(name), module.default || module);
});
