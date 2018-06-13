/*
* @Author: valentinegalkin
* @Date:   2018-01-10 00:36:13
* @Last Modified by:   Valentin
* @Last Modified time: 2018-06-13 22:08:58
* @flow
*/

'use strict';

import * as firebase from 'firebase';

export default class Auth {
  constructor() {}

  /**
   * @param  {email: string, password: string} data
   * @return {Promise}
   */
  signup(data) {
    const { email, password } = data;
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((res) => {
        resolve(res);
      })
      .catch(reject);
    });
  }

  /**
   * @param  {email: string, password: string} data
   * @return {Promise}
   */
  signin(data) {
    const { email, password } = data;
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((res) => {
        resolve(res);
      })
      .catch(reject);
    });
  }

  /**
   * @return {Promise}
   */
  signout() {
    return firebase.auth().signOut();
  }

  /**
   * @return {Object | null}
   */
  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  /**
   * @param  {Object} data
   * @return {Promise}
   */
  changeEmail(data) {
    return new Promise((resolve, reject) => {
      if (data && data.oldEmail && data.newEmail && data.password) {
        this.reauthenticate(data)
        .then(() => {
          let user = this.getCurrentUser();
          user.updateEmail(data.newEmail)
          .then(() => {
            user.sendEmailVerification();
            resolve({code: 'auth/update-email-success'});
          })
          .catch(reject);
        })
        .catch(reject);
      } else {
        reject({code: 'auth/update-email-field-missing'});
      }
    });
  }

  /**
   * @param  {string} oldPassword
   * @param  {string} newPassword - new password
   * @return {Promise}
   */
  changePassword(oldPassword: string, newPassword: string) {
    return new Promise((resolve, reject) => {
      const email = this.getCurrentUser().email;
      this.reauthenticate({oldEmail: email, password: oldPassword})
      .then(() => {
        let user = this.getCurrentUser();
        user.updatePassword(newPassword)
        .then(() => {
          resolve({code: 'auth/update-password-success'});
        })
        .catch(reject);
      })
      .catch(reject);
    });
  }

  /**
   * before reseting email or password we need to reauthenticated user (Firebase requirements)
   * @param  {Object} data
   * @return {Promise}
   */
  reauthenticate(data) {
    let credential = null,
        user = this.getCurrentUser();

    if (data.oldEmail) {
      credential = firebase.auth.EmailAuthProvider.credential(
        data.oldEmail,
        data.password
      );
    }

    return user.reauthenticateWithCredential(credential);
  }
}
