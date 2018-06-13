/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-21 12:52:16
* @flow
*/

'use strict';

import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { observer, inject } from 'mobx-react/native';
import { landingColors } from '../../assets/styles/colors';
import Button from '../../components/Button';
import styles from './styles';

@inject((allStores) => ({
  loader: allStores.loader,
}))
@observer
export default class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const buttons = [
      {
        label: 'Sign in',
        onPress: () => {
          this.props.navigation && this.props.navigation.navigate('Signin');
        },
      },
      {
        label: 'New User',
        onPress: () => {
          this.props.navigation && this.props.navigation.navigate('Signup');
        },
      },
    ];

    return (
      <LinearGradient
        colors={landingColors[this.props.loader.lastColors].normal}
        style={styles.container}
      >
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
      </LinearGradient>
    );
  }
}
