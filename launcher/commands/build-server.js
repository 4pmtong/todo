/**
 ** ********************************************************
 ** @file build-server.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:22:32
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:22:33
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const clear = require('cli-clear');
const serverConfig = require('../webpack-server/prod');
const { compileWebpack } = require('../utils/debris');

clear();

compileWebpack(serverConfig, {
  msg: 'Webpack server bundle is created',
  showStats: true,
  terminateOnError: true
});
