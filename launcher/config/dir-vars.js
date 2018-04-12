/**
 ** ********************************************************
 ** @file dir-vars.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:24:40
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:24:41
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

const path = require('path');

const [node, src, build] = ['node_modules', 'src', 'dist'];

/**
 * 文件目录名称
 * @namespace vars
 * @property {string} node - nodejs目录
 * @property {string} dll - dll资源存放目录
 * @property {string} src - 开发目录
 * @property {string} build - 文件生成存放目录
 * @property {string} launcher - 配置目录
 * @property {string} data - 存放模拟数据json
 * @property {string} fonts - 存放字体文件
 * @property {string} images - 存放公用图片
 * @property {string} styles - 存放公用css样式文件
 * @property {string} scripts - 存放js文件
 * @property {string} views - 存放vue页面文件
 * @property {string} comps - 存放vue公用组件
 * @property {string} deploy - 引导配置项
 * @property {string} filters - 存放自定义公用vue过滤器
 * @property {string} directives - 存放自定义公用vue指令
 * @property {string} store - 存放vuex状态
 * @property {string} mixins - 存放公用mixins
 * @property {string} api - 存放api接口
 * @property {string} routes - vue路由页面配置
 * @property {string} utils - 存放公共工具方法
 * @property {string} ui - 存放基础组件
 */
const variables = {
  node,

  dll: `.dll->${node}`,

  src,

  build,

  launcher: 'launcher',

  data: `data->${src}`,

  fonts: `fonts->${src}`,

  images: `images->${src}`,

  styles: `styles->${src}`,

  scripts: `scripts->${src}`,

  views: `views->${src}`,

  comps: `components->${src}`,

  deploy: `deploy->${src}`,

  filters: `filters->${src}`,

  directives: `directives->${src}`,

  store: `store->${src}`,

  mixins: `mixins->${src}`,

  api: `api->${src}`,

  routes: `routes->${src}`,

  utils: `utils->${src}`,

  ui: `ui->${src}`
};

((vars, dirs) => {
  module.exports = { vars, dirs };
})(
  (() => {
    const vars = {};
    const map = value => value.replace(/->.+/g, '');
    Object.keys(variables).forEach(key => {
      vars[key] = map(variables[key]);
    });
    return vars;
  })(),
  (() => {
    const dirs = {};
    const varToDir = variable => fn => fn(variable.split('->'));
    const getDir = x => path.join(__dirname, '../../', x[1] || '', x[0]);
    Object.keys(variables).forEach(key => {
      dirs[key] = varToDir(variables[key])(getDir);
    });
    return dirs;
  })()
);
