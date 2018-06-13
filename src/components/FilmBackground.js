// @flow

import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';

const { width, height: screenHeight } = Dimensions.get('window');

export default class FilmBackground extends Component {
  constructor(props: Object) {
    super(props);

    const {startX, startY, startW, startH, fixed, src} = this.props;

    this.state = {
      src: src || null,
      startX,
      startY,
      startW,
      startH
    };

    this.animated = new Animated.Value(fixed ? 1 : 0);
  }

  componentWillReceiveProps(nextProps: Object) {
    const notEqual = this.props.activeFilm !== nextProps.activeFilm;
    const {src, startX, startY, startW, startH} = nextProps;
    if (!this.props.activeFilm && nextProps.activeFilm) {
      this.setState({
        src,
        startX,
        startY,
        startW,
        startH
      });
      this._animate(1);
    } else if (this.props.activeFilm && !nextProps.activeFilm) {
      this._animate(0)
      .then(() => {
        this.setState({
          src: null,
          startX: null,
          startY: null,
          startW: 0,
          startH: 0
        });
      });
    } else if (this.props.activeFilm && nextProps.activeFilm && notEqual) {
      this._animate(0)
      .then(() => {
        this.setState({
          src,
          startX,
          startY,
          startW,
          startH
        });
        this._animate(1);
      });
    }
  }

  _animate = (toValue) => {
    return new Promise((resolve, reject) => {
        Animated.timing(
          this.animated,
          {
            toValue: toValue,
            duration: 200,
            easing: Easing.linear,
            useNativeDrive: true
          }
        )
      .start(resolve);
    });
  }


  render() {
    const translateInitY = this.state.startY || 0;
    const translateDestY = 0;

    const translateInitX = this.state.startX || 0;
    const translateDestX = 0;

    this.fullWidth = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [(this.state.startW || 0), width]
    });

    this.fullHeight = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [(this.state.startH || 0), screenHeight]
    });

    this.translateX = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [translateInitX, translateDestX]
    });

    this.translateY = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [translateInitY, translateDestY]
    });
    return (
      <Animated.Image
        style={[styles.image, {
          width: this.fullWidth,
          height: this.fullHeight,
          transform: [
            {
              translateX: this.translateX
            },
            {
              translateY: this.translateY
            },
          ]
        }]}
        source={this.state.src}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
  },
});
