export type RootStackParamList = {
  MAIN: {};
  HOME_TAB: {};
  HISTORY_TAB: {};
  PROFILE_TAB: {};
  NOTIFICATION_TAB: {};
  HOME: {};
  HOME_DETAIL: {};
  HISTORY: {};
  PROFILE: {};
  PROFILE_DETAIL: {};
  ABOUT: {};
  NOTIFICATIONS: {};
  NOTIFICATION_DETAIL: {};
  ROOT_MODAL: {};
};

export type RootStackKey = keyof RootStackParamList;
export type RootStackParam = RootStackParamList[keyof RootStackParamList];
