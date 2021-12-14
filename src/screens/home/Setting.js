import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {removeAllLocalStorage} from '../../utils';

const Setting = ({navigation}) => {
  const logoutHandler = () => {
    removeAllLocalStorage();
    navigation.reset({
      index: 0,
      routes: [{name: 'Welcome'}],
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={{marginLeft: '4%', fontSize: 20}}>Setting</Text>
        <Pressable
          style={{
            width: '100%',
            height: 50,
            backgroundColor: 'white',
            marginTop: 10,
          }}
          onPress={logoutHandler}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text style={{marginLeft: '4%', fontSize: 16}}>Logout</Text>
          </View>
        </Pressable>
      </SafeAreaView>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#56B1D3',
  },
  safeArea: {
    // marginLeft: '5%',
    // marginRight: '5%',
  },
});
