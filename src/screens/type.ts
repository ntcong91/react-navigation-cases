import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/type';

export type IScreen<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
