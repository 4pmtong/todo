/**
 ** ********************************************************
 ** @file index.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 15:00:40
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 15:00:41
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

import CToast from './CToast';
import PopupManager from './PopupManager';

const popupManager = new PopupManager(5);

const ToastCtr = Vue.extend(CToast);

const Toast = function(options) {
  let cfg = options;

  if (typeof cfg === 'string') {
    cfg = { msg: cfg };
  }

  if (!cfg.msg || typeof cfg.msg !== 'string') {
    throw new Error(`toast 参数有误--${JSON.stringify(cfg)}`);
  }

  const vm = new ToastCtr({
    propsData: cfg
  }).$mount();

  window.document.body.appendChild(vm.$el);
  vm.visible = true;
  Vue.nextTick(() => popupManager.push(vm));

  return vm;
};

export default Toast;
