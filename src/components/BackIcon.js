/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-24 21:18:10
* @flow
*/

'use strict';

import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../assets/styles/colors';
import icons from '../config/icons';

export default class BackIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { style, onPress, containerStyle } = this.props;
    return (
      <TouchableOpacity style={containerStyle} onPress={onPress}>
        <Icon
          style={[styles.up, style]}
          name={icons.backIcon}
          size={30}
          color={Colors.textColor}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  up: {
    top: 0
  }
});
