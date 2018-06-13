/*
* @Author: valentinegalkin
* @Date:   2018-01-10 00:34:17
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-30 00:37:16
* @flow
*/

'use strict';

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { observer, inject } from 'mobx-react/native';
import Navigator from './navigator';
import Loading from './containers/Loading';
import { getRandom } from './utils/math';

@inject((allStores) => ({
  auth: allStores.auth,
  loader: allStores.loader
}))
@observer
export default class App extends Component {
  componentWillMount() {
    SplashScreen.hide();
    this.props.loader.switch(true);
    setTimeout(() => {
      this.props.loader.switch(!this.props.loader.show);
    }, getRandom(1000, 8000));
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.auth.isHydrated && <Navigator
          db={this.props.db}
        />}
        <LoaderWrapper />
      </View>
    );
  }
}

@inject((allStores) => ({
  loader: allStores.loader,
}))
@observer
class LoaderWrapper extends Component {
  render() {
    return (
      <Loading
        writeLast={(icon, colors) => {
          this.props.loader.switchLast(icon, colors);
        }}
        show={this.props.loader.show}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
