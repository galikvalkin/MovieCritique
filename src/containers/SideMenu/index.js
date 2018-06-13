/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-29 00:23:00
* @flow
*/

'use strict';

import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { observer, inject } from 'mobx-react/native';
import ProfileBar from '../../components/ProfileBar';
import SideMenuItem from '../../components/SideMenuItem';
import { landingColors } from '../../assets/styles/colors';
import icons from '../../config/icons';
import styles from './styles';

@inject((allStores) => ({
  loader: allStores.loader,
  auth: allStores.auth,
  users: allStores.users,
  reviews: allStores.reviews
}))
@observer
export default class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.db = props.screenProps.db;
  }

  _goToUserProfile = () => {
    this.props.navigation && this.props.navigation.navigate('Profile');
  }

  _goToLatest = () => {
    this.props.navigation && this.props.navigation.navigate('Dashboard');
  }

  _goToMyReviews = () => {
    this.props.navigation && this.props.navigation.navigate('MyReviews');
  }

  _goToSettings = () => {
    this.props.navigation && this.props.navigation.navigate('Settings');
  }

  _goToStatistics = () => {
    this.props.navigation && this.props.navigation.navigate('Statistics');
  }

  _signout = () => {
    this.props.auth.setUid(null);
    this.db.auth.signout();
  }

  render() {
    const user = this.props.users.getUser(this.props.auth.uid);
    const reviews = this.props.reviews.getUserReviews(this.props.auth.uid);

    return (
      <LinearGradient
        colors={landingColors[this.props.loader.lastColors].normal}
        style={styles.gradient}
      >
        <ProfileBar
          disabled
          onPress={this._goToUserProfile}
          username={user && user.name}
          src={((user) && user.image) ? {uri: user.image} : null}
          reviews={reviews.length}
        />
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={styles.contentContainerStyle}
          style={styles.container}
        >
          <SideMenuItem
            title={'Latest'}
            icon={icons.tape}
            iconSize={25}
            onPress={this._goToLatest}
          />
          <SideMenuItem
            title={'My reviews'}
            icon={icons.myReviews}
            iconSize={25}
            onPress={this._goToMyReviews}
          />
          <SideMenuItem
            title={'Statistics'}
            icon={icons.chart}
            iconSize={22}
            onPress={this._goToStatistics}
          />
          <SideMenuItem
            title={'Settings'}
            icon={icons.settings}
            iconSize={28}
            onPress={this._goToSettings}
          />
          <SideMenuItem
            title={'Sign out'}
            icon={icons.signOut}
            iconSize={28}
            onPress={this._signout}
          />
        </ScrollView>
      </LinearGradient>
    );
  }
}
