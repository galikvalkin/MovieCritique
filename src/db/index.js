/*
* @Author: valentinegalkin
* @Date:   2018-01-10 00:34:57
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-22 22:10:18
* @flow
*/

'use strict';

import * as firebase from 'firebase';

import Auth from './auth';
import User from './user';
import Movie from './movie';
import Review from './review';
import Storage from './storage';

export default class DB {
  constructor(config) {
    this.connection;
    try {
      this.connection = firebase.app().database();
    }
    catch(e) {
      this.connection = firebase.initializeApp(config).database();
    }

    this.storage = new Storage(firebase.storage());

    this.auth = new Auth();
    this.user = new User(this.connection, this.storage);
    this.movie = new Movie(this.connection, this.storage);
    this.review = new Review(this.connection, this.storage);
  }
}
