import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../../screens/Profile';
import ScreenNames from '../ScreenNames';
import ProfileDetail from '../../screens/Profile/ProfileDetail';

const StackNavigator = createStackNavigator();

function ProfileTab() {
  return (
    <StackNavigator.Navigator initialRouteName={ScreenNames.PROFILE_TAB}>
      <StackNavigator.Screen name={ScreenNames.PROFILE} component={Profile} />
      <StackNavigator.Screen
        name={ScreenNames.PROFILE_DETAIL}
        component={ProfileDetail}
      />
    </StackNavigator.Navigator>
  );
}

export default ProfileTab;
