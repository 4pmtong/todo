/**
 ** ********************************************************
 ** @file index.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:44:54
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const { ProvidePlugin } = require('webpack');
const { dirs } = require('../config/dir-vars');

module.exports = () => ({
  output: {
    path: dirs.build,
    publicPath: '/'
  },

  resolve: {
    modules: [dirs.node, dirs.src],
    alias: require('./alias'),
    extensions: ['.js', '.vue', '.json']
  },

  stats: require('./stats'),

  plugins: [
    new ProvidePlugin({
      CAMELCASE: 'lodash.camelcase',
      KEBABCASE: 'lodash.kebabcase'
    })
  ]
});
