/**
 ** ********************************************************
 ** @file data-move.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:22:43
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:22:44
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const path = require('path');
const fse = require('fs-extra');
const logger = require('../utils/logger');
const { dirs, vars } = require('../config/dir-vars');

const msg = `Copy /${vars.src}/${vars.data} -> /${vars.build}/${vars.data}`;

fse
  .copy(dirs.data, path.join(dirs.build, 'data'), {
    overwrite: false,
    errorOnExist: true
  })
  .then(() => logger.done(msg))
  .catch(err => {
    if (err.code === 'ENOENT') {
      logger.info('No data directory needed to copy');
    } else {
      logger.error(err);
    }
  });
