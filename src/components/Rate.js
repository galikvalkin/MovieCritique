/*
* @Author: valentinegalkin
* @Date:   2018-01-22 11:57:52
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-27 00:47:42
* @flow
*/

'use strict';

import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../assets/styles/colors';
import icons from '../config/icons';

const FULL = icons.star;
const EMPTY = icons.starO;

export default class Rate extends Component {
  _getStars = () => {
    const { number } = this.props;
    const stars = [];
    for (let i = 0; i < number; i++) {
      stars.push({});
    }

    return stars;
  }

  render() {
    const {
      style,
      containerStyle,
      rate,
      iconSize,
      disabled,
      onPress
    } = this.props;

    const stars = this._getStars();
    return (
      <View style={[styles.container, containerStyle]}>
        {stars.map((item, index) => {
          return (
            <TouchableOpacity
              key={`star-${index}`}
              disabled={disabled}
              onPress={() => {onPress && onPress(index + 1);}}
            >
              <Icon
                style={[styles.star, style]}
                name={rate >= index + 1 ? FULL : EMPTY}
                size={iconSize || 24}
                color={Colors.textColor}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  star: {
    marginLeft: 2,
  }
});
