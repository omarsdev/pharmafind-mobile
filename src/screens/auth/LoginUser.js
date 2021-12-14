import React, {useState, useEffect} from 'react';
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

export const LoginUser = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const signUserHandler = () => {
    navigation.navigate('SubmitUser');
  };

  const loginPharmacist = () => {
    navigation.navigate('LoginPharmacist');
  };

  const fetchApi = async () => {
    setError(null);
    await AxiosInstance.post('/user/code', {
      email,
    })
      .then(res => {
        if (res.data.success) {
          navigation.navigate('SMSCode', {
            email,
            isUser: true,
          });
        }
      })
      .catch(err => {
        setError(err.response.data);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={Pill} style={styles.imageStyle} />
      <Text>Login User</Text>
      <View>
        <Text>Email</Text>
        <TextInput
          style={styles.textInputStyle}
          placeholder="Enter your email"
          placeholderTextColor={'#1a1a1a'}
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <Pressable style={styles.submit} onPress={fetchApi}>
        <Text style={styles.submitText}>Login</Text>
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
      <Pressable style={styles.pharmacist} onPress={signUserHandler}>
        <Text style={styles.submitText}>Sign Up as User</Text>
      </Pressable>
      <Pressable style={styles.pharmacist} onPress={loginPharmacist}>
        <Text style={styles.submitText}>Sign in as Pharmacist</Text>
      </Pressable>
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
  pharmacist: {
    width: 150,
    height: 40,
    backgroundColor: '#2EC3B2',
    borderRadius: 12,
    borderColor: 'black',
    borderWidth: 1,
  },
});
