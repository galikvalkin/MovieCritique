/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-29 22:59:29
* @flow
*/

'use strict';

import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { observer, inject } from 'mobx-react/native';
import ProfileForm from '../../components/ProfileForm';
import { landingColors } from '../../assets/styles/colors';
import { getFileFormat } from '../../utils/file';
import styles from './styles';

@inject((allStores) => ({
  loader: allStores.loader,
  auth: allStores.auth
}))
@observer
export default class NewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      movie: '',
      actor: '',
      submitted: false,
      error: '',
      image: null
    };

    this.db = props.screenProps.db;
  }

  _switchLoaderOff = () => {
    setTimeout(() => {
      this.props.loader.switch(false);
    }, 1000);
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
      const uid = this._getUid();
      const { name, movie, actor, image } = this.state;
      const data = { name, movie, actor, image };

      this.db.user.create(data, uid)
      .then(() => {
        this.props.loader.switch(true);
        this._switchLoaderOff();
        setTimeout(() => {
          this._clearForm();
          this.props.auth.setUid(uid);
        }, 2000);
      });
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

  _clearForm = () => {
    this.setState({
      name: '',
      movie: '',
      actor: ''
    });
  }

  _getUid = () => {
    const { navigation: nav } = this.props;
    if ((nav) && (nav.state) && (nav.state.params)) {
      return nav.state.params.uid || null;
    }
  }

  render() {
    const validated = this._validate();
    const source = this.state.image ? {uri: this.state.image.path} : null;
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
        <ProfileForm
          image={source}
          changeImage={this._setImage}
          btnTitle={'Finish'}
          onBtnPress={this._submit}
          items={items}
          showTitle
          title={"Create Profile"}

        />
      </LinearGradient>
    );
  }
}
