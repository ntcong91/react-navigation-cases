import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ScreenNames from '../ScreenNames';
import History from '../../screens/History';

const StackNavigator = createStackNavigator();

function HistoryTab() {
  return (
    <StackNavigator.Navigator initialRouteName={ScreenNames.HISTORY_TAB}>
      <StackNavigator.Screen name={ScreenNames.HISTORY} component={History} />
    </StackNavigator.Navigator>
  );
}

export default HistoryTab;
