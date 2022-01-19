import * as React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {
  navigateGlobal,
  showInAppNotification,
} from '../../navigation/NavigationHelpers';
import ScreenNames from '../../navigation/ScreenNames';
import {IScreen} from '../type';

function ProfileDetail({}: IScreen<'PROFILE_DETAIL'>) {
  return (
    <View style={styles.container}>
      <Button
        title="Show Root Modal"
        onPress={() => {
          navigateGlobal(ScreenNames.ROOT_MODAL);
        }}
      />
      <Button
        title="Show Success Notification"
        onPress={() => {
          showInAppNotification({
            title: 'In App Title',
            message: 'In App Messaging',
          });
        }}
      />
      <Button
        title="Show Error Notification"
        onPress={() => {
          showInAppNotification({
            title: 'In App Title',
            message: 'In App Messaging',
            type: 'error',
          });
        }}
      />
    </View>
  );
}

export default ProfileDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  button: {
    marginVertical: 8,
  },
});
