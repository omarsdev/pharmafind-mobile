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

export const LoginPharmacist = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const loginPharmacistHandler = async () => {
    setError(null);
    await AxiosInstance.post('/pharmacist/code', {
      email,
    })
      .then(res => {
        if (res.data.success) {
          navigation.navigate('SMSCode', {
            email,
            isUser: false,
          });
        }
      })
      .catch(err => {
        setError(err.response.data);
        console.log(err.response.data);
      });
  };

  const signUpPharmacistHandler = () => {
    navigation.navigate('SubmitPharmacist');
  };

  const loginUserHandler = () => {
    navigation.navigate('LoginUser');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={Pill} style={styles.imageStyle} />

      <Text>Login Pharmacist</Text>
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
      <Pressable style={styles.submit} onPress={loginPharmacistHandler}>
        <Text style={styles.submitText}>Login Pharmacist</Text>
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
      <Pressable style={styles.pharmacist} onPress={signUpPharmacistHandler}>
        <Text style={styles.submitText}>Sign up as Pharmacist</Text>
      </Pressable>
      <Pressable style={styles.pharmacist} onPress={loginUserHandler}>
        <Text style={styles.submitText}>Login as User</Text>
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
  pharmacist: {
    width: 150,
    height: 40,
    backgroundColor: '#2EC3B2',
    borderRadius: 12,
    borderColor: 'black',
    borderWidth: 1,
  },
  submitText: {
    marginTop: 'auto',
    marginBottom: 'auto',
    textAlign: 'center',
  },
});
