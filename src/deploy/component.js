/**
 ** ********************************************************
 ** @file component.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:54:41
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:54:42
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

import { getRequireModules } from 'utils/debris';

const modules = require.context('comps/global', true, /\.vue$/);
const uiModules = require.context('ui/global', true, /\.vue$/);

modules.keys().forEach(key => {
  const { path, name } = getRequireModules('vue', key);
  const module = require(`comps/global/${path}`);
  Vue.component(KEBABCASE(name), module.default || module);
});

uiModules.keys().forEach(key => {
  const { path, name } = getRequireModules('vue', key);
  const module = require(`ui/global/${path}`);
  Vue.component(KEBABCASE(name), module.default || module);
});
