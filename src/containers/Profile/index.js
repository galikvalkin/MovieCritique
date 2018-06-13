/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-29 22:59:39
* @flow
*/

'use strict';

import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { observer, inject } from 'mobx-react/native';
import Header from '../../components/Header';
import ProfileForm from '../../components/ProfileForm';
import { landingColors } from '../../assets/styles/colors';
import { getFileFormat } from '../../utils/file';
import styles from './styles';

@inject((allStores) => ({
  loader: allStores.loader,
  auth: allStores.auth,
  users: allStores.users
}))
@observer
export default class Profile extends Component {
  constructor(props) {
    super(props);
    const user = this.props.users.getUser(this.props.auth.uid);
    this.state = {
      name: user && user.name || '',
      movie: user && user.movie || '',
      actor: user && user.actor || '',
      submitted: false,
      error: '',
      image: user && user.image || ''
    };

    this.db = props.screenProps.db;
  }

  _validate = () => {
    const { name } = this.state;

    const nameValid = name !== '';

    return {
      total: nameValid,
      name: nameValid
    };
  }

  _nameChanged = (text) => {
    this.setState({name: text});
  }

  _movieChanged = (text) => {
    this.setState({movie: text});
  }

  _actorChanged = (text) => {
    this.setState({actor: text});
  }

  _setImage = (image) => {
    this.setState({
      image: {
        ...image,
        format: getFileFormat(image.mime),
      }
    });
  }

  _submit = () => {
    const isValid = this._validate().total;

    this.setState({
      submitted: true
    });

    if (isValid) {
      const uid = this.props.auth.uid;
      const { name, movie, actor, image } = this.state;
      const data = { name, movie, actor, image };
      this.db.user.update(data, uid);
    }

    this._resetSubmit();
  }

  _resetSubmit = () => {
    setTimeout(() => {
      this.setState({
        submitted: false,
        error: ''
      });
    }, 2000);
  }

  render() {
    const validated = this._validate();
    const { image: src } = this.state;
    const image = src ? (src.path ? src.path : src) : null;
    const source = image ? {uri: image} : null;
    const items = [
      {
        invalid: this.state.submitted && !validated.name,
        label: "Name",
        onChangeText: this._nameChanged,
        value: this.state.name
      },
      {
        label: "Favourite movie",
        onChangeText: this._movieChanged,
        value: this.state.movie
      },
      {
        label: "Favourite actor/actress",
        onChangeText: this._actorChanged,
        value: this.state.actor
      },
    ];

    return (
      <LinearGradient
        colors={landingColors[this.props.loader.lastColors].normal}
        style={styles.gradient}
      >
        <Header
          onPress={() => {
            this.props.navigation && this.props.navigation.navigate('DrawerOpen');
          }}
          title={'PROFILE'}
        />

        <ProfileForm
          image={source}
          changeImage={this._setImage}
          btnTitle={'Update'}
          onBtnPress={this._submit}
          items={items}
        />
      </LinearGradient>
    );
  }
}
