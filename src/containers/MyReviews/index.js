/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-29 01:31:08
* @flow
*/

'use strict';

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { observer, inject } from 'mobx-react/native';
import { landingColors } from '../../assets/styles/colors';
import Header from '../../components/Header';
import MyReviewItem from '../../components/MyReviewItem';
import EmptyReviewList from '../../components/EmptyReviewList';
import { parseDate, getTimestamp } from '../../utils/date';
import { sort } from '../../utils/sort';
import styles from './styles';

@inject((allStores) => ({
  auth: allStores.auth,
  loader: allStores.loader,
  movies: allStores.movies,
  users: allStores.users,
  reviews: allStores.reviews
}))
@observer
export default class MyReviews extends Component {
  _getList = () => {
    const reviews = this.props.reviews.getUserReviews(this.props.auth.uid);

    let parsed = reviews.map(review => {
      const movie = this.props.movies.getMovie(review.mid);
      const user = this.props.users.getUser(review.author_id);
      const name = ((user) && user.name) ?  user.name : 'Anonymous';
      const image = ((user) && user.image) ?  { uri: user.image } : null;
      return {
        ...review,
        time: parseDate(review.created_at),
        timestamp: getTimestamp(review.created_at),
        authorName: name,
        authorImage: image,
        id: review.reviewId,
        movieName: movie ? movie.name : '',
        movieImage: ((movie) && movie.src) ? {uri: movie.src} : null
      };
    });

    return sort(parsed, 'timestamp');
  }

  _keyExtractor = (item, index) => item.id;

  _openMenu = () => {
    this.props.navigation && this.props.navigation.navigate('DrawerOpen');
  }

  _onReviewPress = (mid, id) => {
    this.props.navigation && this.props.navigation.navigate('EditReview', {
      mid, id
    });
  }

  render() {
    const list = this._getList();

    return (
      <View style={styles.container}>
        <LinearGradient
          colors={landingColors[this.props.loader.lastColors].opacity}
          style={styles.gradient}
        >
          <Header
            onPress={this._openMenu}
            title={'MY REVIEWS'}
          />

          {list.length !== 0 && <FlatList
            keyExtractor={this._keyExtractor}
            data={list}
            renderItem={({item}) => {
              return (
                <MyReviewItem
                  {...item}
                  onPress={() => {
                    this._onReviewPress(item.mid, item.id);
                  }}
                />
              );
            }}
          />}
          {list.length === 0 && <EmptyReviewList
            firstLine={'You have not created any review'}
            secondLine={'Please, return after reviewing any movie'}
          />}
        </LinearGradient>
      </View>
    );
  }
}
