/**
 ** ********************************************************
 ** @file m-title.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:57:14
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:57:16
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

import { isServer } from 'envUtil';

const getTitle = vm => {
  const routeTitle = vm.$route && vm.$route.meta && vm.$route.meta.title;
  const title = vm.$options.title || routeTitle;
  return typeof title === 'function' ? title.call(vm) : title;
};

const serverTitleMixin = {
  created() {
    const title = getTitle(this);
    title && this.$ssrcontext && (this.$ssrcontext.title = title);
  }
};

const clientTitleMixin = {
  mounted() {
    const title = getTitle(this);
    title && (document.title = title);
  },
  activated() {
    const title = getTitle(this);
    title && (document.title = title);
  }
};

export default isServer ? serverTitleMixin : clientTitleMixin;
