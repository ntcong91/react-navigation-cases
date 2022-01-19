import * as React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import ScreenNames from '../../navigation/ScreenNames';
import {IScreen} from '../type';

function Home({navigation}: IScreen<'HOME'>) {
  return (
    <View style={styles.container}>
      <Button
        title="History Tab"
        onPress={() => {
          navigation.navigate(ScreenNames.HISTORY_TAB);
        }}
      />
      <Button
        title="Navigate same tab"
        onPress={() => {
          navigation.navigate(ScreenNames.HOME_DETAIL);
        }}
      />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  button: {
    marginVertical: 8,
  },
});
