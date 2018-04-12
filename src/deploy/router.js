/**
 ** ********************************************************
 ** @file router.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:55:45
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:55:46
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

import VueRouter from 'vue-router';
import { getRequireModules } from 'utils/debris';

Vue.use(VueRouter);

let routes = [];
const modules = require.context('routes', true, /\.js$/);

modules.keys().forEach(key => {
  const { path } = getRequireModules('js', key);
  const module = require(`routes/${path}`);
  routes = routes.concat(module.default || module);
});

routes.push({ path: '*', redirect: '/404' });

export const createRouter = () =>
  new VueRouter({
    routes,
    mode: 'history',
    fallback: false,
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      }
      if (to.meta && to.meta.position) {
        return to.meta.position;
      }
      return { x: 0, y: 0 };
    }
  });
