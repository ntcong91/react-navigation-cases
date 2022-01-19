import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ScreenNames from '../ScreenNames';
import HomeTab from './HomeTab';
import HistoryTab from './HistoryTab';
import ProfileTab from './ProfileTab';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {Animated, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {isEmpty} from 'lodash';
import NotificationTab from './NotificationTab';

const TAB_BAR_VISIBLE_ALLOWED_LIST: string[] = [ScreenNames.PROFILE_DETAIL];

const getTabBarVisible = (
  route: any,
): Animated.WithAnimatedValue<StyleProp<ViewStyle>> => {
  const routeName: string = getFocusedRouteNameFromRoute(route) ?? '';

  if (!isEmpty(routeName) && TAB_BAR_VISIBLE_ALLOWED_LIST.includes(routeName)) {
    return {
      display: 'none',
    };
  }

  return {};
};

const BottomTabNavigation = createBottomTabNavigator();

function BottomTabs() {
  return (
    <BottomTabNavigation.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <BottomTabNavigation.Screen
        name={ScreenNames.HOME_TAB}
        component={HomeTab}
        options={({route}) => ({
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
          tabBarStyle: StyleSheet.flatten(getTabBarVisible(route)),
        })}
      />
      <BottomTabNavigation.Screen
        name={ScreenNames.HISTORY_TAB}
        component={HistoryTab}
        options={({route}) => ({
          tabBarIcon: ({color, size}) => (
            <Icon name="history" color={color} size={size} />
          ),
          tabBarStyle: StyleSheet.flatten(getTabBarVisible(route)),
        })}
      />
      <BottomTabNavigation.Screen
        name={ScreenNames.NOTIFICATION_TAB}
        component={NotificationTab}
        options={({route}) => ({
          tabBarIcon: ({color, size}) => (
            <Icon name="alert" color={color} size={size} />
          ),
          tabBarStyle: StyleSheet.flatten(getTabBarVisible(route)),
        })}
      />
      <BottomTabNavigation.Screen
        name={ScreenNames.PROFILE_TAB}
        component={ProfileTab}
        options={({route}) => ({
          tabBarIcon: ({color, size}) => (
            <Icon name="account" color={color} size={size} />
          ),
          tabBarStyle: StyleSheet.flatten(getTabBarVisible(route)),
        })}
      />
    </BottomTabNavigation.Navigator>
  );
}

export default BottomTabs;
