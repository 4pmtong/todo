/**
 ** ********************************************************
 ** @file dll-prod.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:23:24
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:23:25
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const createDll = require('./dll-base');
const { prod } = require('../config/env');
const dllConfig = require('../webpack-prod/dll-config');

createDll({ ...prod, config: dllConfig, clearOld: true });
