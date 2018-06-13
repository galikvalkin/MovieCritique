/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-29 01:10:22
* @flow
*/

'use strict';

import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Button from './Button';
import TextArea from './TextArea';
import AnimatedBorder from './AnimatedBorder';
import Rate from './Rate';

export default class ReviewForm extends Component {
  render() {
    const { value, onChangeText, rate, onChangeRate, btnTitle, onBtnPress } = this.props;
    const buttons = [
      {
        label: btnTitle || 'Send',
        onPress: onBtnPress,
      },
    ];

    return (
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={styles.contentContainer}
      >
        <AnimatedBorder
          style={styles.topBorder}
          paddingLeft={30}
          paddingRight={30}
          isHide={false}
        />
        <TextArea
          value={value}
          onChangeText={onChangeText}
        />
        <AnimatedBorder
          paddingLeft={30}
          paddingRight={30}
          isHide={false}
        />

        <Rate
          containerStyle={styles.stars}
          number={5}
          iconSize={40}
          rate={rate}
          onPress={onChangeRate}
        />
        {
          buttons.map((button, index) =>
            <Button
              key={index}
              label={button.label}
              onPress={button.onPress}
              style={styles.button}
            />
          )
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  stars: {
    marginTop: 40,
    alignSelf: 'center'
  },
  contentContainer: {
    paddingLeft: 30,
    paddingRight: 30
  },
  button: {
    alignSelf: 'center',
    marginTop: 50,
  },
  topBorder: {
    marginTop: 20
  }
});
