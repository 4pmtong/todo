/**
 ** ********************************************************
 ** @file .eslintrc.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:19:00
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:19:02
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

module.exports = {
  extends: 'aldnoah',
  settings: {
    'import/resolver': {
      webpack: { config: require('./launcher/webpack-base') }
    }
  },
  globals: {
    Vue: true,
    CAMELCASE: true,
    KEBABCASE: true
  }
};
