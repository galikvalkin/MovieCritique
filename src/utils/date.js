/*
* @Author: valentinegalkin
* @Date:   2018-01-24 21:29:10
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-24 21:38:52
* @flow
*/

'use strict';

import moment from 'moment';
import formats from '../config/time.formats';

export function parseDate(dString, format) {
  if (dString) {
    if (!format) {
      return moment(dString).format(formats.reviewDateDisplay);
    } else if (format) {
      return moment(dString, format).format(formats.reviewDateDisplay);
    }
  }

  return '';
}

export function getTimestamp(dString, format) {
  if (dString) {
    if (!format) {
      return moment(dString).valueOf();
    } else if (format) {
      return moment(dString, format).valueOf();
    }
  }

  return null;
}
