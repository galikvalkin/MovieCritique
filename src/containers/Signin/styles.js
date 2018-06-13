/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-29 01:55:31
* @flow
*/

'use strict';

import { StyleSheet } from 'react-native';
import Colors from '../../assets/styles/colors';

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  contentContainerStyle: {
    paddingTop: 40,
    alignItems: 'center',
  },
  titleBox: {
    flexDirection: 'row',
  },
  title: {
    marginLeft: 2,
    marginRight: 2,
    fontSize: 30,
    color: Colors.textColor,
    marginTop: 20,
    marginBottom: 20
  }
});

export default styles;
