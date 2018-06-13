/*
* @Author: valentinegalkin
* @Date:   2018-01-10 01:22:33
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-25 00:11:54
* @flow
*/

'use strict';

const colors = {
  white: '#FFFFFF',
  black: '#000000',
  darkgray: '#424242',
  textColor: '#f4f8ff',
  white05: 'rgba(255,255,255,0.3)'
};

const landingColors = {
  neutral: ['#6b6968', '#565453', '#444241'],
  negative: ['#a53a23', '#a53623', '#a52323'],
  positive: ['#24a562', '#23a571', '#23a582'],

  camera: {
    normal: ['#ffc300', '#ffaa00', '#ff9400'],
    opacity: ['rgba(255, 195, 0, 0.9)', 'rgba(255, 170, 0, 0.9)', 'rgba(255, 148, 0, 0.9)'],
  },
  tape: {
    normal: ['#ff9400', '#ff8c00', '#ff7700'],
    opacity: ['rgba(255, 148, 0, 0.9)', 'rgba(255, 140, 0, 0.9)', 'rgba(255, 119, 0, 0.9)'],
  },
  check: {
    normal: ['#ff7700', '#ff6100', '#ff4800'],
    opacity: ['rgba(255, 119, 0, 0.9)', 'rgba(255, 97, 0, 0.9)', 'rgba(255, 72, 0, 0.9)'],
  },
};

export default colors;

export {
  landingColors
};
