/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:42:42
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-29 00:49:13
* @flow
*/

'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import Colors from '../assets/styles/colors';
import Rate from './Rate';
import FilmPoster from './FilmPoster';

export default class MyReviewItem extends Component {
  render() {
    const { movieName, movieImage, rate, message, onPress } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.container}
      >

        <View style={styles.userBlock}>
          <FilmPoster
            src={movieImage}
          />
          <View style={styles.rateBlock}>
            <Text style={styles.name}>
              {movieName}
            </Text>
            <Rate
              disabled
              containerStyle={styles.stars}
              number={5}
              iconSize={18}
              rate={rate}
            />
            <Text style={styles.message}>
            {message}
          </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
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
  },
  rateBlock: {
    flex: 1,
    flexDirection: 'column',
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
