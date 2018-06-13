/*
* @Author: Valentine Galkin
* @Date:   2017-11-20 22:44:53
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-23 00:21:23
* @flow
*/

'use strict';

import { observable, action, computed } from 'mobx';

class UsersStore {
  @observable users = new Map();

  @action addUserData(uid: string, user: Object) {
    this.users.set(uid, user);
  }

  getUser(uid) {
    return computed(() => {
      return this.users.get(uid);
    }).get();
  }

}

const usersStore = new UsersStore();

export default usersStore;
