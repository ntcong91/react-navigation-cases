import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {IScreen} from '../type';

function NotificationDetail({}: IScreen<'NOTIFICATION_DETAIL'>) {
  return <View style={styles.container} />;
}

export default NotificationDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginVertical: 8,
  },
});
