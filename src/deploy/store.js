/**
 ** ********************************************************
 ** @file store.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:55:57
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:55:58
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

import Vuex from 'vuex';
import { getRequireModules } from 'utils/debris';
import { isDev } from 'envUtil';

Vue.use(Vuex);

const modules = {};
const context = require.context('store/modules', true, /\.js$/);

context.keys().forEach(key => {
  const { path, name } = getRequireModules('js', key);
  if (name === 'index') {
    return;
  }
  const module = require(`store/modules/${path}`);
  modules[CAMELCASE(name)] = module.default || module;
});

export const createStore = () =>
  new Vuex.Store({
    modules,
    strict: isDev
  });
