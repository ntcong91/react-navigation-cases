import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NavigationRoot from './src/navigation/NavigationRoot';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  navigationRef,
  notificationRef,
} from './src/navigation/NavigationHelpers';
import InAppNotification from './src/navigation/InAppNotification';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <NavigationRoot />
      </NavigationContainer>
      <InAppNotification ref={notificationRef} />
    </SafeAreaProvider>
  );
};

export default App;
