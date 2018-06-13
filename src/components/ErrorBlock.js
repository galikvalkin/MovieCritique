/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-21 22:05:22
* @flow
*/

'use strict';

import React, { Component } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import Colors from '../assets/styles/colors';

export default class ErrorBlock extends Component {
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
        tension: 50
      }
    ).start();
  }

  render() {
    const { style, wrapStyle, text } = this.props;
    return (
      <Animated.View
        style={[styles.container, {transform: [{scale: this.animValue}]}, wrapStyle]}
      >
        <Text style={[styles.text, style]}>
          {text}
        </Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 5,
    padding: 10,
  },
  text: {
    color: Colors.white,
    fontSize: 18
  }
});
