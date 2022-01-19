import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ScreenNames from '../ScreenNames';
import Home from '../../screens/Home';
import {DrawerToggleButton} from '@react-navigation/drawer';
import HomeDetail from '../../screens/Home/HomeDetail';

const StackNavigator = createStackNavigator();

function HomeTab({}) {
  return (
    <StackNavigator.Navigator initialRouteName={ScreenNames.HOME}>
      <StackNavigator.Screen
        name={ScreenNames.HOME}
        component={Home}
        options={{
          headerLeft: props => <DrawerToggleButton {...props} />,
        }}
      />
      <StackNavigator.Screen
        name={ScreenNames.HOME_DETAIL}
        component={HomeDetail}
      />
    </StackNavigator.Navigator>
  );
}

export default HomeTab;
