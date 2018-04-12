/**
 ** ********************************************************
 ** @file app-base.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:25:28
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:25:29
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const path = require('path');
const express = require('express');
const httpProxy = require('http-proxy-middleware');
const favicon = require('serve-favicon');
const { dirs } = require('../config/dir-vars');

/**
 * @typedef {Object} ExpressInstance
 * @param {ExpressInstance} app - express app instance
 * @param {Object} [options] - custom option
 * @param {boolean} [options.cacheable] - express static cache
 * @param {Object} [options.proxy] - proxy config
 * @param {boolean} [options.buildStatic] - whether to set build dir as static
 * @param {string} [options.dataPath] - the absolute path string of data dir
 * @returns {void}
 */
module.exports = (app, options = { proxy: {} }) => {
  const { cacheable, proxy, buildStatic, dataPath } = options;
  const maxAge = cacheable ? 60 * 60 * 24 * 30 : 0;

  const serve = (str, absolute) =>
    express.static(absolute ? str : path.join(__dirname, str), { maxAge });

  Object.keys(proxy).forEach(key => {
    let proxyCfg = proxy[key];
    typeof cfg === 'string' && (proxyCfg = { target: proxyCfg });
    app.use(httpProxy(proxyCfg.filter || key, proxyCfg));
  });

  app.use(favicon(path.join(__dirname, '../../public/logo-48.png')));
  buildStatic && app.use(serve(dirs.build, true));
  app.use('/public', serve('../../public'));
  app.use('/data', serve(dataPath, true));
  app.use('/manifest.json', serve('../../manifest.json'));
};
