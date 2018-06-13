/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:42:42
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-26 23:36:26
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
import FilmPoster from './FilmPoster';
import Rate from './Rate';

export default class ListItem extends Component {
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
    const { name, src, id, rate } = this.props;
    return (
      <TouchableOpacity
        onPress={this._onPress}>
        <View
          style={styles.container}
        >
          <FilmPoster
            id={id}
            animate={this.state.isActive}
            src={src ? {uri: src} : null}
          />
          <View style={styles.textBlock}>
            <Text style={styles.name}>
              {name}
            </Text>
            <Rate
              disabled
              containerStyle={styles.stars}
              number={5}
              iconSize={25}
              rate={rate}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  name: {
    color: Colors.textColor,
    fontSize: 22,
    fontWeight: '700',
  },
  textBlock: {
    flex: 1,
    paddingLeft: 15,
  },
  stars: {
    marginTop: 10
  }
});
