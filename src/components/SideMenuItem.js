/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-23 01:02:22
* @flow
*/

'use strict';

import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../assets/styles/colors';
import icons from '../config/icons';

const CAMERA = icons.camera;

export default class SideMenuItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, style, onPress, icon, iconSize } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {onPress && onPress();}}
      >
        <Text style={styles.title}>
          {title}
        </Text>
        <Icon
          style={style}
          name={icon || CAMERA}
          size={iconSize || 24}
          color={Colors.textColor}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.textColor,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textColor,
  }
});
