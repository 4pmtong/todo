/**
 ** ********************************************************
 ** @file app-render.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:26:11
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:26:12
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const { version: expressVersion } = require('express/package.json');
const { version: vueSSRVersion } = require('vue-server-renderer/package.json');
const { createBundleRenderer } = require('vue-server-renderer');
const logger = require('../utils/logger');
const { getMatchedDll } = require('../utils/debris');
const entry = require('../webpack-dll/entry');
const { dirs, vars } = require('../config/dir-vars');

let renderer;
const [dll, dllHints] = [[], []];

/**
 * @param {Error} err - error object
 * @param {Response} res - response object
 * @returns {void}
 */
const renderErrorHandler = (err, res) => {
  if (err.url) {
    res.redirect(err.url);
  } else if (err.code === 404) {
    res.status(404).send('404 | Page Not Found');
  } else {
    res.status(500).send('500 | Internal Server Error');
    logger.error(err);
  }
};

/**
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @returns {void}
 */
const responseHandler = (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader(
    'Server',
    `express/${expressVersion} vue-server-renderer/${vueSSRVersion}`
  );

  renderer
    .renderToString({
      title: 'aldnoah-ssr',
      url: req.url,
      meta: '',
      renderWebpackDllHints: () => dllHints.join('\n'),
      renderWebpackDll: () => dll.join('\n')
    })
    .then(html => {
      res.send(html);
    })
    .catch(err => renderErrorHandler(err, res));
};

/**
 * @param {Error} err - error object
 * @param {number} port - local server port
 * @returns {void}
 */
const errorHandler = (err, port) => {
  const { code } = err;

  if (err.syscall !== 'listen') {
    logger.fatal(err);
  }
  if (code === 'EACCES') {
    logger.fatal(new Error(`port ${port} requires elevated privileges`));
  }
  if (code === 'EADDRINUSE') {
    logger.fatal(new Error(`port ${port} is already in use`));
  }

  logger.fatal(err);
};

/**
 * @param {Object} bundle - bundle render object
 * @param {Object} options - bundle render options
 * @return {void}
 */
const updateRenderer = (bundle, options) => {
  const cfg = Object.assign(
    {
      inject: false,
      shouldPreload: (file, type) =>
        type === 'script' ||
        type === 'style' ||
        (type === 'font' && /\.woff2$/.test(file)),
      basedir: dirs.build,
      runInNewContext: false
    },
    options
  );
  renderer = createBundleRenderer(bundle, cfg);
};

/**
 * @typedef {Object} ExpressInstance
 * @param {ExpressInstance} app - express instance
 * @param {Object} options - custom options
 * @param {number} options.port - local server port
 * @param {Promise} [options.promise] - bundle render promise
 * @param {string} [options.pattern] - glob pattern to get webpack dll
 * @returns {void}
 */
const render = (app, { port, promise, pattern }) => {
  getMatchedDll(entry, pattern).forEach(name => {
    const href = `/${vars.scripts}/${name}`;
    dllHints.push(`<link rel="preload" href="${href}" as="script">`);
    dll.push(`<script src="${href}" defer></script>`);
  });

  app.get('*', (req, res) => {
    promise
      ? promise
          .then(() => responseHandler(req, res, pattern))
          .catch(err => logger.error(err))
      : responseHandler(req, res);
  });

  app.listen(port);
  app.on('error', err => errorHandler(err, port));
};

module.exports = { updateRenderer, render };
