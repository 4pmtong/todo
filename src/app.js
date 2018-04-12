/**
 ** ********************************************************
 ** @file app.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 15:03:22
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 15:03:24
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

import 'core-js/shim';
import { sync } from 'vuex-router-sync';
import { isDev } from 'envUtil';
import './deploy/promise';
import './deploy/component';
import './deploy/directive';
import './deploy/filter';
import './deploy/interceptor';
import App from './App.vue';
import { createRouter } from './deploy/router';
import { createStore } from './deploy/store';
import mTitle from './mixins/m-title';

Vue.config.performance = isDev;
Vue.config.productionTip = false;
Vue.config.errorHandler = function VueErrorHandler(err, vm, info) {
  console.error(err, vm, info);
};

Vue.mixin(mTitle);

export const createApp = () => {
  const router = createRouter();
  const store = createStore();

  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  /* @notice enable $bus configurable to ensure that $bus instance is fresh */
  const EventBus = new Vue();

  Object.defineProperty(Vue.prototype, '$bus', {
    value: EventBus,
    configurable: true
  });

  Object.defineProperty(Vue, '$bus', {
    value: EventBus,
    configurable: true
  });

  return { app, router, store };
};
