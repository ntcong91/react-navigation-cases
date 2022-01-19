import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  InteractionManager,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenNames from './ScreenNames';

function DrawerContent({navigation}: DrawerContentComponentProps) {
  const handleNavigate = (screenNames: string) => {
    navigation.navigate(screenNames);
  };

  const handlePressAvatar = () => {
    InteractionManager.runAfterInteractions(() => {
      navigation.navigate(ScreenNames.PROFILE_TAB);
    }).then(() => {
      navigation.navigate(ScreenNames.PROFILE_DETAIL);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.drawerContent}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.avatar} onPress={handlePressAvatar} />
          <Text style={styles.txtName}>Anonymous</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="home" color={color} size={size} />
            )}
            label="Home"
            onPress={() => handleNavigate(ScreenNames.HOME)}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="dots-horizontal" color={color} size={size} />
            )}
            label="About"
            onPress={() => handleNavigate(ScreenNames.ABOUT)}
          />
        </ScrollView>
      </View>
    </View>
  );
}

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContent: {
    flex: 1,
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#336699',
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    paddingVertical: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FAFAFA',
  },
  txtName: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 12,
    color: '#FFFFFF',
  },
});
