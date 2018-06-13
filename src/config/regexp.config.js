/*
* @Author: valentinegalkin
* @Date:   2018-01-19 00:21:14
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-19 00:21:32
* @flow
*/

'use strict';

const regulars = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
};

export default regulars;
