// @flow

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Easing,
  PanResponder
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { observer, inject } from 'mobx-react/native';
import { landingColors } from '../assets/styles/colors';
import DownIcon from './DownIcon';
import FilmDescription from './FilmDescription';

const { width, height } = Dimensions.get('window');
const translateDestY = 300;

@inject((allStores) => ({
  loader: allStores.loader,
}))
@observer
export default class FilmDetails extends Component {
  constructor(props: Object) {
    super(props);

    const {startW, startH} = this.props;

    this.state = {
      film: null,
      startW,
      startH,
      destY: translateDestY,
      fullScreen: false
    };

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: (e) => {
        this.setState({
          destY: e.nativeEvent.pageY
        });
      },
      onPanResponderRelease: (e, gestureState) => {
        const diff = this.state.destY - translateDestY;

        if (diff < 150 && diff > -100) {
          this.setState({
            destY: translateDestY,
            fullScreen: false
          });

        } else if (diff < 150 && diff < -100) {
          this.setState({
            destY: 0,
            fullScreen: true
          });
        } else if (diff >= 150) {
          this.props.onPress();
          if (this.state.fullScreen) {
            this.setState({
              fullScreen: false
            });
          }
        }
      }
    });

    this.animatedTranslateY = new Animated.Value(0);
  }


  componentWillReceiveProps(nextProps: Object) {
    const notEqual = this.props.activeFilm !== nextProps.activeFilm;
    const {film, startW, startH} = nextProps;
    if (!this.props.activeFilm && nextProps.activeFilm) {
      this.setState({
        film,
        startW,
        startH,
        destY: translateDestY
      });
      this._animate(1);
    } else if (this.props.activeFilm && !nextProps.activeFilm) {
      this._animate(0)
      .then(() => {
        this.setState({
          film: null,
          startW: null,
          startH: null,
          destY: translateDestY
        });
      });
    } else if (this.props.activeFilm && nextProps.activeFilm && notEqual) {
      this._animate(0)
      .then(() => {
        this.setState({
          film,
          startW,
          startH,
          destY: translateDestY
        });
        this._animate(1);
      });
    }
  }

  _animate = (toValue) => {
    return new Promise((resolve, reject) => {
      Animated.timing(
        this.animatedTranslateY,
        {
          toValue: toValue,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true
        }
      )
      .start(resolve);
    });
  }


  render() {
    const { onPress, film, rate, redirect, reviewsNum, onViewAllPress, showPencil } = this.props;

    const gradientKey = this.state.fullScreen ? 'opacity' : 'normal';
    const gradientColors = landingColors[this.props.loader.lastColors][gradientKey];

    this.translateY = this.animatedTranslateY.interpolate({
      inputRange: [0, 1],
      outputRange: [height, this.state.destY]
    });
    return (
      <Animated.View
        style={[styles.details, {
          width: width,
          height: height,
          transform: [
            {
              translateX: 0
            },
            {
              translateY: this.translateY
            },
          ]
        }]}
        source={this.state.src}
        resizeMode="cover"
      >
        <LinearGradient
          colors={gradientColors}
          style={styles.gradient}
        >
          <View
            {...this._panResponder.panHandlers}
            style={styles.closeIconWrapper}>
            <DownIcon onPress={onPress} />
          </View>

          <FilmDescription
            film={film}
            rate={rate}
            redirect={redirect}
            reviewsNum={reviewsNum}
            onViewAllPress={onViewAllPress}
            showPencil={showPencil}
          />
        </LinearGradient>

      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  details: {
    position: 'absolute',
  },
  gradient: {
    flex: 1,
  },
  closeIconWrapper: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  }
});
