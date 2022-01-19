import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ScreenNames from '../ScreenNames';
import Notifications from '../../screens/Notifications';
import NotificationDetail from '../../screens/Notifications/NotificationDetail';

const StackNavigator = createStackNavigator();

function NotificationTab() {
  return (
    <StackNavigator.Navigator initialRouteName={ScreenNames.NOTIFICATION_TAB}>
      <StackNavigator.Screen
        name={ScreenNames.NOTIFICATIONS}
        component={Notifications}
      />
      <StackNavigator.Screen
        name={ScreenNames.NOTIFICATION_DETAIL}
        component={NotificationDetail}
      />
    </StackNavigator.Navigator>
  );
}

export default NotificationTab;
