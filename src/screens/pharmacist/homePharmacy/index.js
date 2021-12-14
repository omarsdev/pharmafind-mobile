import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PharmacistHome from './PharmacistHome';
import PharmacistChat from './PharmacistChat';
import Setting from './Setting';
import {PharmacyDataContextProvider} from '../../../context/PharmacyDataContext';

const CreateHomeStack = createStackNavigator();

const PharmacyHomeStack = () => {
  return (
    <PharmacyDataContextProvider>
      <CreateHomeStack.Navigator
        initialRouteName="PharmacistHome"
        screenOptions={{
          headerShown: false,
        }}>
        <CreateHomeStack.Screen
          name="PharmacistHome"
          component={PharmacistHome}
        />
        <CreateHomeStack.Screen
          name="PharmacistChat"
          component={PharmacistChat}
        />
        <CreateHomeStack.Screen name="Setting" component={Setting} />
      </CreateHomeStack.Navigator>
    </PharmacyDataContextProvider>
  );
};

export default PharmacyHomeStack;
