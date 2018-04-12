/**
 ** ********************************************************
 ** @file app-prod.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:25:56
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:25:57
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const path = require('path');
const fs = require('fs');
const express = require('express');
const compression = require('compression');
const microCache = require('route-cache');
const LRU = require('lru-cache');
const { isTest } = require('../config/env-util');
const { test, prod } = require('../config/env');
const { dirs, vars } = require('../config/dir-vars');
const { updateRenderer, render } = require('./app-render');

const [app, envConfig] = [express(), isTest ? test : prod];

/**
 * @notice compression should be above other express middlewares,
 * otherwise, it will can't compress anything.
 */
app.set('env', envConfig.env);
app.use(compression({ threshold: 0 }));
app.use(microCache.cacheSeconds(5, req => req.originalUrl));
app.use(`/${prod.sw}`, express.static(path.join(dirs.build, prod.sw)));
app.disable('x-powered-by');

require('./app-base')(app, {
  cacheable: true,
  proxy: envConfig.proxy,
  buildStatic: true,
  dataPath: path.join(dirs.build, vars.data)
});

updateRenderer(require(path.join(dirs.build, 'vue-ssr-server-bundle.json')), {
  template: fs.readFileSync(path.join(dirs.src, 'index.html'), 'utf-8'),
  clientManifest: require(path.join(
    dirs.build,
    'vue-ssr-client-manifest.json'
  )),
  cache: LRU({ max: 1000, maxAge: 1000 * 60 * 15 })
});

render(app, { port: envConfig.port, pattern: prod.dllPattern });
