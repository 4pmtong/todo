/**
 ** ********************************************************
 ** @file debris.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 15:02:17
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 15:02:18
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

export const getRequireModules = (type, key) => {
  const reg = new RegExp(`.${type}$`, 'ig');
  const path = key.replace(/^(.\/)/, '');
  return {
    path,
    name: (keys => {
      const i = keys.length - 1;
      return keys[i].toLowerCase() === 'index' ? keys[i - 1] : keys[i];
    })(path.replace(reg, '').split('/'))
  };
};
