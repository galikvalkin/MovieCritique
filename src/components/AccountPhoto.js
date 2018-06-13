// @flow

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../assets/styles/colors';
import icons from '../config/icons';

class CustomImage extends Component {
  render() {
    const { src, width, height } = this.props;
    let customSize = {};
    if (width) {
      customSize.width = width;
    }
    if (height) {
      customSize.height = height;
    }
    return (
      <Image
        style={[styles.image, customSize]}
        source={src}
        resizeMode="stretch"
      />
    );
  }
}

class DefaultImage extends Component {
  render() {
    const size = this.props.size || 25;
    return (
      <Icon
        name={icons.photoCamera}
        size={size}
        color={Colors.white} />
    );
  }
}

export default class AccountPhoto extends Component {
  render() {
    const { src, onPress, width, height, disabled } = this.props;
    let customSize = {};
    if (width) {
      customSize.width = width;
    }
    if (height) {
      customSize.height = height;
    }
    return (
      <TouchableOpacity disabled={disabled} onPress={onPress}>
        <View style={[styles.photoAccount, customSize]}>
          {src ? <CustomImage {...this.props}/> : <DefaultImage size={this.props.iconSize}/>}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  photoAccount: {
    width: 50,
    height: 50,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: Colors.white05
  },
});
