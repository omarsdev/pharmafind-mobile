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
        <Text>PharamFind</Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
          repudiandae nesciunt earum facere sed recusandae in magni at sit eum
          nobis quos, odio laborum laboriosam quas ducimus ex ipsam reiciendis.
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
