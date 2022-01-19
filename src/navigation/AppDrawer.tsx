import React from 'react';
import {
  createDrawerNavigator,
  DrawerToggleButton,
} from '@react-navigation/drawer';
import ScreenNames from './ScreenNames';
import About from '../screens/About';
import BottomTabs from './BottomTabs';
import DrawerContent from './DrawerContent';
import History from '../screens/History';
import Profile from '../screens/Profile';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DrawerActions, useNavigation} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function AppDrawer() {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      initialRouteName={ScreenNames.BOTTOM_TABS}
      screenOptions={{
        gestureEnabled: true,
        drawerActiveTintColor: '#336699',
        drawerIcon: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer());
            }}
            style={styles.icDrawer}>
            <Icon name="reorder-horizontal" size={24} />
          </TouchableOpacity>
        ),
      }}
      drawerContent={DrawerContent}>
      <Drawer.Screen
        name={ScreenNames.BOTTOM_TABS}
        component={BottomTabs}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen name={ScreenNames.ABOUT} component={About} />
      <Drawer.Screen name={ScreenNames.HISTORY} component={History} />
      <Drawer.Screen name={ScreenNames.PROFILE} component={Profile} />
    </Drawer.Navigator>
  );
}

export default AppDrawer;

const styles = StyleSheet.create({
  icDrawer: {
    marginLeft: 16,
  },
});
