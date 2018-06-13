/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-29 01:54:32
* @flow
*/

'use strict';

import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { observer, inject } from 'mobx-react/native';
import AuthForm from '../../components/AuthForm';
import { landingColors } from '../../assets/styles/colors';

import {
  validateEmail,
  validatePassword,
  replaceSpaces,
  parseErrorResponse
} from '../../utils/validate';

import styles from './styles';

@inject((allStores) => ({
  loader: allStores.loader,
  auth: allStores.auth
}))
@observer
export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      submitted: false,
      error: ''
    };

    this.db = props.screenProps.db;
  }

  _switchLoaderOff = () => {
    setTimeout(() => {
      this.props.loader.switch(false);
    }, 2000);
  }

  _emailChanged = (text) => {
    this.setState({email: replaceSpaces(text)});
  }

  _passwordChanged = (text) => {
    this.setState({password: replaceSpaces(text)});
  }

  _confirmPasswordChanged = (text) => {
    this.setState({confirmPassword: replaceSpaces(text)});
  }

  _emailAuth = () => {
    const isValid = this._validate().total;

    this.setState({
      submitted: true
    });

    if (isValid) {
      this.db.auth.signup({
        email: this.state.email,
        password: this.state.password
      })
      .then((res) => {
        this.props.loader.switch(true);
        this._switchLoaderOff();

        setTimeout(() => {
          this._clearForm();
          this.props.navigation && this.props.navigation.navigate('NewProfile', {uid: res.uid});
        }, 2000);
      })
      .catch((error) => {
        this.setState({error: parseErrorResponse(error)});
        this._switchLoaderOff();
      });
    }

    this._resetSubmit();
  }

  _resetSubmit = () => {
    setTimeout(() => {
      this.setState({
        submitted: false,
        error: ''
      });
    }, 2000);
  }

  _clearForm = () => {
    this.setState({
      email: '',
      password: '',
      confirmPassword: ''
    });
  }

  _validate = () => {
    const { email, password, confirmPassword} = this.state;
    const passwordsEqual = password === confirmPassword;
    const emailValid = email && validateEmail(email);
    const passValid = password && validatePassword(password) && passwordsEqual;
    const confValid = confirmPassword && validatePassword(confirmPassword) && passwordsEqual;

    return {
      total: emailValid && passValid && confValid,
      email: emailValid,
      password: passValid,
      confirmPassword: confValid,
    };
  }

  render() {
    const validated = this._validate();
    const items = [
      {
        invalid: this.state.submitted && !validated.email,
        label: "E-mail",
        secureTextEntry: false,
        onChangeText: this._emailChanged,
        value: this.state.email
      },
      {
        invalid: this.state.submitted && !validated.password,
        label: "Password",
        secureTextEntry: true,
        onChangeText: this._passwordChanged,
        value: this.state.password
      },
      {
        invalid: this.state.submitted && !validated.confirmPassword,
        label: "Confirm password",
        secureTextEntry: true,
        onChangeText: this._confirmPasswordChanged,
        value: this.state.confirmPassword
      },
    ];

    return (
      <LinearGradient
        colors={landingColors[this.props.loader.lastColors].normal}
        style={styles.gradient}
      >
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={styles.contentContainerStyle}
        >
          <View style={styles.titleBox}>
            <Text style={styles.title}>
              {"New User"}
            </Text>
          </View>
          <AuthForm
            items={items}
            error={this.state.error}
            btnTitle={'Sign up'}
            onBtnPress={this._emailAuth}
          />
        </ScrollView>
      </LinearGradient>
    );
  }
}
