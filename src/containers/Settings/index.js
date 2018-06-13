/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-29 11:56:46
* @flow
*/

'use strict';

import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { observer, inject } from 'mobx-react/native';
import { landingColors } from '../../assets/styles/colors';
import Header from '../../components/Header';
import SettingsBlock from '../../components/SettingsBlock';
import ChangeEmail from '../ChangeEmail';
import ChangePassword from '../ChangePassword';
import styles from './styles';

@inject((allStores) => ({
  loader: allStores.loader,
  auth: allStores.auth,
  users: allStores.users
}))
@observer
export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseEmail: true,
      collapsePass: true
    };

    this.db = props.screenProps.db;
  }

  _switchEmail = () => {
    const newState = !this.state.collapseEmail;
    const update = {
      collapseEmail: newState,
      collapsePass: !this.state.collapsePass ? true : this.state.collapsePass
    };

    this.setState(update);
  }

  _switchPass = () => {
    const newState = !this.state.collapsePass;
    const update = {
      collapsePass: newState,
      collapseEmail: !this.state.collapseEmail ? true : this.state.collapseEmail
    };

    this.setState(update);
  }

  render() {
    return (
      <LinearGradient
        colors={landingColors[this.props.loader.lastColors].normal}
        style={styles.gradient}
      >
        <Header
          onPress={() => {
            this.props.navigation && this.props.navigation.navigate('DrawerOpen');
          }}
          title={'SETTINGS'}
        />
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={styles.contentContainerStyle}
          style={styles.container}
        >
          <SettingsBlock
            onPress={this._switchEmail}
            title={'Change E-mail'}
            collapsed={this.state.collapseEmail}
          >
            <ChangeEmail {...this.props}/>
          </SettingsBlock>

          <SettingsBlock
            onPress={this._switchPass}
            title={'Change password'}
            collapsed={this.state.collapsePass}
          >
            <ChangePassword {...this.props}/>
          </SettingsBlock>
        </ScrollView>
      </LinearGradient>
    );
  }
}
