/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-24 20:59:46
* @flow
*/

'use strict';

import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../assets/styles/colors';
import icons from '../config/icons';

export default class ViewReviewsIcon extends Component {
  render() {
    const { iconSize, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <Icon
          name={icons.viewReviews}
          size={iconSize || 30}
          color={Colors.textColor}
        />
      </TouchableOpacity>
    );
  }
}
