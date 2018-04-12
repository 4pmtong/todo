/**
 ** ********************************************************
 ** @file interceptor.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:55:15
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:55:17
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

import axios from 'axios';

axios.defaults.timeout = 10000;

// if ajax url doesn't start with http, https or /data,
// it will add prefix of /api automatically
axios.interceptors.request.use(
  config => {
    const { url } = config;
    !/^(https?:|\/\/|\/data)/.test(url) &&
      (config.url = `/api${/^\//.test(url) ? '' : '/'}${url}`);
    return config;
  },
  err => Promise.reject(err)
);

// if errcode doesn't equal with zero, catch error handle
axios.interceptors.response.use(
  res => (+res.data.errcode === 0 ? res.data : Promise.reject(res)),
  err => Promise.reject(err)
);
