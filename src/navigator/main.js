/*
* @Author: valentinegalkin
* @Date:   2018-01-10 00:40:55
* @Last Modified by:   valentinegalkin
* @Last Modified time: 2018-01-29 00:25:25
* @flow
*/

'use strict';
import { DrawerNavigator } from 'react-navigation';

import Profile from '../containers/Profile';
import Main from '../containers/Main';
import MyReviews from '../containers/MyReviews';
import Settings from '../containers/Settings';
import SideMenu from '../containers/SideMenu';
import Statistics from '../containers/Statistics';

const routes = {
  Profile: {
    screen: Profile,
  },
  Dashboard: {
    screen: Main,
  },
  MyReviews: {
    screen: MyReviews,
  },
  Settings: {
    screen: Settings
  },
  Statistics: {
    screen: Statistics
  }
};

export default DrawerNavigator(routes, {
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  initialRouteName: 'Dashboard',
  contentComponent: SideMenu,
  drawerWidth: 300
});
