/**
 ** ********************************************************
 ** @file env.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:25:09
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:25:10
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const { dev, test, prod } = require('./env-util');

module.exports = {
  dev: {
    port: 3000,
    env: dev,
    proxy: {},
    dllPattern: '',
    dllManifest: 'dev-manifest.json'
  },

  test: {
    port: 8080,
    env: test,
    proxy: {}
  },

  prod: {
    port: 8080,
    env: prod,
    proxy: {},
    dllPattern: '.**',
    dllManifest: 'prod-manifest.json',
    sw: 'service-worker.js'
  }
};
