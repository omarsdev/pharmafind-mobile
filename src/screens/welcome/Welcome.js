import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
} from 'react-native';

import Pill from '../../assets/image/pill.jpg';

export const Welcome = ({navigation}) => {
  const navigationHandler = () => {
    navigation.push('SubmitUser');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <Image source={Pill} style={styles.imageStyle} />
        <Text>Welcome</Text>
        <Text>
          Pharmafind is an app that gives you an easy and fast way to connect
          with available pharmacies close to you. The application allows you to
          communicate with the pharmacy and inquire about any drug or medical
          product via text messages or by sending a picture of the prescription
          issued by the doctor with the ability to reserve the drug for a
          specified period of time by the pharmacist.
        </Text>
      </View>
      <Pressable style={styles.clickContinue} onPress={navigationHandler}>
        <Text>Click Here to continue </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#56B1D3',
    flex: 1,
  },
  view: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 20,
  },
  imageStyle: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  clickContinue: {
    marginBottom: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
