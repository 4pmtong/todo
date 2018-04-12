/**
 ** ********************************************************
 ** @file build-client.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:22:20
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:22:21
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const clear = require('cli-clear');
const clientConfig = require('../webpack-client/prod');
const { compileWebpack } = require('../utils/debris');

clear();

compileWebpack(clientConfig, {
  msg: 'Webpack client assets is created',
  showStats: true,
  terminateOnError: true
});
