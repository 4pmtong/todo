/**
 ** ********************************************************
 ** @file entry-server.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 15:04:11
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 15:04:13
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

import { createApp } from './app';

export default context =>
  new Promise((resolve, reject) => {
    const { app, router, store } = createApp();
    const { url } = context;
    const { fullPath } = router.resolve(url).route;

    if (url !== fullPath) {
      return void reject({ url: fullPath });
    }

    router.push(url);

    router.onReady(() => {
      const { currentRoute } = router;
      const matched = router.getMatchedComponents();

      if (!matched.length) {
        return void reject({ url: '/404' });
      }

      Promise.all(
        matched
        .filter(({ asyncData }) => typeof asyncData === 'function')
        .map(({ asyncData }) => asyncData({ store, route: currentRoute }))
      )
      .then(() => {
        context.state = store.state;
        resolve(app);
      })
      .catch(reject);
    }, reject);
  });
