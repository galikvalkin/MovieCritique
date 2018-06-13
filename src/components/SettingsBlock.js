/*
* @Author: valentinegalkin
* @Date:   2018-01-22 12:53:19
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-28 23:18:02
* @flow
*/

'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Colors from '../assets/styles/colors';
import AnimatedArrow from './AnimatedArrow';
import AnimatedBorder from './AnimatedBorder';

class SettingsBlock extends Component {
  render() {
    const { title, collapsed, onPress, children } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.titleBlock}
          onPress={onPress}
        >
          <Text style={styles.title}>
            {title}
          </Text>
          <AnimatedArrow
            isDown={collapsed}
            iconSize={24}
            color={Colors.textColor}
          />
        </TouchableOpacity>
        <AnimatedBorder
          paddingLeft={20}
          paddingRight={20}
          isHide={collapsed}
        />
        <Collapsible collapsed={collapsed}>
          {children}
        </Collapsible>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  titleBlock: {
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.textColor,
    fontSize: 20,
    fontWeight: '700'
  },
  verticalLeft: {
    position: 'absolute',
    top: 55,
    left: 20,
  }
});


export default SettingsBlock;
