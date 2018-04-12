/**
 ** ********************************************************
 ** @file index.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:46:19
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:46:20
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const path = require('path');
const { DefinePlugin, ProvidePlugin } = require('webpack');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const alias = require('../webpack-base/alias');
const { client } = require('../config/env-util');
const { dirs } = require('../config/dir-vars');

module.exports = () => ({
  entry: {
    app: path.join(dirs.src, 'entry-client.js')
  },

  plugins: [
    new DefinePlugin({
      'process.env': { VUE_ENV: JSON.stringify(client) }
    }),
    // @notice if the vue version is esm, the webpack client config
    // should use ['vue', 'default'],
    // but the webpack server config doesn't need, it always be 'vue'
    new ProvidePlugin({
      Vue: !alias.vue$ || /esm/.test(alias.vue$) ? ['vue', 'default'] : 'vue'
    }),
    new VueSSRClientPlugin()
  ]
});
