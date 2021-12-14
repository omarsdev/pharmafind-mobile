import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';

import {AxiosInstance} from '../../api/axios-instance';

import Pill from '../../assets/image/pill.jpg';

export const SMSCode = ({route, navigation}) => {
  const {email, isUser} = route.params;
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);

  const setStorage = async res => {
    await AsyncStorage.setItem('token', res.data.token);
    await AsyncStorage.setItem('isUser', isUser.toString());
  };

  const fetchApi = async () => {
    await AxiosInstance.post(`/${isUser ? 'user' : 'pharmacist'}/login`, {
      email,
      password: code,
    })
      .then(res => {
        if (res.data.success) {
          setStorage(res);
          if (isUser) {
            navigation.reset({
              index: 0,
              routes: [{name: 'User'}],
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{name: 'PharmacistRoot'}],
            });
          }
        }
      })
      .catch(err => {
        setError(err.response.data);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={Pill} style={styles.imageStyle} />
      <Text>
        Please enter the SMS code that we send to your email for verification
      </Text>
      <TextInput
        style={styles.textInputStyle}
        placeholder="Enter your SMS ode here .."
        placeholderTextColor={'#1a1a1a'}
        value={code}
        onChangeText={text => setCode(text)}
      />
      <Pressable style={styles.submit} onPress={fetchApi}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
      {Array.isArray(error?.error) && error ? (
        error?.error.map((e, i) => (
          <Text style={{color: 'red'}} key={i}>
            {e}
          </Text>
        ))
      ) : !Array.isArray(error?.error) && error ? (
        <Text style={{color: 'red'}}>{error?.error}</Text>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#56B1D3',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imageStyle: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  textInputStyle: {
    width: 250,
    backgroundColor: 'white',
    height: 40,
    borderRadius: 13,
    marginTop: 20,
    color: 'black',
  },

  submit: {
    width: 150,
    height: 40,
    backgroundColor: '#55C854',
    borderRadius: 12,
  },

  submitText: {
    marginTop: 'auto',
    marginBottom: 'auto',
    textAlign: 'center',
  },
});
