/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:42:42
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-29 01:19:48
* @flow
*/

'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform
} from 'react-native';

import Colors from '../assets/styles/colors';
import NavIcon from './NavIcon';
import BackIcon from './BackIcon';
import PencilIcon from './PencilIcon';
import TrashIcon from './TrashIcon';

export default class Header extends Component {
  render() {
    const { title, onPress, showBack, showAdd, showDelete, onRightPress } = this.props;
    return (
      <View
        style={styles.container}
      >
        <View style={styles.leftBlock}>
          {!showBack && <NavIcon onPress={onPress}/>}
          {showBack && <BackIcon onPress={onPress}/>}
        </View>
        <Text style={styles.title}>
          {title}
        </Text>
        <View style={styles.rightBlock}>
          {showAdd && <PencilIcon onPress={onRightPress}/>}
          {showDelete && <TrashIcon onPress={onRightPress}/>}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        paddingTop: 20
      },
      android: {}
    })
  },
  title: {
    color: Colors.textColor,
    fontSize: 20,
    fontWeight: '700'
  },
  leftBlock: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: 20
      },
      android: {
        top: 0
      }
    }),
    left: 20,
    bottom: 0
  },
  rightBlock: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: 20
      },
      android: {
        top: 0
      }
    }),
    right: 20,
    bottom: 0
  },
});
