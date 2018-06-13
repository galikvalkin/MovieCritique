/*
* @Author: valentinegalkin
* @Date:   2018-01-10 00:31:40
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-12 01:49:55
* @flow
*/

import React, { Component } from 'react';
import { Provider } from 'mobx-react/native';
import App from './app';
import stores from './stores';
import firebaseConfig from './config/firebase.config';
import DB from './db';

class Root extends Component {
  constructor(props) {
    super(props);
    this.db = new DB(firebaseConfig);
  }

  render() {
    return (
      <Provider
        {...stores}
      >
        <App
          db={this.db}
        />
      </Provider>
    );
  }
}

export default Root;
