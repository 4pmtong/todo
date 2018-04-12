/**
 ** ********************************************************
 ** @file bar-theme.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:42:54
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:42:55
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const chalk = require('chalk');

const token = `${chalk.green(':bar')} ${chalk.green(':percent')}`;

module.exports = {
  token,
  options: {
    width: 30,
    total: 100,
    summary: false,
    clear: true,
    format: `${token} | :msg`,
    complete: '\u2588',
    incomplete: '\u2591'
  }
};
