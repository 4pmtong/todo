/**
 ** ********************************************************
 ** @file build-clean.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:22:08
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:22:09
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const del = require('del');
const logger = require('../utils/logger');
const { dirs } = require('../config/dir-vars');

const { INFO, DONE } = logger;

const print = folders => {
  const { length } = folders;
  const info = 'There are no folders to delete';
  const done = `Remove folders ${folders.join(', ')}`;
  logger[length ? DONE : INFO](length ? done : info);
};

del(dirs.build)
  .then(folders => print(folders))
  .catch(err => logger.error(err));
