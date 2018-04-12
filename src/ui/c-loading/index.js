/**
 ** ********************************************************
 ** @file index.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:59:52
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 15:00:01
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

import CLoading from './CLoading';

let [vm, propsData] = [];

const Loading = options => {
  if (typeof options === 'string') {
    propsData = { text: options };
  } else {
    propsData = options;
  }
  if (vm && vm.visible) {
    return vm;
  }
  const view = document.querySelector('.router-view') || document.body;
  vm = new Vue({ ...CLoading, propsData }).$mount();
  view.appendChild(vm.$el);
  return vm;
};

export default Loading;
