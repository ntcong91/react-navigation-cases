import * as React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import ScreenNames from '../../navigation/ScreenNames';
import {IScreen} from '../type';

function Profile({navigation}: IScreen<'PROFILE'>) {
  return (
    <View style={styles.container}>
      <Button
        title="Profile Detail"
        onPress={() => {
          navigation.push(ScreenNames.PROFILE_DETAIL, {});
        }}
      />
      <Button title="Test navigation" onPress={() => {}} />
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  button: {
    marginVertical: 8,
  },
});
