/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-29 01:49:56
* @flow
*/

'use strict';

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from './Button';
import Input from './Input';
import ErrorBlock from './ErrorBlock';

export default class AuthForm extends Component {
  render() {
    const { items, error, btnTitle, onBtnPress } = this.props;
    const buttons = [
      {
        label: btnTitle || 'Submit',
        onPress: onBtnPress
      },
    ];

    return (
      <View style={styles.form}>
        {items.map((item, index) => {
          return (
            <Input
              key={`form-input-${index}`}
              invalid={item.invalid}
              style={styles.inputStyle}
              label={item.label}
              secureTextEntry={item.secureTextEntry}
              onChangeText={item.onChangeText}
              value={item.value}
            />
          );
        })}
        {error !== '' && <ErrorBlock animated={error} text={error} />}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    marginBottom: 40
  },
  form: {
    alignItems: 'center',
    paddingTop: 30
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
  }
});
