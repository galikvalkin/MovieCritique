/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-22 21:54:42
* @flow
*/

'use strict';

import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';
import ErrorBlock from '../../components/ErrorBlock';
import {
  validatePassword,
  replaceSpaces,
  parseErrorResponse,
  parseSuccessResponse
} from '../../utils/validate';

import styles from './styles';

const { width } = Dimensions.get('window');

export default class ChangeEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      error: '',
      submitted: false
    };

    this.db = props.screenProps.db;
  }

  _oldPasswordChanged = (text) => {
    this.setState({oldPassword: replaceSpaces(text)});
  }

  _newPasswordChanged = (text) => {
    this.setState({newPassword: replaceSpaces(text)});
  }

  _changePassword = () => {
    const isValid = this._validate().total;
    this.setState({submitted: true});
    if (isValid) {
      const { oldPassword, newPassword } = this.state;
      this.db.auth.changePassword(oldPassword, newPassword)
      .then((success) => {
        this.setState({error: parseSuccessResponse(success)});
        this._clearForm();
        this._resetError();
      })
      .catch((error) => {
        this.setState({error: parseErrorResponse(error)});
        this._resetError();
      });
    } else {
      this._resetSubmitted();
    }
  }

  _resetError = () => {
    setTimeout(() => {
      this.setState({
        error: ''
      });
    }, 4000);
  }

  _resetSubmitted = () => {
    setTimeout(() => {
      this.setState({
        submitted: false
      });
    }, 2000);
  }

  _clearForm = () => {
    this.setState({
      oldPassword: '',
      newPassword: '',
      submitted: false
    });
  }

  _validate = () => {
    const { oldPassword, newPassword} = this.state;

    const oldPasswordValid = oldPassword && validatePassword(oldPassword);
    const newPasswordValid = newPassword && validatePassword(newPassword);

    return {
      total: oldPasswordValid && newPasswordValid,
      oldPassword: oldPasswordValid,
      newPassword: newPasswordValid
    };
  }

  render() {
    const buttons = [
      {
        label: 'Update password',
        onPress: this._changePassword,
      },
    ];

    const validated = this._validate();
    return (
      <View style={styles.container}>
        <Input
          invalid={this.state.submitted && !validated.oldPassword}
          width={width - 30}
          secureTextEntry
          errorIconStyle={styles.errorIcon}
          label={"Old password"}
          onChangeText={this._oldPasswordChanged}
          value={this.state.oldPassword}
        />
        <Input
          invalid={this.state.submitted && !validated.newPassword}
          width={width - 30}
          secureTextEntry
          errorIconStyle={styles.errorIcon}
          label={"New password"}
          onChangeText={this._newPasswordChanged}
          value={this.state.newPassword}
        />
        {this.state.error !== '' && <ErrorBlock animated={this.state.error} text={this.state.error} />}
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
