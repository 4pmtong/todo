/**
 ** ********************************************************
 ** @file promise.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:55:31
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:55:32
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

/* eslint-disable no-extend-native */

!Promise.prototype.finally &&
  Object.defineProperty(Promise.prototype, 'finally', {
    value(cb) {
      const P = this.constructor;
      return this.then(
        value => P.resolve(cb()).then(() => value),
        reason =>
          P.resolve(cb()).then(() => {
            throw reason;
          })
      );
    }
  });
