/**
 ** ********************************************************
 ** @file index.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:49:23
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:49:24
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const path = require('path');
const { DefinePlugin, ProvidePlugin } = require('webpack');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const { server } = require('../config/env-util');
const { dirs } = require('../config/dir-vars');

module.exports = () => ({
  entry: path.join(dirs.src, 'entry-server.js'),

  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },

  target: 'node',

  devtool: 'source-map',

  externals: nodeExternals({ whitelist: /\.css$/ }),

  plugins: [
    new DefinePlugin({
      'process.env': { VUE_ENV: JSON.stringify(server) }
    }),
    new ProvidePlugin({
      Vue: 'vue'
    }),
    new VueSSRServerPlugin()
  ]
});
