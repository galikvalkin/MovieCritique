/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:16:32
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-23 01:42:53
* @flow
*/

'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native';

import Colors from '../assets/styles/colors';

export default class TextArea extends Component {
  render() {
    const {
      onChangeText,
      value,
      style,
      placeholder
    } = this.props;

    return (
      <View
        style={[styles.container, style]}>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            underlineColorAndroid={'transparent'}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    textAlignVertical: "top",
    minHeight: 200,
    color: Colors.white,
    fontSize: 20,
  }
});
