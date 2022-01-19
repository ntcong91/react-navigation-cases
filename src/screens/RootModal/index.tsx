import * as React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {pop} from '../../navigation/NavigationHelpers';
import {Colors} from '../../themes';
import {IScreen} from '../type';

function RootModal({}: IScreen<'ROOT_MODAL'>) {
  const renderTitle = () => {
    return <Text style={styles.lblTitle}>Login Modal</Text>;
  };

  const renderButtonClose = () => {
    const handlePressClose = () => {
      pop();
    };
    return (
      <TouchableOpacity
        style={styles.btnClose}
        hitSlop={{
          left: 4,
          top: 4,
          right: 4,
          bottom: 4,
        }}
        onPress={handlePressClose}>
        <Icon name="close" size={28} color={Colors.red400} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        {renderTitle()}
        {renderButtonClose()}
      </View>
      <View style={styles.body}>{}</View>
    </View>
  );
}

export default RootModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  title: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
  lblTitle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
  },
  body: {
    flex: 1,
  },
  btnClose: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
});
