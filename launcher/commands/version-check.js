/**
 ** ********************************************************
 ** @file version-check.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:23:37
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:23:38
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const cp = require('child_process');
const semver = require('semver');
const {
  engines: { node, npm }
} = require('../../package.json');
const logger = require('../utils/logger');

if (!semver.valid(node)) {
  return void logger.fatal(new TypeError(`invalid node version ${node}`));
}
if (!semver.valid(npm)) {
  return void logger.fatal(new TypeError(`invalid npm version ${npm}`));
}

[
  {
    name: 'node',
    curr: semver.clean(process.version),
    required: node
  },
  {
    name: 'npm',
    curr: cp
      .execSync('npm -v')
      .toString()
      .trim(),
    required: npm
  }
].forEach(item => {
  const { name, curr, required } = item;
  if (!semver.satisfies(curr, required)) {
    return void logger.fatal(
      new Error(`${name} version ${curr} should be ${required}`)
    );
  }
});

logger.done('Valid node&npm version');
