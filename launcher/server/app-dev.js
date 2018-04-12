/**
 ** ********************************************************
 ** @file app-dev.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:25:43
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:25:44
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const path = require('path');
const fs = require('fs');
const EventEmitter = require('events');
const webpack = require('webpack');
const express = require('express');
const open = require('opn');
const chokidar = require('chokidar');
const clear = require('cli-clear');
const MFS = require('memory-fs');
const ProgressBar = require('progress');
const logger = require('../utils/logger');
const clientConfig = require('../webpack-client/dev');
const serverConfig = require('../webpack-server/dev');
const { readFile } = require('../utils/debris');
const { dev } = require('../config/env');
const { dirs } = require('../config/dir-vars');
const { updateRenderer, render } = require('./app-render');

const BAR = {
  INIT: 'bar-init',
  DONE: 'bar-done'
};

const emitter = new EventEmitter();
const app = express();
const templatePath = path.join(dirs.src, 'index.html');

const readSSRFile = (sys, file) =>
  readFile(sys, path.join(clientConfig.output.path, file));

let [template, ready, bundle, clientManifest] = [readFile(fs, templatePath)];

const readyPromise = new Promise(r => {
  ready = r;
});

const update = () => {
  if (bundle && clientManifest) {
    ready();
    updateRenderer(bundle, { template, clientManifest });
  }
};

(() => {
  const theme = require('../utils/bar-theme');
  let [bar, timer] = [];

  const handler = () => {
    timer && clearInterval(timer);
    timer = setInterval(() => {
      bar.tick();
      bar.complete && clearInterval(timer);
    }, 1000 / 60);
  };

  emitter.on(BAR.INIT, () => {
    clear();
    bar = new ProgressBar(theme.token, theme.options);
    handler();
  });
  emitter.on(BAR.DONE, () => {
    bar.tick(theme.options.total);
  });
})();

emitter.emit(BAR.INIT);

chokidar.watch(templatePath).on('change', () => {
  template = readFile(fs, templatePath);
  update();
});

require('./app-base')(app, { proxy: dev.proxy, dataPath: dirs.data });

/* webpack client */

if (typeof clientConfig.entry !== 'object') {
  logger.fatal(new TypeError('The webpack client entry is not object type'));
}

Object.keys(clientConfig.entry).forEach(key => {
  const webpackEntry = clientConfig.entry[key];
  const hmr = 'webpack-hot-middleware/client?noInfo=true&reload=true';
  const msg = `The webpack entry ${key} is not string or array type`;
  if (webpackEntry instanceof Array) {
    clientConfig.entry[key] = [hmr].concat(webpackEntry);
  } else if (typeof webpackEntry === 'string') {
    clientConfig.entry[key] = [hmr, webpackEntry];
  } else {
    logger.fatal(new TypeError(msg));
  }
});

const clientCompiler = webpack(clientConfig);

const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
  logLevel: 'warn',
  publicPath: clientConfig.output.publicPath,
  stats: clientConfig.stats
});
const hotMiddleware = require('webpack-hot-middleware')(clientCompiler, {
  heartbeat: 5000,
  log: () => {} // eslint-disable-line
});

app.use(devMiddleware);
app.use(hotMiddleware);

clientCompiler.plugin('done', stats => {
  const status = stats.toJson();
  emitter.emit(BAR.DONE);
  if (status.errors.length) {
    return;
  }
  clientManifest = JSON.parse(
    readSSRFile(devMiddleware.fileSystem, 'vue-ssr-client-manifest.json')
  );
  update();
});

devMiddleware.waitUntilValid(() => {
  open(`http://${require('ip').address()}:${dev.port}`);
});

/* webpack server */

const mfs = new MFS();
const serverCompiler = webpack(serverConfig);

serverCompiler.outputFileSystem = mfs;
serverCompiler.watch({}, (err, stats) => {
  if (err) {
    return void logger.error(err);
  }
  if (stats.toJson().errors.length) {
    return;
  }
  bundle = JSON.parse(readSSRFile(mfs, 'vue-ssr-server-bundle.json'));
  update();
});

render(app, { port: dev.port, promise: readyPromise });
