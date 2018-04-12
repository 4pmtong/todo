/**
 ** ********************************************************
 ** @file pe-theme.js
 ** @author WenKang Lin <wenkanglin0910@gmail.com>
 ** @date 2018-04-12 14:43:54
 ** @last_modified_by WenKang Lin <wenkanglin0910@gmail.com>
 ** @last_modified_date 2018-04-12 14:43:56
 ** @copyright (c) 2018-present, WenKang Lin
 ** ********************************************************
 */

module.exports = {
  'pretty-error > header': {
    display: 'none'
  },

  'pretty-error > header > title': {
    display: 'none'
  },

  'pretty-error > header > colon': {
    display: 'none'
  },

  'pretty-error > header > message': {
    color: 'white'
  },

  'pretty-error > trace': {
    marginTop: 2
  },

  'pretty-error > trace > item > header > pointer > file': {
    color: 'yellow'
  },

  'pretty-error > trace > item > header > pointer > line': {
    color: 'yellow'
  },

  'pretty-error > trace > item > header > what': {
    color: 'blue'
  }
};
