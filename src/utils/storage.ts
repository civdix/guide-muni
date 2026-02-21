import { APP_CONSTANTS } from '@/constants/appConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = APP_CONSTANTS.storage.historyKey;

export const saveObject = async <T>(key: string, value: T): Promise<void> => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const loadObject = async <T>(key: string): Promise<T | null> => {
  const value = await AsyncStorage.getItem(key);
  return value ? (JSON.parse(value) as T) : null;
};

export { HISTORY_KEY };
