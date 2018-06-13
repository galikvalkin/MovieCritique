/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-29 02:00:30
* @flow
*/

import React, { Component } from 'react';
import { ART, Animated } from 'react-native';

const { Shape, Path } = ART;
const AnimatedShape = Animated.createAnimatedComponent(Shape);

export default class AnimatedCircle extends Component {
  constructor(props) {
    super(props);

    this.animValue = new Animated.Value(this.props.animated ? 0 : 1);
  }

  componentDidMount() {
    if (this.props.animated) {
      this._animate(1);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.animated && nextProps.animated) {
      if (this.props.id !== nextProps.id) {
        this._animate(1);
      }
    }
  }

  _animate = (toValue) => {
    this.animValue.setValue(0);
    Animated.timing(this.animValue, {
      duration: 400,
      toValue: toValue
    }).start();
  }

  render() {
    const { x, y, radius, stroke, fill, dotLineWidth, startColor } = this.props;
    let _animValue = this.animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [startColor, stroke]
      });

    let _animWidth = this.animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, dotLineWidth]
      });

    let _animOpacity = this.animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.2, 1]
    });

    const path = new Path().moveTo(x, y - radius).arc(0, radius * 2, radius).arc(0, radius * -2, radius).close();

    let data = {
      d: path,
      stroke: stroke,
      fill: this.props.animated ? _animValue : fill,
      strokeWidth: this.props.animated ? _animWidth : dotLineWidth
    };

    return (
      <AnimatedShape opacity={_animOpacity} {...data} />
    );
  }
}

