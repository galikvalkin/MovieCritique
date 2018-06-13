// @flow

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import Colors from '../assets/styles/colors';

export default class FilmTitle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {this.props.title}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textColor
  }
});
