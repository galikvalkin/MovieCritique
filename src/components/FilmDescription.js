// @flow

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';
import Colors from '../assets/styles/colors';
import Rate from './Rate';
import PencilIcon from './PencilIcon';
import ViewReviewsIcon from './ViewReviewsIcon';

export default class FilmDescription extends Component {

  _getStr = (arr) => {
    let str = '';

    if (arr) {
      arr.map((item, index) => {
        str = `${str} ${item}${(index === (arr.length - 1)) ? '' : ','}`;
      });
    }

    return str;
  }

  render() {
    const film = this.props.film || {};
    const { rate, redirect, reviewsNum, onViewAllPress, showPencil } = this.props;
    return (
      <ScrollView
        style={styles.scrollView}
      >
        <View style={styles.textBlock}>
          <Text style={styles.title}>
            {film.name}
          </Text>
        </View>

        <View style={[styles.textBlock, styles.rateBlock]}>
          <Rate
            disabled
            containerStyle={styles.stars}
            number={5}
            iconSize={25}
            rate={rate}
          />
          {showPencil && <PencilIcon onPress={redirect}/>}
        </View>

        <View style={[styles.textBlock, styles.rateBlock]}>
          <Text style={styles.reviewsNum}>
            Reviews: {reviewsNum}
          </Text>

          <ViewReviewsIcon
            onPress={() => {
              onViewAllPress && onViewAllPress();
            }}
          />
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.description}>
            {film.description}
          </Text>
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.description}>
            Director: {film.director}
          </Text>
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.description}>
            Writer: {this._getStr(film.writers)}
          </Text>
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.description}>
            Stars: {this._getStr(film.stars)}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    paddingLeft: 10,
  },
  textBlock: {
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  reviewsNum: {
    flex: 1,
    fontSize: 20,
    color: Colors.white,
    fontWeight: '700'
  },
  rateBlock: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  title: {
    fontSize: 28,
    color: Colors.white
  },
  description: {
    color: Colors.white,
    marginTop: 10,
    fontSize: 20
  },
  viewAllButton: {
    width: 0,
    minWidth: 100,
  }
});
