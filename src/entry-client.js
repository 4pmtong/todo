/**
 ** ********************************************************
 ** @file entry-client.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 15:03:55
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 15:03:57
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

import { createApp } from './app';
import Toast from './ui/c-toast';
import Loading from './ui/c-loading';
import CProgressBar from './ui/CProgressBar';

const { app, router, store } = createApp();

const Bar = new Vue(CProgressBar).$mount();
document.body.appendChild(Bar.$el);

const props = {
  $bar: {
    value: Bar,
    writable: false,
    configurable: false
  },
  $toast: {
    value: Toast,
    writable: false,
    configurable: false
  },
  $loader: {
    value: Loading,
    writable: false,
    configurable: false
  }
};

Object.defineProperties(Vue.prototype, props);
Object.defineProperties(Vue, props);

Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options;
    typeof asyncData === 'function' ? asyncData().then(next) : next();
  }
});

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);

    let differ = false;

    const activated = matched.filter(
      (c, i) => differ || (differ = c !== prevMatched[i])
    );
    const asyncDataHooks = activated
      .filter(c => typeof c.asyncData === 'function')
      .map(c => c.asyncData);

    if (!asyncDataHooks.length) {
      return void next();
    }

    Vue.$bar.start();

    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
    .then(() => {
      Vue.$bar.finish();
      next();
    })
    .catch(next);
  });

  app.$mount('#app');
});

if (window.location.protocol === 'https:' && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js');
}
