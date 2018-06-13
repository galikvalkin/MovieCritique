/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-22 21:59:39
* @flow
*/

'use strict';

import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    ...Platform.select({
      ios: {},
      android: {}
    })
  },
});

export default styles;
