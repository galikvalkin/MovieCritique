/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-29 01:53:19
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
export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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

  _emailAuth = () => {
    const isValid = this._validate().total;

    this.setState({
      submitted: true
    });

    if (isValid) {
      this.db.auth.signin({
        email: this.state.email,
        password: this.state.password
      })
      .then((res) => {
        this.props.loader.switch(true);
        this._switchLoaderOff();
        setTimeout(() => {
          this.props.auth.setUid(res.uid);
          this._clearForm();
          this.props.navigation && this.props.navigation.navigate('NewProfile');
        }, 1700);
      })
      .catch((error) => {
        this.setState({error: parseErrorResponse(error)});
      });
    }

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
      password: ''
    });
  }

  _validate = () => {
    const { email, password} = this.state;
    const emailValid = email && validateEmail(email);
    const passValid = password && validatePassword(password);

    return {
      total: emailValid && passValid,
      email: emailValid,
      password: passValid
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
              {"MovieCritique"}
            </Text>
          </View>

          <AuthForm
            items={items}
            error={this.state.error}
            btnTitle={'Sign in'}
            onBtnPress={this._emailAuth}
          />
        </ScrollView>
      </LinearGradient>
    );
  }
}
