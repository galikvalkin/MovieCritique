/**
 * @flow
 */
/** @module User */
'use strict';

import moment from 'moment';
import config from './config';

import { prepareUpdateRoutes } from './parser';

const { ENDPOINTS } = config;

export default class Review {
  constructor(connection, storage) {
    this.list = connection.ref(ENDPOINTS.reviews);
    this.connection = connection;
    this.storage = storage;
  }

  /**
   * create
   * @param  {string} mid
   * @param  {object} data
   * @return {Promise}
   */
  create(mid, data) {
    return new Promise((resolve, reject) => {
      if (mid) {
        const rid = this.list.child(mid).push().key;
        const local = {
          [rid]: {...data}
        };

        local[rid].created_at = moment().utc().format();
        this.list
        .child(mid)
        .update(prepareUpdateRoutes(local))
        .then(resolve)
        .catch(reject);
      }
      else {
        reject({
          code: 'review/create-mid-not-specified'
        });
      }
    });
  }

  /**
   * update
   * @param  {object} data
   * @return {Promise}
   */
  update(data) {
    return new Promise((resolve, reject) => {
      if (data) {
        this.list
        .update(prepareUpdateRoutes(data))
        .then(resolve)
        .catch(reject);
      }
      else {
        reject({
          code: 'review/data-not-specified'
        });
      }
    });
  }


  /**
   * @param  {string} mid - movie id
   * @param  {string} rid - review id
   * @return {Promise}
   */
  delete(mid, rid) {
    return new Promise((resolve, reject) => {
      if (mid && rid) {
        this.list
        .child(mid)
        .child(rid)
        .remove()
        .then(resolve)
        .catch(reject);
      }
      else {
        reject({
          code: 'review/mid-rid-not-specified'
        });
      }
    });
  }

  /**
   *
   * @param  {string}   mid
   * @param  {Function} callback
   * @return {void}
   */
  getMovieReviews(mid, callback) {
    return this.list.child(mid)
    .on('value', (snap) => {
      let reviews = {};
      snap.forEach((child) => {
        reviews[child.key] = child.val();
      });
      callback(reviews);
    });
  }
}
