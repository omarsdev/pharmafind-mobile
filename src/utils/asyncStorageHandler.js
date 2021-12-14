import AsyncStorage from '@react-native-async-storage/async-storage';

export const removeAllLocalStorage = async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('isUser');
};

export const setTokenStorage = async token => {
  await AsyncStorage.setItem('token', token);
};

export const setIsUserStorage = async isUser => {
  await AsyncStorage.setItem('isUser', isUser);
};
