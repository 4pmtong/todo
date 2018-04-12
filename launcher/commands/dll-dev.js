/**
 ** ********************************************************
 ** @file dll-dev.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:23:11
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:23:12
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const createDll = require('./dll-base');
const { dev } = require('../config/env');
const dllConfig = require('../webpack-dev/dll-config');

createDll({ ...dev, config: dllConfig });
