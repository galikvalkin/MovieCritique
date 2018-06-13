/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:42:42
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-22 12:32:23
* @flow
*/

'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import Colors from '../assets/styles/colors';
import AccountPhoto from './AccountPhoto';

export default class ProfileBar extends Component {
  render() {
    const { username, reviews, src, onPress, disabled } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          onPress && onPress();
        }}
        style={styles.container}
      >
        <AccountPhoto
          width={70}
          height={70}
          src={src}
          disabled={disabled}
        />

        <View style={styles.textBlock}>
          <Text style={styles.username}>
            {username}
          </Text>
          <Text style={styles.reviews}>
            Reviews: {reviews}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20
  },
  username: {
    color: Colors.textColor,
    fontSize: 18,
    fontWeight: '700'
  },
  reviews: {
    color: Colors.textColor,
    fontSize: 18,
    fontWeight: '700'
  },
  textBlock: {
    flex: 1,
    paddingLeft: 15,
  }
});
