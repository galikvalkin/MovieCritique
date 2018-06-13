/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:16:32
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-23 23:44:19
* @flow
*/

'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Animated,
  Easing
} from 'react-native';

import Colors from '../assets/styles/colors';
import ExclamationMark from './ExclamationMark';

const DEFAULT_TIMER = 300;

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: this.props.value ? true : false
    };
    const toValue = this.props.value ? 1 : 0;
    this.bottomValue = new Animated.Value(toValue);
    this.fontsizeValue = new Animated.Value(toValue);
  }

  _onBlur = () => {
    this.setState({isFocused: false});
    if (!this.props.value) {
      this._animate(0, 200);
    }
  }

  _onFocus = () => {
    this.setState({isFocused: true});
    if (!this.props.value) {
      this._animate(1, 200);
    }
  }

  _animate = (value, timing) => {
    Animated
    .parallel([
      Animated.timing(
        this.fontsizeValue,
        {
          toValue: value,
          duration: timing || DEFAULT_TIMER,
          easing: Easing.linear
        }
      ),
      Animated.timing(
        this.bottomValue,
        {
          toValue: value,
          duration: timing || DEFAULT_TIMER,
          easing: Easing.linear
        }
      )
    ])
    .start();
  }

  render() {
    const {
      onChangeText,
      value,
      secureTextEntry,
      label,
      style,
      width,
      invalid,
      hideBorder,
      errorIconStyle
    } = this.props;
    const marginBottom = this.bottomValue.interpolate({
      inputRange: [0, 1],
      outputRange: [8, 35]
    });
    const fontSize = this.fontsizeValue.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 20]
    });

    const customWidth = {};
    if (width) {
      customWidth.width = width;
    }
    return (
      <View
        style={[styles.container, customWidth, style]}>
        <View style={styles.inputWrapper}>
          <Animated.Text
            style={[styles.label, {fontSize: fontSize, bottom: marginBottom}]}
          >
            {label}
          </Animated.Text>

          <TextInput
            onFocus={this._onFocus}
            onBlur={this._onBlur}
            style={[styles.input, customWidth]}
            onChangeText={onChangeText}
            value={value}
            placeholder={''}
            secureTextEntry={secureTextEntry}
            underlineColorAndroid={'transparent'}
          />

          {invalid ?
            <ExclamationMark
              wrapStyle={[styles.errorIcon, errorIconStyle]}
              animated={invalid}/>
            : null}

          {!hideBorder && <View
            style={[styles.border, customWidth]}
          />}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 315,
    height: 80,
    marginBottom: 15,
  },
  label: {
    color: Colors.white,
    position: 'absolute',
    left: 0,
  },
  inputWrapper: {
    position: 'absolute',
    top: 20,
    left: 0,
    paddingBottom: 10,
  },
  input: {
    width: 315,
    height: 20,
    color: Colors.white,
    fontSize: 18,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  border: {
    top: 12,
    height: 2,
    width: 315,
    backgroundColor: Colors.textColor,
  },
  errorIcon: {
    position: 'absolute',
    top: 0,
    right: 0
  }
});
