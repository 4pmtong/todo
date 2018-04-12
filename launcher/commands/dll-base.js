/**
 ** ********************************************************
 ** @file dll-base.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:23:01
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:23:02
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const path = require('path');
const fse = require('fs-extra');
const del = require('del');
const hash = require('object-hash');
const clear = require('cli-clear');
const logger = require('../utils/logger');
const entry = require('../webpack-dll/entry');
const { dirs } = require('../config/dir-vars');
const { check } = require('../config/env-util');
const {
  getMatchedDll,
  getDllPackageList,
  compileWebpack
} = require('../utils/debris');

const STEP = [0, 1, 2, 3, 4, 5, 6];
const releasePath = path.join(dirs.dll, 'release.json');

/**
 * @param {string} pkg - package name
 * @returns {string} - package version string
 */
const getPakcageVersion = pkg => {
  try {
    return require(`${pkg}/package.json`).version;
  } catch (e) {
    return '0.0.0';
  }
};

/**
 * use object-hash to create a hash of packages listed
 * at the dll entry file
 * @throws {TypeError} entry
 * @returns {string} - hash value
 */
const getVerionHash = () => {
  const obj = {};
  const packageList = getDllPackageList(entry);

  packageList.forEach(pkg => {
    obj[pkg] = getPakcageVersion(pkg);
  });

  return hash(obj);
};

/**
 * 1 - check whether the env is correct
 * 2 - check whether files exist include release.json, mainfest and dll bundle
 * 3 - check whether need to compile webpack config
 * 4 - create or update release.json file
 * 5 - exec compiling webpack config
 * @throws {Error}
 * @param {Object} options - custom options
 * @param {string} options.env - {@see config~env}
 * @param {Function} options.config - webpack config
 * @param {string} options.dllManifest - {@see config~env}
 * @param {string} [options.dllPattern] - {@see config~env}
 * @param {boolean} [clearOld] - whether to clear old dll files
 * @returns {Object} - steps logic object
 */
const steps = ({ env, config, dllManifest, dllPattern, clearOld }) => ({
  [STEP[1]]() {
    if (env && check(env)) {
      this.go(2);
    } else {
      logger.fatal(new Error(`The unknown process.env.NODE_ENV: ${env}`));
    }
  },

  [STEP[2]]() {
    this.dll = getMatchedDll(entry, dllPattern);
    const matched = this.dll.map(name =>
      fse.pathExists(path.join(dirs.dll, name))
    );
    Promise.all([
      fse.pathExists(releasePath),
      fse.pathExists(path.join(dirs.dll, dllManifest)),
      matched
    ])
      .then(result => {
        this.versionHash = getVerionHash();
        this.configHash = hash(config);
        if (result.includes(false) || !matched.length) {
          result[0] ? this.go(3, true) : this.go(4);
        } else {
          this.go(3);
        }
      })
      .catch(err => logger.fatal(err));
  },

  [STEP[3]](isForce) {
    const { versionHash, configHash } = this;
    fse
      .readJson(releasePath, { throws: true })
      .then(data => {
        const skip =
          !isForce &&
          data[env] &&
          data[env].version === versionHash &&
          data[env].config === configHash;
        skip
          ? logger.info('Unnecessary rebuild because same webpack dll')
          : this.go(4, data);
      })
      .catch(err => logger.fatal(err));
  },

  [STEP[4]](data) {
    const { versionHash, configHash } = this;
    const release = Object.assign({}, data, {
      [env]: { version: versionHash, config: configHash }
    });
    fse
      .outputJson(releasePath, release)
      .then(() => this.go(5))
      .catch(err => logger.fatal(err));
  },

  [STEP[5]]() {
    if (!clearOld || !this.dll || !this.dll.length) {
      return void this.go(6);
    }
    del(this.dll.map(dll => path.join(dirs.dll, `${dll}?(.map)`)))
      .then(folders => {
        logger.done(`Remove old dll ${folders.join(', ')}`);
        this.go(6);
      })
      .catch(err => logger.error(err));
  },

  [STEP[6]]() {
    clear();
    compileWebpack(config, {
      msg: 'Webpack dll is created',
      showStats: true,
      terminateOnError: true
    });
  },

  go(step, ...args) {
    this[step](...args);
  }
});

module.exports = options => steps(options)[STEP[1]]();
