import * as React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {IScreen} from '../type';

function HomeDetail({navigation}: IScreen<'HOME'>) {
  return (
    <View style={styles.container}>
      <Button
        title="Pop to top"
        onPress={() => {
          navigation.popToTop();
        }}
      />
    </View>
  );
}

export default HomeDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  button: {
    marginVertical: 8,
  },
});
