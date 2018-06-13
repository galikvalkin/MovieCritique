/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-29 00:46:18
* @flow
*/

'use strict';

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { observer, inject } from 'mobx-react/native';
import { landingColors } from '../../assets/styles/colors';
import Header from '../../components/Header';
import ReviewItem from '../../components/ReviewItem';
import FilmBackground from '../../components/FilmBackground';
import EmptyReviewList from '../../components/EmptyReviewList';
import { parseDate, getTimestamp } from '../../utils/date';
import { sort } from '../../utils/sort';
import { hasWrote } from '../../utils/validate';
import styles from './styles';

@inject((allStores) => ({
  auth: allStores.auth,
  loader: allStores.loader,
  movies: allStores.movies,
  users: allStores.users,
  reviews: allStores.reviews
}))
@observer
export default class ViewReviews extends Component {
  _getList = () => {
    const mid = this._getMid();
    const reviews = this.props.reviews.getMovieReviews(mid);

    let keys = Object.keys(reviews);
    let parsed = keys.map(key => {
      const user = this.props.users.getUser(reviews[key].author_id);
      const name = ((user) && user.name) ?  user.name : 'Anonymous';
      const image = ((user) && user.image) ?  { uri: user.image } : null;
      return {
        ...reviews[key],
        time: parseDate(reviews[key].created_at),
        timestamp: getTimestamp(reviews[key].created_at),
        authorName: name,
        authorImage: image,
        id: key
      };
    });

    return sort(parsed, 'timestamp');
  }

  _keyExtractor = (item, index) => item.id;

  _getMid = () => {
    const { navigation: nav } = this.props;
    if ((nav) && (nav.state) && (nav.state.params)) {
      return nav.state.params.mid || null;
    }
  }

  _goToCreateReview = () => {
    const mid = this._getMid();
    this.props.navigation && this.props.navigation.navigate('CreateReview', {mid: mid});
  }

  render() {
    const mid = this._getMid();
    const film = this.props.movies.getList.filter(item => item.id === mid)[0];
    const list = this._getList();
    const blockCreateReview = hasWrote(list, this.props.auth.uid);
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
            showAdd={list.length !== 0 && !blockCreateReview}
            showBack
            onPress={() => {
              this.props.navigation && this.props.navigation.goBack();
            }}
            onRightPress={this._goToCreateReview}
            title={film.name}
          />

          {list.length !== 0 && <FlatList
            keyExtractor={this._keyExtractor}
            data={list}
            renderItem={({item}) => <ReviewItem {...item} />}
          />}
          {list.length === 0 && <EmptyReviewList
            showBtn
            btnTitle={'Create review'}
            firstLine={'It looks like you got to this place first...'}
            secondLine={'Write your review while waiting for others!'}
            onPress={this._goToCreateReview}
          />}
        </LinearGradient>

      </View>
    );
  }
}
