/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   Valentin
* @Last Modified time: 2018-06-13 21:56:58
* @flow
*/

'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../assets/styles/colors';
import Button from './Button';

export default class EmptyReviewList extends Component {
  render() {
    const { onPress, firstLine, secondLine, showBtn, btnTitle } = this.props;
    return (
      <View
        style={styles.container}
      >
        <Text style={styles.firstrow}>
          {firstLine}
        </Text>
        <Text style={styles.secondrow}>
          {secondLine}
        </Text>

        {showBtn && <Button
          label={btnTitle}
          onPress={onPress}
          style={styles.button}
        />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  firstrow: {
    color: Colors.white,
    fontSize: 20,
    textAlign: 'center'
  },
  secondrow: {
    color: Colors.white,
    fontSize: 20,
    textAlign: 'center'
  },
  button: {
    marginTop: 10,
  }
});
