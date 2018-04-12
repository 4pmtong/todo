/**
 ** ********************************************************
 ** @file analyse.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:21:52
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:21:53
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const clear = require('cli-clear');
const { compileWebpack } = require('../utils/debris');
const analyseConfig = require('../webpack-analyse');

clear();

compileWebpack(analyseConfig, {
  msg: 'Webpack analyse assets is created',
  showStats: true,
  terminateOnError: true
});
