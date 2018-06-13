/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-23 01:13:21
* @flow
*/

'use strict';

import React, { Component } from 'react';
import { StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import Colors from '../assets/styles/colors';

const { width: screenW } = Dimensions.get('window');

export default class AnimatedBorder extends Component {
  constructor(props) {
    super(props);

    this.value = new Animated.Value(props.isHide ? 0 : 1);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isHide && !nextProps.isHide) {
      this.animate(1);
    } else if (!this.props.isHide && nextProps.isHide) {
      this.animate(0);
    }
  }

  animate = (toValue) =>  {
    Animated.timing(
      this.value,
      {
        toValue: toValue,
        duration: 200,
        easing: Easing.linear
      }
    ).start();
  }

  render() {
    const { paddingLeft, paddingRight, isVertical, height, style } = this.props;

    const aWidth = this.value.interpolate({
      inputRange: [0, 1],
      outputRange: [0, screenW - (paddingLeft || 0) - (paddingRight || 0)]
    });

    const aHeight = this.value.interpolate({
      inputRange: [0, 1],
      outputRange: [0, height]
    });
    const customStyles = {
      width: isVertical ? 2 : aWidth,
      height: isVertical ? aHeight : 2
    };
    return (
      <Animated.View
        style={[styles.container, style, customStyles]}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 2,
    backgroundColor: Colors.textColor
  }
});
