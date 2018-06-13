/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-23 01:02:56
* @flow
*/

'use strict';

import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors, { landingColors } from '../../assets/styles/colors';
import icons from '../../config/icons';

import styles from './styles';

const CAMERA = icons.camera;
const TAPE = icons.tape;
const CHECK = icons.check;

export default class Loading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: CAMERA,
      name: 'camera',
      hideLoader: false
    };

    this.opacityValue = new Animated.Value(1);
    this.animValue = new Animated.Value(0.3);
    this.titleValue = new Animated.Value(0);
  }

  counter = 0;

  componentWillMount() {
    if (this.props.show) {
      this.bounce();
    } else {
      this.setState({hideLoader: true});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.show && !nextProps.show) {
      this.props.writeLast(this.state.icon, this.state.name);
      this.vanish();
    } else if (!this.props.show && nextProps.show) {
      this.appear()
      .then(() => {
        this.bounce();
      });
    }
  }

  appear() {
    this.setState({hideLoader: false});
    return new Promise((resolve, reject) => {
      Animated.timing(
        this.opacityValue,
        {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          delay: 800
        }
      ).start(resolve);
    });
  }

  vanish() {
    Animated.timing(
      this.opacityValue,
      {
        toValue: 0,
        duration: 1000,
        easing: Easing.linear,
        delay: 400
      }
    ).start(() => {
      this.setState({hideLoader: true});
    });
  }

  bounce() {
    this.animValue.setValue(0.3);
    this.titleValue.setValue(0);
    Animated.parallel([
      Animated.spring(
        this.animValue,
        {
          toValue: 1,
          friction: 3,
          tension: 60
        }
      ),
      Animated.spring(
        this.titleValue,
        {
          toValue: 1,
          friction: 3,
          tension: 1
        }
      )
    ])
    .start(() => {
        this.counter++;

        setTimeout(() => {
          if (this.props.show) {
            let mod = this.counter % 3;
            if (mod === 1) {
              this.setState({
                icon: TAPE,
                name: 'tape'
              });
            } else if (mod === 2) {
              this.setState({
                icon: CHECK,
                name: 'check'
              });
            } else if (mod === 0) {
              this.setState({
                icon: CAMERA,
                name: 'camera'
              });
            }
            this.bounce();
          }
        }, 1000);
    });
  }

  render() {
    const textSize = this.titleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [28, 40, 28]
    });

    const opacity = this.opacityValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1]
    });

    if (this.state.hideLoader) {
      return null;
    }
    return (
      <Animated.View
        style={[styles.container, {opacity}]}
      >
        <LinearGradient
          colors={landingColors[this.state.name].normal}
          style={styles.gradient}
        >
          <Animated.View
            style={{transform: [{scale: this.animValue}]}}
          >
            <Icon
              name={this.state.icon}
              size={80}
              color={Colors.textColor}
            />
          </Animated.View>

          <Animated.Text style={[styles.title, {fontSize: textSize}]}>
            MovieCritique
          </Animated.Text>
        </LinearGradient>

      </Animated.View>
    );
  }
}
