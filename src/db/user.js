/**
 * @flow
 */
/** @module User */
'use strict';

import config from './config';

import { prepareUpdateRoutes } from './parser';

const { ENDPOINTS, STORAGE } = config;

export default class User {
  constructor(connection, storage) {
    this.list = connection.ref(ENDPOINTS.users);
    this.connection = connection;
    this.storage = storage;
  }

  /**
   * create
   * @param  {object} data
   * @param  {string} id
   * @return {Promise}
   */
  create(data, id) {
    return new Promise((resolve, reject) => {
      if (id) {
        let updates = {
          [id]: data
        };

        this._parseAvatar(data.image, id)
        .then((url) => {
          updates[id].image = url;
          this.list
          .update(updates)
          .then(resolve)
          .catch(reject);
        });
      }
      else {
        reject({
          code: 'user/create-id-not-specified'
        });
      }
    });
  }

  /**
   * update
   * @param  {string} id: id of user to be updated
   * @param  {object} data
   * @return {Promise}
   */
  update(data, id) {
    return new Promise((resolve, reject) => {
      if (id) {
        const local = {...data};
        this._parseAvatar(local.image, id)
        .then((url) => {
          local.image = url;
          this.connection.ref(`${ENDPOINTS.users}${id}`)
          .update(prepareUpdateRoutes(local))
          .then(resolve)
          .catch(reject);
        });
      }
      else {
        reject({
          code: 'user/create-id-not-specified'
        });
      }
    });
  }

  /**
   *
   * @param  {string}   uid
   * @param  {boolean}   once
   * @param  {Function} callback
   * @return {void}
   */
  getUser(uid, once, callback) {
    const userConnection = this.connection.ref(`${ENDPOINTS.users}${uid}`);
    let method = once ? 'once' : 'on';
    return userConnection[method]('value', (snap) => {
      let user = {};
      snap.forEach((child) => {
        user[child.key] = child.val();
      });
      callback(user);
    });
  }


  /**
   * _parseAvatar
   * @param  {{path: string} | string | null} avatar - image can be null (image not taken),
   * can be object with path (taken from gallery/camera), can be string (Facebook, Google profile picture)
   * @param  {string} id - user id - for saving in storage (if image is from gallery/camera)
   * @return {Promise}
   */
  _parseAvatar(image, id) {
    return new Promise((resolve, reject) => {
      if (image) {
        const { mime, path, format } = image;
        if (mime && path && format) {
          let imgSource = {
            type: mime,
            path: path,
            fileName: `${id}.${format}`
          };
          this.postImage(imgSource).then((url) => {
            resolve(url);
          });
        }
        else {
          resolve(image);
        }
      }
      else {
        resolve(null);
      }
    });
  }

  /**
   * @param  {[type]} image: {type:       string, path: string, fileName: string} | null [description]
   * @return {[type]}        [description]
   */
  postImage(image) {
    if (image) {
      return this.storage.post(image, STORAGE.users);
    }
    return new Promise((resolve, reject) => {
      resolve(null);
    });
  }
}
