/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-29 00:00:00
* @flow
*/

'use strict';

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react/native';
import { landingColors } from '../../assets/styles/colors';
import Header from '../../components/Header';
import ListItem from '../../components/ListItem';
import FilmBackground from '../../components/FilmBackground';
import FilmDetails from '../../components/FilmDetails';
import { evaluateRate } from '../../utils/math';
import { hasWrote } from '../../utils/validate';
import styles from './styles';

@inject((allStores) => ({
  loader: allStores.loader,
  auth: allStores.auth,
  movies: allStores.movies,
  reviews: allStores.reviews,
  users: allStores.users,
}))
@observer
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFilm: '',
      startX: null,
      startY: null,
      startW: null,
      startH: null
    };
    this.images = {};

    this.userListeners = {};
    this.reviewListeners = {};

    this.db = props.screenProps.db;
  }

  static childContextTypes = {
    onImageRef: PropTypes.func
  };

  getChildContext() {
    return { onImageRef: this._onImageRef };
  }

  componentDidMount() {
    this.db.movie.getList(res => {
      if (res) {
        this.props.movies.setMovies(res);
        this._initReviewsListener(res);
      }
    });
    this.db.user.getUser(this.props.auth.uid, null, user => {
      this.props.users.addUserData(this.props.auth.uid, user);
    });
  }

  _initReviewsListener = (movies) => {
    let keys = movies ? Object.keys(movies) : [];

    keys.map(mid => {
      if (!this.reviewListeners[mid]) {
        this.reviewListeners[mid] = this.db.review.getMovieReviews(mid, reviews => {
          this.props.reviews.setMovieReviews(mid, reviews);
          this._initUsersListener(reviews);
        });
      }
    });
  }

  _initUsersListener = (reviews) => {
    for (let i in reviews) {
      if (!this.userListeners[reviews[i].author_id]) {
        this.userListeners[reviews[i].author_id] = this.db.user.getUser(reviews[i].author_id, null, user => {
          this.props.users.addUserData(reviews[i].author_id, user);
        });
      }
    }
  }

  _onImageRef = (id, ref, photo) => {
    if (ref) {
      this.images[id] = {
        ref,
        photo
      };
    }
  };

  _onItemPress = (id) => {
    if (this.state.activeFilm !== id) {
      this.images[id]
      .ref
      .measure((sourceX, sourceY, startW, startH, startX, startY) => {
        this.setState({
          activeFilm: id,
          startX,
          startY,
          startW,
          startH
        });
      });
    } else {
      this.setState({
        activeFilm: null,
        startX: null,
        startY: null,
        startW: null,
        startH: null
      });
    }
  }

  _goToCreateReview = () => {
    this.props.navigation && this.props.navigation.navigate('CreateReview', {mid: this.state.activeFilm});
  }

  _goToViewReviews = () => {
    this.props.navigation && this.props.navigation.navigate('ViewReviews', {mid: this.state.activeFilm});
  }

  _openMenu = () => {
    this.props.navigation && this.props.navigation.navigate('DrawerOpen');
  }

  _getList = () => {
    return this.props.movies.getList.map(item => {
      const reviews = this.props.reviews.getMovieReviews(item.mid);
      return {
        ...item,
        rate: evaluateRate(reviews)
      };
    });
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    const film = this.props.movies.getList.filter(item => item.id === this.state.activeFilm)[0];
    const reviews = this.props.reviews.getMovieReviews(this.state.activeFilm);
    const blockCreateReview = hasWrote(reviews, this.props.auth.uid);
    const reviewsNum = Object.keys(reviews).length;
    const rate = evaluateRate(reviews);
    const list = this._getList();
    return (
      <LinearGradient
        colors={landingColors[this.props.loader.lastColors].normal}
        style={styles.gradient}
      >
        <Header
          onPress={this._openMenu}
          title={'LATEST'}
        />
        <FlatList
          keyExtractor={this._keyExtractor}
          data={list}
          renderItem={({item}) => {
            return (
              <ListItem
                isActive={this.state.activeFilm}
                onPress={() => this._onItemPress(item.id)}
                {...item}
              />
            );
          }}
        />
        <FilmBackground
          {...this.state}
          src={(this.state.activeFilm && this.images[this.state.activeFilm]) ? this.images[this.state.activeFilm].photo : null}
        />
        <FilmDetails
          {...this.state}
          film={film}
          rate={rate}
          reviewsNum={reviewsNum}
          redirect={this._goToCreateReview}
          showPencil={!blockCreateReview}
          onPress={() => {
            this._onItemPress(this.state.activeFilm);
          }}
          onViewAllPress={() => {
            this._goToViewReviews();
          }}
        />
      </LinearGradient>
    );
  }
}
