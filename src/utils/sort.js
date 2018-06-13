/*
* @Author: valentinegalkin
* @Date:   2018-01-24 21:40:20
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-24 21:44:04
* @flow
*/

'use strict';

export function sort(arr, field) {
  let copy = arr.slice();

  return copy.sort((a, b) => {
    if (a[field] < b[field]) {
      return 1;
    }
    if (a[field] > b[field]) {
      return -1;
    }
    return 0;
  });
}
