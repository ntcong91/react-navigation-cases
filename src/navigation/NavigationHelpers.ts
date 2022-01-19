import {createRef} from 'react';
import {
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {
  InAppNotificationOptions,
  InAppNotificationRef,
} from './InAppNotification';
import {
  StackCardInterpolationProps,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {RootStackParamList, RootStackKey, RootStackParam} from './type';
import {Colors} from '../themes';

export let navigationRef = createNavigationContainerRef<RootStackParamList>();
export let notificationRef = createRef<InAppNotificationRef>();

export let routeNameRef: any = createRef();

export function showInAppNotification(options: InAppNotificationOptions) {
  if (typeof notificationRef?.current?.show === 'function') {
    notificationRef?.current?.show(options);
  }
}

export function hideInAppNotification() {
  if (typeof notificationRef?.current?.hide === 'function') {
    notificationRef?.current?.hide();
  }
}

export function replace(name: string, params: RootStackParam = {}) {
  if (navigationRef.isReady()) {
    navigationRef?.dispatch(StackActions.replace(name, params));
  }
}

export function popToTop() {
  if (navigationRef.isReady()) {
    navigationRef.current?.dispatch(StackActions.popToTop());
  }
}

export function pop(number = 1) {
  if (navigationRef.isReady()) {
    navigationRef?.dispatch(StackActions.pop(number));
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

export function navigateGlobal(
  name: RootStackKey,
  params: RootStackParam = {},
) {
  if (navigationRef.isReady() && name) {
    navigationRef.navigate(name, params);
  }
}

export function getCurrentRouteName() {
  return routeNameRef?.current;
}

export const cardStyleInterpolatorFade = ({
  current,
}: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  },
});

export const DEFAULT_NAVIGATION_STYLE: StackNavigationOptions = {
  headerBackTitle: '',
  headerTruncatedBackTitle: '',
  headerBackTitleVisible: false,
  headerShown: true,
  headerStyle: {
    borderBottomWidth: 0,
    backgroundColor: Colors.lightBlue400,
    shadowColor: 'transparent',
  },
};

export const HOME_NAVIGATION_STYLE: StackNavigationOptions = {
  ...DEFAULT_NAVIGATION_STYLE,
};

export const ACTIVITY_NAVIGATION_STYLE: StackNavigationOptions = {
  ...DEFAULT_NAVIGATION_STYLE,
  headerStyle: {
    borderBottomWidth: 0,
    backgroundColor: Colors.white,
    shadowColor: 'transparent',
  },
};
