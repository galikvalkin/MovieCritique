/**
 * @flow
 */
'use strict';

import config from './config';

const { ENDPOINTS } = config;

export default class Movie {
  constructor(connection, storage) {
    this.list = connection.ref(ENDPOINTS.movies);
    this.connection = connection;
    this.storage = storage;
  }

  /**
   * returns list of movies
   * TODO: redo with pagination support!
   * @param  {Function} callback
   * @return {void}
   */
  getList(callback) {
    this.list.on('value', (snap) => {
      let films = {};
      snap.forEach((child) => {
        films[child.key] = child.val();
        films[child.key].id = child.key;
      });

      callback(films);
    });
  }
}
