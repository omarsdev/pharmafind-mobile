import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import CreatePharmacy from './CreatePharmacy';
import PharmacyLocation from './PharmacyLocation';

const CreatePharmacyStack = createStackNavigator();

const PharmacyCreateStack = () => {
  return (
    <CreatePharmacyStack.Navigator
      initialRouteName="CreatePharmacy"
      screenOptions={{
        headerShown: false,
      }}>
      <CreatePharmacyStack.Screen
        name="CreatePharmacy"
        component={CreatePharmacy}
      />
      <CreatePharmacyStack.Screen
        name="PharmacyLocation"
        component={PharmacyLocation}
      />
    </CreatePharmacyStack.Navigator>
  );
};

export default PharmacyCreateStack;
