/**
 ** ********************************************************
 ** @file pm2.config.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:17:57
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:17:59
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const pkg = require('./package.json');
const { prod, test } = require('./launcher/config/env');
const { vars } = require('./launcher/config/dir-vars');

module.exports = {
  apps: [
    {
      name: pkg.name,
      script: './launcher/server/app-prod.js',
      cwd: './',
      watch: [],
      env: {
        PORT: prod.port,
        NODE_ENV: prod.env
      },
      env_test: {
        PORT: test.port,
        NODE_ENV: test.env
      },
      log_type: 'json',
      log_date_format: 'YYYY-MM-DD HH:mm',
      out_file: `${vars.build}/logs/log-info.log`,
      error_file: `${vars.build}/logs/log-error.log`
    }
  ]
};
