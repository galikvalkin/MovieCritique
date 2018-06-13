/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-29 01:56:06
* @flow
*/

'use strict';

import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { observer, inject } from 'mobx-react/native';
import Colors, { landingColors } from '../../assets/styles/colors';
import Header from '../../components/Header';
import LineChart from '../../components/LineChart';
import AnimatedFilmBlock from '../../components/AnimatedFilmBlock';
import EmptyReviewList from '../../components/EmptyReviewList';
import { parseDate, getTimestamp } from '../../utils/date';
import { sort } from '../../utils/sort';
import styles from './styles';

const { width, height } = Dimensions.get('window');

@inject((allStores) => ({
  loader: allStores.loader,
  auth: allStores.auth,
  reviews: allStores.reviews,
  movies: allStores.movies
}))
@observer
export default class Statistics extends Component {
  constructor(props) {
    super(props);

    const data = this._getChartData();
    this.state = {
      disableScroll: false,
      activeId: data[0] ? data[0].id : null,
      data,
      filmBlockHeight: 0
    };
  }

  _getChartData = () => {
    const reviews = this.props.reviews.getUserReviews(this.props.auth.uid);
    const arr = reviews.map(item => {
      const movie = this.props.movies.getMovie(item.mid);
      return {
        ...item,
        value: item.rate,
        time: parseDate(item.created_at),
        timestamp: getTimestamp(item.created_at),
        title: movie ? movie.name : null,
        id: item.reviewId
      };
    });

    return sort(arr, 'timestamp');
  }

  _switchScroll = (value) => {
    this.setState({disableScroll: value});
  }

  _changeActive = (id) => {
    this.setState({activeId: id});
  }

  render() {
    const { data, activeId } = this.state;

    const activeItem = data.filter(item => {
      return item.id === activeId;
    })[0];

    const activeMovie = activeItem ? this.props.movies.getMovie(activeItem.mid) : null;
    const item = (activeItem && activeMovie) ? {
      name: activeMovie.name,
      src: activeMovie.src,
      rate: activeItem.rate,
      id: activeItem.id
    } : null;
    const wrapHeight = (height - 80 - this.state.filmBlockHeight);
    const chartHeight = wrapHeight - 100;
    return (
      <LinearGradient
        colors={landingColors[this.props.loader.lastColors].normal}
        style={styles.gradient}
      >
        <Header
          onPress={() => {
            this.props.navigation && this.props.navigation.navigate('DrawerOpen');
          }}
          title={'STATISTICS'}
        />
          {data.length !== 0 && <AnimatedFilmBlock
            onLayout={(layout) => {
              this.setState({filmBlockHeight: layout.height});
            }}
            item={item}
          />}
          {data.length !== 0 && <View style={[styles.lineChartWrap]}>
            <LineChart
              activeId={activeId}
              lockScroll={() => {this._switchScroll(true);}}
              unlockScroll={() => {this._switchScroll(false);}}
              changeActive={this._changeActive}
              paddingLeft={10}
              paddingRight={10}
              data={data}
              height={chartHeight}
              width={width - 40}
              lineWidth={3}
              lineColor={Colors.white}
              maxX={data.length}
              maxY={6}
              minY={0}
              maxAxisValue={data.length}
              minAxisValue={0}
              dataPointRadius={4}
              dataPointFillColor={Colors.white}
              dataPointColor={Colors.white}
              dotLineWidth={5}
              activeDotRadius={8}
              activeDotFillColor={Colors.white}
              activeDotColor={Colors.white}
              activeDotLineWidth={10}
            />
          </View>}
          {data.length === 0 && <EmptyReviewList
            firstLine={'You have not created any review'}
            secondLine={'Please, return after reviewing any movie'}
          />}
      </LinearGradient>
    );
  }
}
