/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:42:42
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-22 23:04:10
* @flow
*/

'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

import Colors from '../assets/styles/colors';

export default class Button extends Component {
  render() {
    const { label, onPress, style } = this.props;
    return (
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={onPress}
      >
        <Text style={styles.label}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.textColor,
    borderRadius: 5,
  },
  label: {
    color: Colors.textColor,
    fontSize: 22,
  },
});
