import React, {useState, useEffect, useContext} from 'react';

import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {UserDataContext, UserDataContextProvider} from './src/context';
import {
  Welcome,
  LoginPharmacist,
  LoginUser,
  SubmitPharmacist,
  SubmitUser,
  SMSCode,
  PharmacistRoot,
} from './src/screens';

import User from './src/screens/home/index';

import {AxiosInstance} from './src/api/axios-instance';

// import Geolocation from '@react-native-community/geolocation';

import Geolocation from 'react-native-geolocation-service';

import axios from 'axios';

import {Permission, PERMISSION_TYPE} from './src/AppPermission';

const Stack = createNativeStackNavigator();

const App = () => {
  const [pageLoadFirst, setPageLoadFirst] = useState(null);

  const getAxiosDataAndroid = async () => {
    try {
      const res = await AxiosInstance.get('/address/country');
    } catch (error) {
      console.log(error.error);
    }
  };

  useEffect(() => {
    const getStorageData = async () => {
      await Permission.checkPermission(PERMISSION_TYPE.location);
      await Permission.checkPermission(PERMISSION_TYPE.camera);

      const token = await AsyncStorage.getItem('token');
      const isUser = await AsyncStorage.getItem('isUser');

      if (isUser === 'true') {
        setPageLoadFirst('User');
      } else if (isUser === 'false') {
        setPageLoadFirst('PharmacistRoot');
      } else {
        setPageLoadFirst('Welcome');
      }
    };

    getAxiosDataAndroid();
    getStorageData();
    // getMovies();
  }, []);

  return pageLoadFirst ? (
    <UserDataContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={pageLoadFirst}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="LoginUser" component={LoginUser} />
          <Stack.Screen name="LoginPharmacist" component={LoginPharmacist} />
          <Stack.Screen name="SubmitPharmacist" component={SubmitPharmacist} />
          <Stack.Screen name="SubmitUser" component={SubmitUser} />
          <Stack.Screen name="SMSCode" component={SMSCode} />
          <Stack.Screen name="PharmacistRoot" component={PharmacistRoot} />
          <Stack.Screen name="User" component={User} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserDataContextProvider>
  ) : (
    <View style={styles.center}>
      <ActivityIndicator color="#1a1a1a" />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
