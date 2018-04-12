/**
 ** ********************************************************
 ** @file 404.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:57:32
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:57:33
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

export default [
  {
    name: '404',
    path: '/404',
    component: () => import(/* webpackChunkName: "v-404" */ 'views/V404'),
    meta: {
      title: '404'
    }
  }
];
