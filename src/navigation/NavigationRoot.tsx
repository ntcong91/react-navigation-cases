import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AppDrawer from './AppDrawer';
import ScreenNames from './ScreenNames';
import RootModal from '../screens/RootModal';

const RootStack = createStackNavigator();

const NavigationRoot = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ScreenNames.MAIN}>
      <RootStack.Group>
        <RootStack.Screen name={ScreenNames.MAIN} component={AppDrawer} />
      </RootStack.Group>
      <RootStack.Group
        screenOptions={{
          presentation: 'modal',
        }}>
        <RootStack.Screen name={ScreenNames.ROOT_MODAL} component={RootModal} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default NavigationRoot;
