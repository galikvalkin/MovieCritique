/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-23 00:59:52
* @flow
*/

'use strict';

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../assets/styles/colors';
import icons from '../config/icons';

export default class DownIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { style } = this.props;
    return (
      <View>
        <Icon
          style={[styles.up, style]}
          name={icons.caretUp}
          size={30}
          color={Colors.textColor}
        />
        <Icon
          style={[styles.down, style]}
          name={icons.caretDown}
          size={30}
          color={Colors.textColor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  up: {
    top: 0
  },
  down: {
    marginTop: -15
  }
});
