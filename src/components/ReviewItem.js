/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:42:42
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-24 22:49:58
* @flow
*/

'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Colors from '../assets/styles/colors';
import Rate from './Rate';
import AccountPhoto from './AccountPhoto';

export default class ReviewItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false
    };
    this.ref = null;
  }

  _onPress = (event) => {
    this.props.onPress();
    this.setState({
      isActive: !this.state.isActive
    });
  }

  render() {
    const { authorName, authorImage, rate, message } = this.props;
    return (
      <View
        style={styles.container}
      >

        <View style={styles.userBlock}>
          <AccountPhoto
            width={40}
            height={40}
            src={authorImage}
            disabled
          />
          <View style={styles.rateBlock}>
            <Text style={styles.name}>
              {authorName}
            </Text>
            <Rate
              disabled
              containerStyle={styles.stars}
              number={5}
              iconSize={18}
              rate={rate}
            />
          </View>
        </View>
        <View style={styles.messageBlock}>
          <Text style={styles.message}>
            {message}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 35,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  name: {
    color: Colors.textColor,
    fontSize: 25,
    fontWeight: '700',
  },
  userBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  rateBlock: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  stars: {},
  messageBlock: {
    paddingTop: 10,
  },
  message: {
    color: Colors.textColor,
    fontSize: 18
  }
});
