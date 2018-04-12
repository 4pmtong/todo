/**
 ** ********************************************************
 ** @file home.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:57:45
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:57:46
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

export default [
  {
    name: 'home',
    path: '/',
    component: () => import(/* webpackChunkName: "v-home" */ 'views/VHome'),
    meta: {
      title: 'home page'
    }
  }
];
