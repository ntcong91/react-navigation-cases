import {useDrawerStatus} from '@react-navigation/drawer';
import * as React from 'react';
import {View, Button, StyleSheet, InteractionManager} from 'react-native';
import ScreenNames from '../../navigation/ScreenNames';
import {IScreen} from '../type';

function History({navigation}: IScreen<'HISTORY'>) {
  const drawerStatus = useDrawerStatus();
  console.log('drawerStatus', drawerStatus);

  return (
    <View style={styles.container}>
      <Button
        title="Push in other tab"
        onPress={() => {
          navigation.navigate(ScreenNames.HOME_TAB);
          InteractionManager.runAfterInteractions(() => {
            navigation.navigate(ScreenNames.HOME_DETAIL, {});
            // await navigation.push(ScreenNames.HOME_DETAIL, {});
          });
        }}
      />
      <Button title="Test navigation" onPress={() => {}} />
    </View>
  );
}

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  button: {
    marginVertical: 8,
  },
});
