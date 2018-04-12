/**
 ** ********************************************************
 ** @file env-util.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:24:57
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:24:58
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const getEnv = () => process.env.NODE_ENV;
const getVueEnv = () => process.env.VUE_ENV;
const [dev, test, prod, client, server] = [
  'development',
  'test',
  'production',
  'client',
  'server'
];

const check = env => [dev, test, prod].includes(env || getEnv());

module.exports = {
  dev,

  test,

  prod,

  client,

  server,

  getEnv,

  check,

  isDev: getEnv() === dev,

  isTest: getEnv() === test,

  isProd: getEnv() === prod,

  isClient: getVueEnv() === client,

  isServer: getVueEnv() === server
};
