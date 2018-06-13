/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-22 21:53:50
* @flow
*/

'use strict';

import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';
import ErrorBlock from '../../components/ErrorBlock';
import {
  validateEmail,
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
      oldEmail: '',
      newEmail: '',
      password: '',
      error: '',
      submitted: false
    };

    this.db = props.screenProps.db;
  }

  _oldEmailChanged = (text) => {
    this.setState({oldEmail: replaceSpaces(text)});
  }

  _newEmailChanged = (text) => {
    this.setState({newEmail: replaceSpaces(text)});
  }

  _passwordChanged = (text) => {
    this.setState({password: replaceSpaces(text)});
  }

  _changeEmail = () => {
    const isValid = this._validate().total;
    this.setState({submitted: true});
    if (isValid) {
      this.db.auth.changeEmail({
        oldEmail: this.state.oldEmail,
        newEmail: this.state.newEmail,
        password: this.state.password,
      })
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
      oldEmail: '',
      newEmail: '',
      password: '',
      submitted: false
    });
  }

  _validate = () => {
    const { oldEmail, newEmail, password} = this.state;

    const oldEmailValid = oldEmail && validateEmail(oldEmail);
    const newEmailValid = newEmail && validateEmail(newEmail);
    const passValid = password && validatePassword(password);

    return {
      total: oldEmailValid && newEmailValid && passValid,
      oldEmail: oldEmailValid,
      newEmail: newEmailValid,
      password: passValid
    };
  }

  render() {
    const buttons = [
      {
        label: 'Update e-mail',
        onPress: this._changeEmail,
      },
    ];

    const validated = this._validate();
    return (
      <View style={styles.container}>
        <Input
          invalid={this.state.submitted && !validated.oldEmail}
          width={width - 30}
          errorIconStyle={styles.errorIcon}
          label={"Old e-mail"}
          onChangeText={this._oldEmailChanged}
          value={this.state.oldEmail}
        />
        <Input
          invalid={this.state.submitted && !validated.newEmail}
          width={width - 30}
          errorIconStyle={styles.errorIcon}
          label={"New e-mail"}
          onChangeText={this._newEmailChanged}
          value={this.state.newEmail}
        />
        <Input
          invalid={this.state.submitted && !validated.password}
          width={width - 30}
          secureTextEntry
          errorIconStyle={styles.errorIcon}
          label={"Password"}
          onChangeText={this._passwordChanged}
          value={this.state.password}
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
