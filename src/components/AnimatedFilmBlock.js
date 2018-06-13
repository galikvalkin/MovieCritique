/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-27 00:42:55
* @flow
*/

'use strict';

import React, { Component } from 'react';
import { StyleSheet, Animated, Easing, View, Platform } from 'react-native';
import FilmTitle from './FilmTitle';
import FilmPoster from './FilmPoster';
import Rate from './Rate';

export default class AnimatedInfoBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: this.props.item || null
    };

    this.animValue = new Animated.Value(1);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.item && nextProps.item) {
      this._animateEasing(0)
      .then(() => {
        this.setState({
          item: nextProps.item
        }, () => {
          this._animateEasing(1);
        });
      });
    } else if ((this.props.item) && this.props.item.id !== nextProps.item.id) {
      this._animateEasing(0)
      .then(() => {
        this.setState({
          item: nextProps.item
        }, () => {
          this._animateEasing(1);
        });
      });
    }
  }

  _animateEasing = (toValue) => {
    return new Promise((resolve, reject) => {
      Animated.timing(
        this.animValue,
        {
          toValue: toValue,
          duration: 500,
          easing: Easing.linear
        }
      ).start(resolve);
    });
  }

  _onLayout = (e) => {
    this.props.onLayout && this.props.onLayout(e.nativeEvent.layout);
  }

  render() {
    const { item } = this.state;
    const opacity = this.animValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1]
    });

    return (
      <View
        onLayout={this._onLayout}
        style={[styles.container]}
      >
          <Animated.View
            style={[{opacity}]}
          >
            {item && <FilmPoster
              src={item.src ? {uri: item.src} : null}
            />}
          </Animated.View>
          {item && <FilmTitle title={item.name} />}
          {item && <Rate disabled rate={item.rate} number={5} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    ...Platform.select({
      android: {
        paddingBottom: 40,
      }
    })
  }
});
