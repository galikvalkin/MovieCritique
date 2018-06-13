/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   Valentin
* @Last Modified time: 2018-06-13 21:57:36
* @flow
*/

'use strict';

import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Colors from '../assets/styles/colors';
import Button from './Button';
import Input from './Input';
import AccountPhoto from './AccountPhoto';
import { showActionSheet } from './ActionSheet';

export default class ProfileForm extends Component {
  _callPhotoModule = () => {
    let options = [
      {
        label: 'Take a Photo',
        onPress: this._takePhoto
      },
      {
        label: 'Choose Photo from gallery',
        onPress: this._gallery
      },
      {
        label: 'Close',
        onPress: () => {console.log('Cancel');},
        isCancel: true
      }
    ];

    showActionSheet(options);
  }

  _setImage = (image) => {
    this.props.changeImage(image);
  }

  _takePhoto = () => {
    ImagePicker.openCamera({
      cropping: true
    }).then(this._setImage);
  }

  _gallery = () => {
    ImagePicker.openPicker({
      cropping: true
    }).then(this._setImage);
  }

  render() {
    const { title, image, items, btnTitle, onBtnPress, showTitle } = this.props;

    const buttons = [
      {
        label: btnTitle || 'Finish',
        onPress: onBtnPress,
      },
    ];

    return (
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={styles.contentContainerStyle}
      >
        {showTitle && <View style={styles.titleBox}>
          <Text style={styles.title}>
            {title}
          </Text>
        </View>}

        <AccountPhoto
          src={image}
          onPress={this._callPhotoModule}
          width={70}
          height={70}
          iconSize={32}
        />

        <View style={styles.form}>

          {items.map((item, index) => {
            return (
              <Input
                key={`profile-form-${index}`}
                invalid={item.invalid}
                style={styles.inputStyle}
                label={item.label}
                onChangeText={item.onChangeText}
                value={item.value}
              />
            );
          })}
          {
            buttons.map((button, index) =>
              <Button
                key={index}
                label={button.label}
                onPress={button.onPress}
                style={styles.button}
              />
            )
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: 40,
    alignItems: 'center',
  },
  container: {},
  titleBox: {
    flexDirection: 'row',
  },
  title: {
    marginLeft: 2,
    marginRight: 2,
    fontSize: 30,
    color: Colors.textColor,
    marginTop: 20,
    marginBottom: 20
  },
  inputStyle: {
    marginBottom: 40
  },
  form: {
    alignItems: 'center',
    paddingTop: 30
  },
  button: {
    marginTop: 30,
    marginBottom: 50,
  }
});
