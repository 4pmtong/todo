/**
 ** ********************************************************
 ** @file .postcssrc.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:20:02
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:20:15
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const aldnoah = require('postcss-preset-aldnoah')({
  variables: require('./launcher/config/design')
});

module.exports = {
  plugins: [aldnoah]
};
