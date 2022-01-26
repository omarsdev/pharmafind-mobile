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
        <h3>Welcome to PharmaFind..</h3>
        <Text>
         The first medical chatting mobile application in syria. 
        </Text>
      </View>
      <Pressable style={styles.clickContinue} onPress={navigationHandler}>
        <Text style={styles.clickContinue}> Continue </Text>
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
    backgroundColor: '#2281E5'
  },
});
