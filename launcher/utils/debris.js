/**
 ** ********************************************************
 ** @file debris.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:43:08
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:43:09
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const webpack = require('webpack');
const globby = require('globby');
const logger = require('../utils/logger');
const { dirs } = require('../config/dir-vars');

const { ERROR, FATAL } = logger;

/**
 * @param {Function} handler - code logic that wrapped as a function
 * @param {LoggerType} [type] - ERROR|FATAL, {@see logger~LoggerType}
 * @returns {*} - return value of handler or null
 */
const tryIt = (handler, type = ERROR) => {
  const level = [ERROR, FATAL].includes(type) ? type : ERROR;
  try {
    return handler();
  } catch (e) {
    return logger[level](e);
  }
};

/**
 * @param {Object} entry - dll entry
 * @param {string} [pattern=''] - glob string
 * @returns {string[]} - matched dll files string
 */
const getMatchedDll = (entry, pattern = '') => {
  const handler = () =>
    globby.sync(Object.keys(entry).map(key => `${key}.bundle${pattern}.js`), {
      cwd: dirs.dll
    });
  return tryIt(handler, FATAL);
};

/**
 * read file by file system, which has readFileSync api
 * @param {Object} sys - file system like node-fs
 * @param {string} file - file path
 * @param {LoggerType} [type] - {@see logger~LoggerType}
 * @returns {string} - file content
 */
const readFile = (sys, file, type) =>
  tryIt(() => sys.readFileSync(file, 'utf-8'), type);

/**
 * compile webpack config and handle by logger
 * @param {WebpackConfig} config - the config be compiled
 * @param {Object} [options] - custom options
 * @param {string} [options.msg] - the done msg
 * @param {boolean} [options.showStats] - whether show stats information
 * @param {boolean} [options.terminateOnError] - whether terminate if has error
 * @returns {WebpackCompiler} - webpack compiler instance
 */
const compileWebpack = (config, options = {}) => {
  const { msg, showStats, terminateOnError } = options;
  return webpack(config, (err, stats) => {
    const type = terminateOnError ? FATAL : ERROR;
    const status = stats.toJson();
    err && logger[type](err);
    status.errors.forEach((error, index) => {
      logger.error(new Error(error));
      index === status.errors.length - 1 &&
        logger[type]('Catch webpack stats errors as above');
    });
    status.warnings.forEach(warn => logger.warn(warn));
    showStats && console.log(stats.toString(config.stats));
    msg && logger.done(msg);
  });
};

const getDllPackageList = entry => {
  const packageList = Object.keys(entry)
    .map(key => entry[key])
    .join()
    .split(',')
    .filter((item, index, array) => array.indexOf(item, index + 1) === -1)
    .map(pkg => pkg.split('/')[0]);
  return packageList;
};

module.exports = {
  getMatchedDll,
  tryIt,
  readFile,
  compileWebpack,
  getDllPackageList
};
