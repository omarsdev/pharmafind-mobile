import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import {UserDataContext} from '../../context';
import {AxiosInstance} from '../../api/axios-instance';
import {removeAllLocalStorage} from '../../utils';

import PharmacyCreateStack from './createPharmacy/index';
import PharmacyHomeStack from './homePharmacy/index';

const PharmacistStack = createStackNavigator();

export const PharmacistRoot = ({navigation}) => {
  const {pharmacistDataProviderValue} = useContext(UserDataContext);
  const {pharmacistData, setPharmacistData} = pharmacistDataProviderValue;
  const [pageLoadFirst, setPageLoadFirst] = useState(null);

  const getMePharmacist = async () => {
    await AxiosInstance.get('/pharmacist/me')
      .then(res => {
        setPharmacistData(res.data.data);
        if (!res.data.data.Pharmacy) {
          setPageLoadFirst('PharmacyCreateStack');
        } else {
          setPageLoadFirst('PharmacyHomeStack');
        }
      })
      .catch(err => {
        console.log(err.response.data);
        removeAllLocalStorage();
        navigation.reset({
          index: 0,
          routes: [{name: 'Welcome'}],
        });
      });
  };

  useEffect(() => {
    getMePharmacist();
  }, []);

  return pharmacistData && pageLoadFirst ? (
    <PharmacistStack.Navigator
      initialRouteName={pageLoadFirst}
      screenOptions={{
        headerShown: false,
      }}>
      <PharmacistStack.Screen
        name="PharmacyCreateStack"
        component={PharmacyCreateStack}
      />
      <PharmacistStack.Screen
        name="PharmacyHomeStack"
        component={PharmacyHomeStack}
      />
    </PharmacistStack.Navigator>
  ) : (
    <View style={styles.containerSpinner}>
      <ActivityIndicator color="#1a1a1a" />
    </View>
  );
};

const styles = StyleSheet.create({
  containerSpinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
