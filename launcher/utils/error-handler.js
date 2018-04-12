/**
 ** ********************************************************
 ** @file error-handler.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:43:29
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:43:30
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const logger = require('../utils/logger');

process.on('uncaughtException', err => {
  logger.error(err);
});

process.on('unhandledRejection', err => {
  logger.error(err);
});
