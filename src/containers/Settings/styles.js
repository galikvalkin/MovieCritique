/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-22 20:57:08
* @flow
*/

'use strict';

import { StyleSheet } from 'react-native';
import Colors from '../../assets/styles/colors';

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  container: {
  },
  contentContainerStyle: {},
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
  },
  emailChangeForm: {
    paddingTop: 20,
  },
  inputStyle: {
  },
  button: {
    marginTop: 30,
    marginBottom: 50,
  }
});

export default styles;
