/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-23 00:59:33
* @flow
*/

'use strict';

import React, { Component } from 'react';
import { StyleSheet, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../assets/styles/colors';
import icons from '../config/icons';

export default class AnimatedArrow extends Component {
  constructor(props) {
    super(props);

    this.spinValue = new Animated.Value(0);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isDown && !nextProps.isDown) {
      this.spin(1);
    } else if (!this.props.isDown && nextProps.isDown) {
      this.spin(0);
    }
  }

  spin = (toValue) => {
    Animated.timing(
      this.spinValue,
      {
        toValue: toValue,
        duration: 200,
        easing: Easing.linear
      }
    ).start();
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    });
    const { style, iconSize } = this.props;
    return (
      <Animated.View
        style={{transform: [{rotate: spin}]}}
      >
        <Icon
          style={[styles.down, style]}
          name={icons.animatedArrow}
          size={iconSize || 30}
          color={Colors.textColor}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  down: {
    marginTop: -15
  }
});
