import React, {useEffect, useContext, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {UserDataContext} from '../../context';
import {removeAllLocalStorage} from '../../utils';
import {AxiosInstance} from '../../api/axios-instance';

import ChatUserPharmacy from './ChatUserPharmacy';
import UserHome from './UserHome';
import PharmacyLocations from './PharmacyLocations';
import PharmacyProfile from './PharmacyProfile';
import Setting from './Setting';

import {UserHomeDataContextProvider} from '../../context/UserHomeDataContext';

const UserStack = createStackNavigator();

const User = ({navigation}) => {
  const {userDataProviderValue} = useContext(UserDataContext);
  const {userData, setUserData} = userDataProviderValue;
  const [loading, setLoading] = useState(true);

  const getMeUser = async () => {
    await AxiosInstance.get('/user/me')
      .then(res => {
        setUserData(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        removeAllLocalStorage();
        navigation.reset({
          index: 0,
          routes: [{name: 'Welcome'}],
        });
      });
  };

  useEffect(() => {
    getMeUser();
  }, []);

  return loading ? (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator color="#1a1a1a" />
    </View>
  ) : (
    <UserHomeDataContextProvider>
      <UserStack.Navigator
        initialRouteName="UserHome"
        screenOptions={{
          headerShown: false,
        }}>
        <UserStack.Screen name="UserHome" component={UserHome} />
        <UserStack.Screen
          name="ChatUserPharmacy"
          component={ChatUserPharmacy}
        />
        <UserStack.Screen
          name="PharmacyLocations"
          component={PharmacyLocations}
        />
        <UserStack.Screen name="PharmacyProfile" component={PharmacyProfile} />
        <UserStack.Screen name="Setting" component={Setting} />
      </UserStack.Navigator>
    </UserHomeDataContextProvider>
  );
};

export default User;

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
