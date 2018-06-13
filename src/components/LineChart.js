/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:09:54
* @Last Modified by:   Valentin
* @Last Modified time: 2018-04-03 18:58:33
* @flow
*/

import React, { Component } from 'react';
import { ART, View, PanResponder } from 'react-native';
import AnimatedCircle from './AnimatedCircle';

const { Surface, Shape, Path } = ART;

const CORRECTION = 10;

const makeDataPoint = (x : number, y : number, id: string | null, data : any) => {
  return {
    x,
    y,
    radius: data.dataPointRadius,
    fill: data.dataPointFillColor,
    stroke: data.dataPointColor,
    dotLineWidth: data.dotLineWidth,
    id: id
  };
};

const evaluateHorizontalStep = (maxPoints: number, maxChartWidth: number) => {
  return maxChartWidth / (maxPoints + 1);
};

const evaluateMinMaxPercentage = (input: number, min: number, max: number) => {
  return (((input - min) * 100) / (max - min)) / 100;
};

export default class LineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeElement: this.props.activeId || null
    };

    this.dataPoints = [];

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (e) => {
        const closest = this._findClosestPoint(e.nativeEvent.locationX, e.nativeEvent.locationY);
        this.props.lockScroll && this.props.lockScroll();
        if ((closest) && this.state.activeElement !== closest.id) {
          this.setState({activeElement: closest.id});
          this.props.changeActive && this.props.changeActive(closest.id);
        }
      },
      onPanResponderMove: (e) => {
        const closest = this._findClosestPoint(e.nativeEvent.locationX, e.nativeEvent.locationY);

        if ((closest) && this.state.activeElement !== closest.id) {
          this.setState({activeElement: closest.id});
          this.props.changeActive && this.props.changeActive(closest.id);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        this.props.unlockScroll && this.props.unlockScroll();
      }
    });
  }

  _findClosestPoint = (x, y) => {
    let filtered = this.dataPoints.filter(item => {
      let minX = item.x - CORRECTION,
          maxX = item.x + CORRECTION,
          minY = item.y - CORRECTION,
          maxY = item.y + CORRECTION,
          xOk = minX <= x && x <= maxX,
          yOk = minY <= y && y <= maxY;

      if (xOk && yOk) {
        return item;
      }
    });

    return filtered[0];
  }

  _drawLine = () => {
    this.dataPoints = [];

    const {
      data,
      width,
      height,
      lineWidth,
      lineColor,
      maxX,
      maxY,
      minY,
      paddingLeft,
      paddingRight,
      dotLineWidth,
      dataPointFillColor,
      activeDotRadius,
      activeDotFillColor,
      activeDotColor,
      activeDotLineWidth
    } = this.props;

    let chosenItem = null;

    const path = new Path();

    const step = evaluateHorizontalStep(maxX, width - paddingLeft - paddingRight);

    data.map((item, index) => {
      const { value } = item;
      const percents = evaluateMinMaxPercentage(value, minY, maxY);

      let pX = step * (index + 1),
          pY = height - (height * percents);

      pY = pY >= height ? (height - (activeDotLineWidth || dotLineWidth || lineWidth)) : pY;

      pY = pY <= 0 ? 5 : pY;

      let point = makeDataPoint(pX, pY, item.id, this.props);

      this.dataPoints.push(point);

      index === 0 ? path.moveTo(pX, pY) : path.lineTo(pX, pY);
    });

    if (this.state.activeElement) {
      chosenItem = this.dataPoints.filter(item => {
        return item.id === this.state.activeElement;
      })[0];
    }

    let points = this.dataPoints.map((d, i) => {
      return (
        <AnimatedCircle key={i} {...d} />
      );
    });

    if (path.path.some(isNaN) || path.penY === Infinity || path.penDownY === Infinity) { return null; }

    if (data) {
      return (
        <View
          {...this._panResponder.panHandlers}
        >
          <Surface
            width={width} height={height}>
              <Shape
                d={path}
                stroke={lineColor}
                strokeWidth={lineWidth} />
              { points }

              {(chosenItem && chosenItem.id) &&
                <AnimatedCircle
                  animated
                  key={'activeCircle'}
                  startColor={dataPointFillColor}
                  {...chosenItem}
                  radius={activeDotRadius}
                  fill={activeDotFillColor}
                  stroke={activeDotColor}
                  lineWidth={activeDotLineWidth}
                />
              }
          </Surface>
        </View>
      );
    }
    else {
      return <View />;
    }
  };

  render() {
    const { data, height, width, borderStyle } = this.props;

    return (
      <View>
        <View style={[{ height, width }, borderStyle]}>
          {data.length > 0 && this._drawLine()}
        </View>
      </View>
    );
  }
}
