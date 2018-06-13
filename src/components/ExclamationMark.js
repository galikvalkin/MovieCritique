/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-23 01:00:13
* @flow
*/

'use strict';

import React, { Component } from 'react';
import { Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../assets/styles/colors';
import icons from '../config/icons';

export default class ExclamationMark extends Component {
  constructor(props) {
    super(props);

    this.animValue = new Animated.Value(this.props.animated ? 0.3 : 1);
  }

  componentDidMount () {
    if (this.props.animated) {
      this.bounce();
    }
  }

  bounce() {
    this.animValue.setValue(0.3);
    Animated.spring(
      this.animValue,
      {
        toValue: 1,
        friction: 3,
        tension: 100
      }
    ).start();
  }

  render() {
    const { style, wrapStyle, size } = this.props;
    return (
      <Animated.View
        style={[{transform: [{scale: this.animValue}]}, wrapStyle]}
      >
        <Icon
          style={style}
          name={icons.exclamationCircle}
          size={size || 24}
          color={Colors.textColor}
        />
      </Animated.View>
    );
  }
}
