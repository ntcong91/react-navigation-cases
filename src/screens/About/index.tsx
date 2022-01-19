import * as React from 'react';
import {View, Button, StyleSheet, InteractionManager} from 'react-native';
import {showInAppNotification} from '../../navigation/NavigationHelpers';
import ScreenNames from '../../navigation/ScreenNames';
import {IScreen} from '../type';

function About({navigation}: IScreen<'ABOUT'>) {
  const handlePressCase = () => {
    showInAppNotification({
      title: 'New Notification',
      message: 'Press here to navigate',
      onPress: () => {
        InteractionManager.runAfterInteractions(() => {
          navigation.navigate(ScreenNames.NOTIFICATION_TAB);
        }).then(() => {
          navigation.navigate(ScreenNames.NOTIFICATION_DETAIL);
        });
      },
    });
  };
  return (
    <View style={styles.container}>
      <Button
        title="Show Notification and Navigate to"
        onPress={handlePressCase}
      />
      <Button title="Test navigation" onPress={() => {}} />
    </View>
  );
}

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  button: {
    marginVertical: 8,
  },
});
