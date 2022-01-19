import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {IScreen} from '../type';

function Notifications({}: IScreen<'NOTIFICATIONS'>) {
  return <View style={styles.container} />;
}

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginVertical: 8,
  },
});
