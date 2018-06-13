/*
* @Author: valentinegalkin
* @Date:   2018-01-10 00:40:55
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-29 22:58:16
* @flow
*/

'use strict';

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { observer, inject } from 'mobx-react/native';

import Signin from '../containers/Signin';
import Signup from '../containers/Signup';
import Landing from '../containers/Landing';
import NewProfile from '../containers/NewProfile';
import CreateReview from '../containers/CreateReview';
import ViewReviews from '../containers/ViewReviews';
import EditReview from '../containers/EditReview';

import MainDrawer from './main';

const routes = {
  Landing: {
    screen: Landing,
    navigationOptions: () => ({
      header: null
    }),
  },
  Signin: {
    screen: Signin,
    navigationOptions: () => ({
      header: null
    }),
  },
  Signup: {
    screen: Signup,
    navigationOptions: () => ({
      header: null
    }),
  },
  NewProfile: {
    screen: NewProfile,
    navigationOptions: () => ({
      header: null
    }),
  },
  MainDrawer: {
    screen: MainDrawer,
    navigationOptions: () => ({
      header: null
    }),
  },
  CreateReview: {
    screen: CreateReview,
    navigationOptions: () => ({
      header: null
    }),
  },
  ViewReviews: {
    screen: ViewReviews,
    navigationOptions: () => ({
      header: null
    }),
  },
  EditReview: {
    screen: EditReview,
    navigationOptions: () => ({
      header: null
    }),
  }
};

@inject((allStores) => ({
  auth: allStores.auth
}))
@observer
export default class Navigator extends Component {
  _initRouter() {
    return StackNavigator(routes, this._setNavigatorConfig());
  }

  _setNavigatorConfig() {
    return {
      initialRouteName: this.props.auth.uid ? 'MainDrawer' : 'Landing'
    };
  }

  render() {
    let
      screenProps = {
        db: this.props.db
      },
      Router = this._initRouter();

    return (
      <Router
        screenProps={screenProps}/>
    );
  }
}
