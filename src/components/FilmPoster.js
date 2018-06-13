// @flow

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../assets/styles/colors';

const { width } = Dimensions.get('window');
const maxWidth = width / 3;

export default class FilmPoster extends Component {
  constructor(props: Object) {
    super(props);

    this.state = {
      width: maxWidth,
      height: 50
    };

    if (props.src) {
      Image.getSize(props.src.uri, (w, h) => {
        this.setState({
          width: w,
          height: h
        });
      });
    }
  }

  static contextTypes = {
    onImageRef: PropTypes.func
  };

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.src && nextProps.src !== this.props.src) {
      Image.getSize(nextProps.src.uri, (w, h) => {
        this.setState({
          width: w,
          height: h
        });
      });
    }
  }

  render() {
    const { src, id } = this.props;
    const height = this.state.height * (maxWidth / this.state.width);

    return (
      <View style={[styles.photoAccount, {maxHeight: height}]}>
        <Image
          ref={ref => {
            this.context.onImageRef && this.context.onImageRef(id, ref, src);
          }}
          style={[styles.image, {width: maxWidth, height: height}]}
          source={src}
          resizeMode="stretch"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 5,
  },
  photoAccount: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.white,
    // alignItems: 'center',
    // justifyContent: 'center',
    overflow: 'hidden',
  },
});
