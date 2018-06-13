/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-29 01:28:45
* @flow
*/

'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import LinearGradient from 'react-native-linear-gradient';
import FilmTitle from '../../components/FilmTitle';
import FilmBackground from '../../components/FilmBackground';
import Header from '../../components/Header';
import ReviewForm from '../../components/ReviewForm';
import { landingColors } from '../../assets/styles/colors';
import {
  validateReviewMessage,
} from '../../utils/validate';

import styles from './styles';

@inject((allStores) => ({
  loader: allStores.loader,
  movies: allStores.movies,
  auth: allStores.auth
}))
@observer
export default class CreateReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      rate: 0,
    };

    this.db = props.screenProps.db;
  }

  _messageChanged = (text) => {
    this.setState({message: text});
  }

  _changeRate = (rate) => {
    this.setState({rate});
  }

  _submit = () => {
    const isValid = this._validate().total;
    const mid = this._getMid();
    if (isValid) {
      this.db.review.create(mid, {
        author_id: this.props.auth.uid,
        message: this.state.message,
        rate: this.state.rate
      })
      .then((success) => {
        this._clearForm();
        this.props.navigation && this.props.navigation.goBack();
      });
    }
  }

  _clearForm = () => {
    this.setState({
      message: '',
      rate: 0
    });
  }

  _validate = () => {
    const { message } = this.state;
    const messageValid = validateReviewMessage(message);
    return {
      total: messageValid,
      message: messageValid
    };
  }

  _getMid = () => {
    const { navigation: nav } = this.props;
    if ((nav) && (nav.state) && (nav.state.params)) {
      return nav.state.params.mid || null;
    }
  }

  _goBack = () => {
    this.props.navigation && this.props.navigation.goBack();
  }

  render() {
    const film = this.props.movies.getList.filter(item => item.id === this._getMid())[0];
    return (
      <View style={styles.container}>
        <FilmBackground
          activeFilm={film.id}
          fixed
          src={film.src ? {uri: film.src} : null}
        />
        <LinearGradient
          colors={landingColors[this.props.loader.lastColors].opacity}
          style={styles.gradient}
        >
          <Header
            showBack
            onPress={() => {
              this.props.navigation && this.props.navigation.goBack();
            }}
            title={`NEW REVIEW FOR:`}
          />
          <FilmTitle title={film.name} />

          <ReviewForm
            value={this.state.message}
            onChangeText={this._messageChanged}
            rate={this.state.rate}
            onChangeRate={this._changeRate}
            clearForm={this._clearForm}
            btnTitle={'Send'}
            onBtnPress={this._submit}
          />
        </LinearGradient>
      </View>
    );
  }
}
